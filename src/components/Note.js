import styled from "styled-components";
import Section from "./Section";

export default function Note({ data, deleteNote }) {
  const { id: noteId, title, text } = data;

  return (
    <Section sectionId={noteId} onDeleteSection={deleteNote} title={title}>
      {text && <Text>{text}</Text>}
    </Section>
  );
}

const Text = styled.p`
  width: 90%;
  overflow-wrap: break-word;
`;
