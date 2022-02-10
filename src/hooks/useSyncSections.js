import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { RestoreData } from "../components/Modals";
import { ModalContext } from "../providers";
import { getSectionsFromBackup, pushBackup } from "../utilities";
import usePersistentState from "./usePersistentState";

// 1000 ms * 60 secs * 60 mins * 24 hours = 86400000 ms
const DAY_DURATION = 86400000;

export default function useSyncSections(userEmail) {
  const sectionsKey = useMemo(() => `sections-${userEmail}`, [userEmail]);
  const lastSyncKey = useMemo(() => `lastbackup-${userEmail}`, [userEmail]);
  const [sections, setSections] = usePersistentState(sectionsKey, []);
  const [lastSyncTime, setLastSyncTime] = usePersistentState(lastSyncKey, []);
  const [isLoading, setLoading] = useState(false);
  const [isBackupDataLoaded, setBackupDataLoaded] = useState(false);

  const { openModal, closeModal } = useContext(ModalContext);

  const fetchBackupData = useCallback(async (userEmail) => {
    if (!window.navigator.onLine) {
      return console.log("Couldn't fetch, no internet");
    }

    setLoading(true);
    try {
      const data = await getSectionsFromBackup(userEmail);
      return data;
    } catch (error) {
      alert("Error getting data, please try again later");
      console.log(error);
    } finally {
      setLoading(false);
    }

    return [];
  }, []);

  const loadBackupSections = useCallback(async () => {
    const backupData = await fetchBackupData(userEmail);

    setBackupDataLoaded(true);

    if (!backupData?.sections?.length) {
      return;
    }

    if (!sections?.length) {
      const modalContent = (
        <RestoreData
          onConfirm={() => {
            setSections(backupData.sections);
            setLastSyncTime(backupData.lastBackupTime);
            closeModal();
          }}
          onClose={closeModal}
        />
      );
      return openModal(modalContent);
    }

    if (!lastSyncTime || lastSyncTime < backupData.lastBackupTime) {
      setSections(backupData.sections);
      setLastSyncTime(backupData.lastBackupTime);
    }
  }, [
    userEmail,
    fetchBackupData,
    setSections,
    closeModal,
    openModal,
    sections?.length,
    lastSyncTime,
    setLastSyncTime,
  ]);

  const backup = useCallback(async () => {
    if (!window.navigator.onLine) {
      return console.log("Couldn't backup, no internet");
    }

    try {
      const backup = createBackupObject(userEmail, sections);
      setLastSyncTime(backup.lastBackupTime);
      await pushBackup(backup);
    } catch (e) {
      console.log("There was an error, stopping backup\n", e);
    }
  }, [userEmail, sections, lastSyncKey]);

  useEffect(() => {
    if (!isBackupDataLoaded) {
      loadBackupSections();
    }

    if (shouldBackup(lastSyncTime)) {
      backup();
    }
  }, [
    sections?.length,
    loadBackupSections,
    backup,
    isBackupDataLoaded,
    lastSyncTime,
  ]);

  return {
    isLoading,
    state: [sections, setSections],
  };
}

function createBackupObject(userEmail, sections) {
  const stringified = JSON.stringify(sections);
  const base64Sections = Buffer.from(stringified).toString("base64");
  const lastBackupTime = Date.now();
  return { userEmail, lastBackupTime, base64Sections };
}

function shouldBackup(lastBackupTime) {
  const currentTime = Date.now();
  return !lastBackupTime || currentTime - lastBackupTime >= DAY_DURATION;
}
