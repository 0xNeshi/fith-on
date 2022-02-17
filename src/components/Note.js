import { NoteAlt } from "@mui/icons-material";
import { styled } from "@mui/material";
import Section from "./Section";

export default function Note({ data, deleteNote }) {
  const { id: noteId, title, text, dateCreated } = data;

  return (
    <Section
      sectionId={noteId}
      dateCreated={dateCreated}
      onDeleteSection={deleteNote}
      title={{
        icon: <NoteAlt />,
        text: title,
      }}
    >
      {text && <Text>{text}</Text>}
    </Section>
  );
}

const Text = styled("p")`
  width: 90%;
  overflow-wrap: break-word;
`;
