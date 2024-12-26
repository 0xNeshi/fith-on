import { EXERCISES } from "../constants";

const DEFAULT_INCREMENTS = EXERCISES.reduce((obj, exName) => {
  obj[exName] = 2.5;
  return obj;
}, {});

const capitalizeAfterSpace = (str) =>
  str
    .split(" ") // Split the string into words by spaces
    .map(
      (word, index) =>
        index === 0
          ? word // Keep the first word unchanged
          : word.charAt(0).toUpperCase() + word.slice(1) // Capitalize the first letter of subsequent words
    )
    .join(""); // Join the words back together without spaces

export default function getNewBlockSuggestedValues(sections = []) {
  const blocks = sections?.filter((s) => s.type === "block");

  if (!blocks?.length) {
    return EXERCISES.reduce(
      (maxesObj, exName) => {
        let cleanName = capitalizeAfterSpace(exName);
        maxesObj[`${cleanName}Max`] = "";
        return maxesObj;
      },
      { blockNumber: 1 }
    );
  }

  // sections are sorted descending by dateCreated, so sections[0] is the last section
  const currentBlock = blocks[0];
  const blockNumber = currentBlock.number + 1;
  const currentExercises = getLastWeeksExercises(currentBlock);

  const increments = blocks.length === 1 ? DEFAULT_INCREMENTS : getIncrements(currentBlock, blocks[1]);

  const suggestedValues = EXERCISES.reduce(
    (valuesObj, exName) => {
      let cleanName = capitalizeAfterSpace(exName);
      const key = `${cleanName}Max`;
      const exercise = currentExercises.find((ex) => ex.name === exName && ex.trainingMax > 0);

      valuesObj[key] = exercise ? exercise.trainingMax + increments[exName] : 0;

      return valuesObj;
    },
    { blockNumber }
  );

  return suggestedValues;
}

function getIncrements(currentBlock, lastBlock) {
  const currentBlockLastExercises = getLastWeeksExercises(currentBlock);
  const lastBlockLastExercises = getLastWeeksExercises(lastBlock);

  const increments = {};
  currentBlockLastExercises.forEach((exercise) => {
    const prevExercise = lastBlockLastExercises.find((e) => e.name === exercise.name);
    increments[exercise.name] =
      !!prevExercise && prevExercise.trainingMax <= exercise.trainingMax
        ? exercise.trainingMax - prevExercise.trainingMax
        : DEFAULT_INCREMENTS[exercise.name];
  });

  return increments;
}

// Gets exercises from the last week (week 3) of the block
function getLastWeeksExercises(block) {
  const lastWeek = block.weeks.reduce((prev, curr) => (curr.number > prev.number ? curr : prev));

  return lastWeek.exercises;
}
