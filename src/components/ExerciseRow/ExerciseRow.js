import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Button, styled } from "@mui/material";
import { useCallback, useState } from "react";
import AmrapInput from "../AmrapInput";
import Notes from "./Notes";

export default function ExerciseRow({ weights, exercise, onUpdate }) {
  const [showNotes, setShowNotes] = useState(true);
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

  return (
    <>
      <tr>
        <NameCell>
          {name}
          <Button
            color="primary"
            onClick={() => setShowNotes((prev) => !prev)}
            sx={{ padding: "1px", minWidth: 0 }}
          >
            {showNotes ? (
              <ArrowDropUp fontSize="small" />
            ) : (
              <ArrowDropDown fontSize="small" />
            )}
          </Button>
        </NameCell>
        <TMCell>{trainingMax}</TMCell>
        <td>{first}</td>
        <td>{second}</td>
        <td>{third}</td>
        <AmrapCell>
          <AmrapInput value={amrapReps} onChange={handleUpdateAmrap} />
        </AmrapCell>
      </tr>
      <Notes isVisible={showNotes} notes={notes || []} />
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
