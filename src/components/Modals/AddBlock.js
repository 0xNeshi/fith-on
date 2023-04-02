import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box, styled } from "@mui/material";
import * as yup from "yup";
import Button from "../Button";
import Input from "../Input";
import { EXERCISES, EXERCISE_KEYS } from "../../constants";

const TRAINING_MAX_SCHEMA = yup
  .number()
  .typeError("Must be a number")
  .positive("Must be a positive number")
  .nullable(true)
  .transform((_, x) => (!x ? null : +x));

const YUP_SHAPE = yup.object().shape(
  EXERCISES.reduce(
    (schema, exName) => {
      schema[`${exName}Max`] = TRAINING_MAX_SCHEMA;
      return schema;
    },
    { blockNumber: TRAINING_MAX_SCHEMA }
  )
);

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
          label="Block number"
          registerReturn={register("blockNumber")}
          error={errors?.blockNumber?.message}
        />

        {Object.keys(EXERCISE_KEYS).map((key) => (
          <Input
            key={`ex-input-${key}`}
            label={`${EXERCISE_KEYS[key]} max`}
            registerReturn={register(`${EXERCISE_KEYS[key]}Max`)}
            error={
              errors ? errors[`${EXERCISE_KEYS[key]}Max`]?.message : undefined
            }
          />
        ))}
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
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  height: 100%;
  width: 100%;
  gap: 10px 40px;
`;
