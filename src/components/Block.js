import { FitnessCenter } from "@mui/icons-material";
import { Box, styled } from "@mui/material";
import { useCallback, useMemo } from "react";
import Section from "./Section";
import WeekRow from "./WeekRow";

export default function Block({ section, onUpdate, deleteBlock }) {
  const { id: blockId, number: blockNumber, dateCreated, weeks } = section;

  const handleUpdateWeek = useCallback(
    (updatedWeek) => {
      const updatedSection = { ...section };
      updatedSection.weeks = updatedSection.weeks.filter(
        (oldWeek) => oldWeek.number !== updatedWeek.number
      );
      updatedSection.weeks.push(updatedWeek);
      onUpdate(updatedSection);
    },
    [section, onUpdate]
  );

  const rows = useMemo(
    () =>
      weeks
        .sort((w1, w2) => w2.number - w1.number)
        .map((week) => (
          <WeekRow
            key={`weekrow${blockId}${week.number}`}
            week={week}
            blockId={blockId}
            onUpdate={handleUpdateWeek}
          />
        )),
    [weeks, blockId, handleUpdateWeek]
  );

  return (
    <Section
      sectionId={blockId}
      dateCreated={dateCreated}
      title={{
        icon: <FitnessCenter />,
        text: `Block ${blockNumber}`,
      }}
      onDeleteSection={deleteBlock}
    >
      <BlockRowContainer>{rows}</BlockRowContainer>
    </Section>
  );
}

const BlockRowContainer = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;
