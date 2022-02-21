import { styled } from "@mui/material";
import { useState } from "react";
import AmrapInput from "../AmrapInput";
import Notes from "./Notes";

export default function ExerciseRow(props) {
  const [showNotes, setShowNotes] = useState(true);
  const [first, second, third] = props.weights;

  return (
    <>
      <tr>
        <NameCell>{props.exerciseName}</NameCell>
        <TMCell>{props.trainingMax}</TMCell>
        <td>{first}</td>
        <td>{second}</td>
        <td>{third}</td>
        <AmrapCell>
          <AmrapInput
            reps={props.amrapReps}
            onChangeAmrapReps={props.changeAmrapReps}
          />
        </AmrapCell>
      </tr>
      <Notes isVisible={showNotes} />
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
