import { styled } from "@mui/material";
import AmrapInput from "./AmrapInput";

export default function ExerciseRow(props) {
  const [first, second, third] = props.weights;

  return (
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
