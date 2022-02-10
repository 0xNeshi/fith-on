import { useCallback } from "react";
import useSyncSections from "./useSyncSections";
import { v4 as uuidv4 } from "uuid";

export default function useSections(userEmail) {
  const {
    state: [sections, setSections],
    isLoading,
  } = useSyncSections(userEmail);

  const add = useCallback(
    (section) => {
      const newSections = [...sections];

      section.id = uuidv4();
      section.dateCreated = Date.now();
      newSections.push(section);

      setSections(newSections);
    },
    [sections, setSections]
  );

  const remove = useCallback(
    (sectionId) => {
      const newSections = [...sections].filter((x) => x.id !== sectionId);
      setSections(newSections);
    },
    [sections, setSections]
  );

  const update = useCallback(
    (section) => {
      const newSections = [...sections].filter((x) => x.id !== section.id);
      newSections.push(section);
      setSections(newSections);
    },
    [sections, setSections]
  );

  return {
    sections,
    add,
    remove,
    update,
    isLoading,
  };
}
