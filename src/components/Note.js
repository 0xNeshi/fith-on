import { NoteAlt } from "@mui/icons-material";
import styled from "styled-components";
import Section from "./Section";

export default function Note({ data, deleteNote }) {
  const { id: noteId, title, text, dateCreated } = data;

  return (
    <Section
      sectionId={noteId}
      dateCreated={dateCreated}
      onDeleteSection={deleteNote}
      title={
        <Title>
          <NoteAlt />
          {title}
        </Title>
      }
    >
      {text && <Text>{text}</Text>}
    </Section>
  );
}

const Title = styled.h3`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 7px;
`;

const Text = styled.p`
  width: 90%;
  overflow-wrap: break-word;
`;
