import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box, styled } from "@mui/material";
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
  overheadMax: TRAINING_MAX_SCHEMA,
  squatMax: TRAINING_MAX_SCHEMA,
  powercleanMax: TRAINING_MAX_SCHEMA,
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
            label="Overhead max"
            registerReturn={register("overheadMax")}
            error={errors?.overheadMax?.message}
          />
          <Input
            label="Squat max"
            registerReturn={register("squatMax")}
            error={errors?.squatMax?.message}
            autoFocus
          />
        </InputColumn>
        <InputColumn>
          <Input
            label="Powerclean"
            registerReturn={register("powercleanMax")}
            error={errors?.powercleanMax?.message}
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
        </InputColumn>
      </InputContainer>
      <ButtonContainer>
        <Button color="secondary" disabled={isSubmitting} onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" disabled={isSubmitting} submit autoFocus>
          Submit
        </Button>
      </ButtonContainer>
    </Form>
  );
}

const Form = styled("form")`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled(Box)`
  display: flex;
  width: 100%;
  gap: 15px;
  margin-top: 40px;
  justify-content: center;
`;

const InputContainer = styled(Box)`
  display: flex;
  height: 100%;
  width: 100%;
  gap: 40px;
`;

const InputColumn = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
