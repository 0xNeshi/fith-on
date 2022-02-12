import { useCallback, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../providers";
import {
  addSection,
  getSections,
  removeSection,
  updateSection,
} from "../services";

export default function useSections() {
  const [sections, setSections] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);
  const { user } = useContext(UserContext);

  const refresh = useCallback(() => {
    setToggleRefresh((prevState) => !prevState);
  }, []);

  const getData = useCallback(async () => {
    setLoading(true);
    const newSections = await getSections(user?.email);
    const sortedSections = newSections.sort(
      (b1, b2) => b2.dateCreated - b1.dateCreated
    );
    setSections(sortedSections);
    setLoading(false);
  }, [user.email]);

  useEffect(() => getData(), [toggleRefresh, getData]);

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
    sections,
    add,
    remove,
    update,
    isLoading,
    refresh,
  };
}
