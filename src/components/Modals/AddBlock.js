import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import Button from "../Button";
import Input from "../Input";

const TRAINING_MAX_SCHEMA = yup
  .number()
  .typeError("Must be a number")
  .positive("Must be a positive number")
  .nullable(true)
  .transform((_, x) => (!x ? null : +x));

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
        <InputColumn>
          <Input
            label="Block number"
            registerReturn={register("blockNumber")}
            error={errors?.blockNumber?.message}
            style={{ marginBottom: 10 }}
          />
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
        </InputColumn>
        <InputColumn style={{ justifyContent: "flex-end" }}>
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
        </InputColumn>
      </InputContainer>
      <ButtonContainer>
        <Button color="secondary" disabled={isSubmitting} onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" disabled={isSubmitting} submit>
          Submit
        </Button>
      </ButtonContainer>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 40px;
`;

const InputContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  gap: 40px;
`;

const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
