import styled from "styled-components";
import AmrapInput from "./AmrapInput";

export default function ExerciseRow({
  exerciseName,
  weights,
  trainingMax,
  amrapReps,
  changeAmrapReps,
}) {
  const [first, second, third] = weights;

  return (
    <tr>
      <NameCell>{exerciseName}</NameCell>
      <TMCell>{trainingMax}</TMCell>
      <td>{first}</td>
      <td>{second}</td>
      <td>{third}</td>
      <AmrapCell>
        <AmrapInput reps={amrapReps} onChangeAmrapReps={changeAmrapReps} />
      </AmrapCell>
    </tr>
  );
}

const TMCell = styled.td`
  font-weight: 600;
`;

const NameCell = styled.td`
  text-align: left;
`;

const AmrapCell = styled.td`
  display: flex;
  justify-content: center;
`;
