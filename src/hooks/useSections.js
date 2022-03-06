import { useCallback, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../providers";
import {
  addSection,
  getSections,
  removeSection,
  updateSection,
} from "../services";
import logf from "../services/log";

export default function useSections() {
  const { user } = useContext(UserContext);
  const [sections, setSections] = useState([]);
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

  const refresh = useCallback(() => {
    logf(user.email, "refresh", "Refreshing data");
    setShouldRefresh((prev) => !prev);
  }, [user.email]);

  const add = useCallback(
    async (section) => {
      setLoading(true);
      const newSections = [...sections];

      section.id = uuidv4();
      section.dateCreated = Date.now();
      newSections.push(section);

      try {
        await addSection(user.email, section);
        setSections(newSections);
      } finally {
        setLoading(false);
      }
    },
    [sections, setSections, user.email]
  );

  const remove = useCallback(
    async (sectionId) => {
      setLoading(true);
      try {
        const newSections = [...sections].filter((x) => x.id !== sectionId);
        await removeSection(user.email, sectionId);
        setSections(newSections);
      } finally {
        setLoading(false);
      }
    },
    [sections, setSections, user.email]
  );

  const update = useCallback(
    async (section) => {
      setLoading(true);
      try {
        const newSections = [...sections].filter((x) => x.id !== section.id);
        newSections.push(section);
        await updateSection(user.email, section);
        setSections(newSections);
      } finally {
        setLoading(false);
      }
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
