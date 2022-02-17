import { FitnessCenter } from "@mui/icons-material";
import { Box, styled } from "@mui/material";
import { useMemo } from "react";
import Section from "./Section";
import WeekRow from "./WeekRow";

export default function Block({ data, changeAmrapReps, deleteBlock }) {
  const { id: blockId, number: blockNumber, dateCreated, weeks } = data;

  const rows = useMemo(
    () =>
      weeks
        .sort((w1, w2) => w2.number - w1.number)
        .map((week) => (
          <WeekRow
            key={`weekrow${blockId}${week.number}`}
            changeAmrapReps={changeAmrapReps}
            week={week}
            blockId={blockId}
          />
        )),
    [weeks, blockId, changeAmrapReps]
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
