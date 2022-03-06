import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { styled } from "@mui/material";
import { useCallback, useState } from "react";
import AmrapInput from "../AmrapInput";
import Notes from "./Notes";

export default function ExerciseRow({ weights, exercise, onUpdate }) {
  const [showNotes, setShowNotes] = useState(false);
  const [first, second, third] = weights;
  const { amrapReps, name, trainingMax, notes } = exercise;

  const handleUpdateAmrap = useCallback(
    (updatedAmrap) => {
      const updatedExercise = { ...exercise };
      updatedExercise.amrapReps = updatedAmrap;
      onUpdate(updatedExercise);
    },
    [exercise, onUpdate]
  );

  const handleUpdateNotes = useCallback(
    (updatedNotes) => {
      const updatedExercise = { ...exercise };
      updatedExercise.notes = updatedNotes;
      onUpdate(updatedExercise);
    },
    [exercise, onUpdate]
  );

  return (
    <>
      <tr
        onClick={() => setShowNotes((prev) => !prev)}
        style={{ cursor: "pointer" }}
      >
        <NameCell>
          {name}
          {showNotes ? (
            <ArrowDropUp fontSize="small" color="primary" />
          ) : (
            <ArrowDropDown fontSize="small" color="primary" />
          )}
        </NameCell>
        <TMCell>{trainingMax}</TMCell>
        <td>{first}</td>
        <td>{second}</td>
        <td>{third}</td>
        <AmrapCell>
          <AmrapInput value={amrapReps} onChange={handleUpdateAmrap} />
        </AmrapCell>
      </tr>
      <Notes
        isVisible={showNotes}
        notes={notes || []}
        onUpdate={handleUpdateNotes}
      />
    </>
  );
}

const TMCell = styled("td")`
  font-weight: 600;
`;

const NameCell = styled("td")`
  text-align: left;
`;

const AmrapCell = styled("td")`
  display: flex;
  justify-content: center;
`;
