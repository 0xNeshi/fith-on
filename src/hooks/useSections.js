import { useCallback, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../providers";
import {
  addSection,
  getSections,
  removeSection,
  updateSection,
} from "../services";
import usePersistentState from "./usePersistentState";

export default function useSections() {
  const { user } = useContext(UserContext);
  const [sections, setSections] = usePersistentState(
    `sections-${user?.email}`,
    []
  );
  const [isLoading, setLoading] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const getData = useCallback(async () => {
    setLoading(true);
    const newSections = await getSections(user?.email);
    const sortedSections = newSections.sort(
      (b1, b2) => b2.dateCreated - b1.dateCreated
    );
    setSections(sortedSections);
    setLoading(false);
  }, [user.email, setSections]);

  useEffect(() => getData(), [getData, shouldRefresh]);

  const refresh = useCallback(() => setShouldRefresh((prev) => !prev), []);

  const add = useCallback(
    (section) => {
      const newSections = [...sections];

      section.id = uuidv4();
      section.dateCreated = Date.now();
      newSections.push(section);

      setSections(newSections);
      addSection(user.email, section);
    },
    [sections, setSections, user.email]
  );

  const remove = useCallback(
    (sectionId) => {
      const newSections = [...sections].filter((x) => x.id !== sectionId);
      setSections(newSections);
      removeSection(user.email, sectionId);
    },
    [sections, setSections, user.email]
  );

  const update = useCallback(
    (section) => {
      const newSections = [...sections].filter((x) => x.id !== section.id);
      newSections.push(section);
      setSections(newSections);
      updateSection(user.email, section);
    },
    [sections, setSections, user.email]
  );

  return {
    isLoading,
    sections,
    refresh,
    add,
    remove,
    update,
  };
}
