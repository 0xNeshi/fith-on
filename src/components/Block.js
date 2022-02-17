import { FitnessCenter } from "@mui/icons-material";
import { useMemo } from "react";
import styled from "styled-components";
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
      title={
        <Title>
          <FitnessCenter />
          Block {blockNumber}
        </Title>
      }
      onDeleteSection={deleteBlock}
    >
      <BlockRowContainer>{rows}</BlockRowContainer>
    </Section>
  );
}

const BlockRowContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const Title = styled.h3`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 7px;
`;
