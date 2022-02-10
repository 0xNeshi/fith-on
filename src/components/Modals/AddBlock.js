import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import Input from "../Input";

const TRAINING_MAX_SCHEMA = yup
  .number()
  .typeError("Must be a number")
  .positive("Must be a positive number")
  .nullable(true)
  .transform((_, x) => (x === "" ? null : +x));

const YUP_SHAPE = yup.object().shape({
  squatMax: TRAINING_MAX_SCHEMA,
  overheadMax: TRAINING_MAX_SCHEMA,
  benchMax: TRAINING_MAX_SCHEMA,
  deadliftMax: TRAINING_MAX_SCHEMA,
  blockNumber: TRAINING_MAX_SCHEMA,
});

export default function AddBlock(props) {
  const { onClose, onSubmit, initialValues } = props;

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(YUP_SHAPE),
    defaultValues: initialValues,
  });

  return (
    <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <Input
          label="Squat max"
          registerReturn={register("squatMax")}
          error={errors?.squatMax?.message}
        />
        <Input
          label="Bench max"
          registerReturn={register("benchMax")}
          error={errors?.benchMax?.message}
        />
        <Input
          label="Deadlift max"
          registerReturn={register("deadliftMax")}
          error={errors?.deadliftMax?.message}
        />
        <Input
          label="Overhead max"
          registerReturn={register("overheadMax")}
          error={errors?.overheadMax?.message}
        />
        <Input
          label="Block number"
          registerReturn={register("blockNumber")}
          error={errors?.blockNumber?.message}
        />
      </InputContainer>
      <ButtonContainer>
        <Button
          type="button"
          variant="outlined"
          onClick={onClose}
          color="warning"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </ButtonContainer>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 60vh;
  gap: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;
`;
