import { getNewBlockSuggestedValues } from "../utilities";

const defaultSuggestionsInput = [[], undefined, null, [{ type: "note" }]];

describe("getNewBlockSuggestedValues", () => {
  test.each(defaultSuggestionsInput)(
    "should return empty suggestions",
    (sections) => {
      const output = {
        blockNumber: 1,
        overheadMax: "",
        squatMax: "",
        powercleanMax: "",
        benchMax: "",
        deadliftMax: "",
      };

      expect(getNewBlockSuggestedValues(sections)).toEqual(output);
    }
  );

  test("should return maxes incremented by default increments", () => {
    const sections = [
      {
        id: 1,
        number: 1,
        type: "block",
        dateCreated: Date.now(),
        weeks: [
          {
            number: 1,
            exercises: [
              {
                name: "squat",
                trainingMax: 80,
                amrapReps: 10,
              },
              {
                name: "overhead",
                trainingMax: 42.5,
                amrapReps: 11,
              },
              {
                name: "powerclean",
                trainingMax: 42.5,
                amrapReps: 11,
              },
              {
                name: "deadlift",
                trainingMax: 105,
                amrapReps: 12,
              },
              {
                name: "bench",
                trainingMax: 52.5,
                amrapReps: 7,
              },
            ],
          },
          {
            number: 2,
            exercises: [
              {
                name: "squat",
                trainingMax: 80,
                amrapReps: 9,
              },
              {
                name: "overhead",
                trainingMax: 42.5,
                amrapReps: 10,
              },
              {
                name: "powerclean",
                trainingMax: 42.5,
                amrapReps: 10,
              },
              {
                name: "deadlift",
                trainingMax: 105,
                amrapReps: 10,
              },
              {
                name: "bench",
                trainingMax: 52.5,
                amrapReps: 8,
              },
            ],
          },
          {
            number: 3,
            exercises: [
              {
                name: "squat",
                trainingMax: 80,
                amrapReps: 0,
              },
              {
                name: "overhead",
                trainingMax: 42.5,
                amrapReps: 0,
              },
              {
                name: "powerclean",
                trainingMax: 42.5,
                amrapReps: 0,
              },
              {
                name: "deadlift",
                trainingMax: 105,
                amrapReps: 0,
              },
              {
                name: "bench",
                trainingMax: 52.5,
                amrapReps: 0,
              },
            ],
          },
        ],
      },
    ];

    const output = {
      blockNumber: 2,
      squatMax: 85,
      overheadMax: 45,
      powercleanMax: 45,
      deadliftMax: 110,
      benchMax: 55,
    };

    expect(getNewBlockSuggestedValues(sections)).toEqual(output);
  });

  test("should return maxes incremented by default increments", () => {
    const sections = [
      {
        id: 2,
        number: 2,
        type: "block",
        dateCreated: Date.now() - 1000,
        weeks: [
          {
            number: 1,
            exercises: [
              {
                name: "squat",
                trainingMax: 80,
                amrapReps: 10,
              },
              {
                name: "overhead",
                trainingMax: 42.5,
                amrapReps: 11,
              },
              {
                name: "powerclean",
                trainingMax: 42.5,
                amrapReps: 11,
              },
              {
                name: "deadlift",
                trainingMax: 105,
                amrapReps: 12,
              },
              {
                name: "bench",
                trainingMax: 52.5,
                amrapReps: 7,
              },
            ],
          },
          {
            number: 2,
            exercises: [
              {
                name: "squat",
                trainingMax: 80,
                amrapReps: 9,
              },
              {
                name: "overhead",
                trainingMax: 42.5,
                amrapReps: 10,
              },
              {
                name: "powerclean",
                trainingMax: 42.5,
                amrapReps: 10,
              },
              {
                name: "deadlift",
                trainingMax: 105,
                amrapReps: 10,
              },
              {
                name: "bench",
                trainingMax: 52.5,
                amrapReps: 8,
              },
            ],
          },
          {
            number: 3,
            exercises: [
              {
                name: "squat",
                trainingMax: 80,
                amrapReps: 0,
              },
              {
                name: "overhead",
                trainingMax: 42.5,
                amrapReps: 0,
              },
              {
                name: "powerclean",
                trainingMax: 42.5,
                amrapReps: 0,
              },
              {
                name: "deadlift",
                trainingMax: 105,
                amrapReps: 0,
              },
              {
                name: "bench",
                trainingMax: 52.5,
                amrapReps: 0,
              },
            ],
          },
        ],
      },
      {
        id: 1,
        number: 1,
        dateCreated: Date.now() - 3000,
        type: "block",
        weeks: [
          {
            number: 1,
            exercises: [
              {
                name: "squat",
                trainingMax: 75,
                amrapReps: 10,
              },
              {
                name: "overhead",
                trainingMax: 40,
                amrapReps: 11,
              },
              {
                name: "powerclean",
                trainingMax: 40,
                amrapReps: 11,
              },
              {
                name: "deadlift",
                trainingMax: 100,
                amrapReps: 12,
              },
              {
                name: "bench",
                trainingMax: 50,
                amrapReps: 7,
              },
            ],
          },
          {
            number: 2,
            exercises: [
              {
                name: "squat",
                trainingMax: 75,
                amrapReps: 9,
              },
              {
                name: "overhead",
                trainingMax: 40,
                amrapReps: 10,
              },
              {
                name: "powerclean",
                trainingMax: 40,
                amrapReps: 10,
              },
              {
                name: "deadlift",
                trainingMax: 100,
                amrapReps: 10,
              },
              {
                name: "bench",
                trainingMax: 50,
                amrapReps: 8,
              },
            ],
          },
          {
            number: 3,
            exercises: [
              {
                name: "squat",
                trainingMax: 75,
                amrapReps: 7,
              },
              {
                name: "overhead",
                trainingMax: 40,
                amrapReps: 7,
              },
              {
                name: "powerclean",
                trainingMax: 40,
                amrapReps: 7,
              },
              {
                name: "deadlift",
                trainingMax: 100,
                amrapReps: 7,
              },
              {
                name: "bench",
                trainingMax: 50,
                amrapReps: 8,
              },
            ],
          },
        ],
      },
    ];

    const output = {
      blockNumber: 3,
      squatMax: 85,
      overheadMax: 45,
      powercleanMax: 45,
      deadliftMax: 110,
      benchMax: 55,
    };

    expect(getNewBlockSuggestedValues(sections)).toEqual(output);
  });

  test("should filter out notes and return maxes incremented by default increments", () => {
    const sections = [
      {
        id: 2,
        number: 2,
        type: "block",
        dateCreated: Date.now() - 1000,
        weeks: [
          {
            number: 1,
            exercises: [
              {
                name: "squat",
                trainingMax: 80,
                amrapReps: 10,
              },
              {
                name: "overhead",
                trainingMax: 42.5,
                amrapReps: 11,
              },
              {
                name: "powerclean",
                trainingMax: 42.5,
                amrapReps: 11,
              },
              {
                name: "deadlift",
                trainingMax: 105,
                amrapReps: 12,
              },
              {
                name: "bench",
                trainingMax: 52.5,
                amrapReps: 7,
              },
            ],
          },
          {
            number: 2,
            exercises: [
              {
                name: "squat",
                trainingMax: 80,
                amrapReps: 9,
              },
              {
                name: "overhead",
                trainingMax: 42.5,
                amrapReps: 10,
              },
              {
                name: "powerclean",
                trainingMax: 42.5,
                amrapReps: 10,
              },
              {
                name: "deadlift",
                trainingMax: 105,
                amrapReps: 10,
              },
              {
                name: "bench",
                trainingMax: 52.5,
                amrapReps: 8,
              },
            ],
          },
          {
            number: 3,
            exercises: [
              {
                name: "squat",
                trainingMax: 80,
                amrapReps: 0,
              },
              {
                name: "overhead",
                trainingMax: 42.5,
                amrapReps: 0,
              },
              {
                name: "powerclean",
                trainingMax: 42.5,
                amrapReps: 0,
              },
              {
                name: "deadlift",
                trainingMax: 105,
                amrapReps: 0,
              },
              {
                name: "bench",
                trainingMax: 52.5,
                amrapReps: 0,
              },
            ],
          },
        ],
      },
      {
        id: 3,
        type: "note",
        dateCreated: Date.now() - 2000,
        title: "BBB 20 Week Challenge Started",
        text: "Officially starting the Boring But Big 20 week challenge lasting for a couple of months",
      },
      {
        id: 4,
        type: "note",
        dateCreated: Date.now() - 1500,
        title: "Deload",
        text: "",
      },
      {
        id: 1,
        number: 1,
        dateCreated: Date.now() - 3000,
        type: "block",
        weeks: [
          {
            number: 1,
            exercises: [
              {
                name: "squat",
                trainingMax: 75,
                amrapReps: 10,
              },
              {
                name: "overhead",
                trainingMax: 40,
                amrapReps: 11,
              },
              {
                name: "powerclean",
                trainingMax: 40,
                amrapReps: 11,
              },
              {
                name: "deadlift",
                trainingMax: 100,
                amrapReps: 12,
              },
              {
                name: "bench",
                trainingMax: 50,
                amrapReps: 7,
              },
            ],
          },
          {
            number: 2,
            exercises: [
              {
                name: "squat",
                trainingMax: 75,
                amrapReps: 9,
              },
              {
                name: "overhead",
                trainingMax: 40,
                amrapReps: 10,
              },
              {
                name: "powerclean",
                trainingMax: 40,
                amrapReps: 10,
              },
              {
                name: "deadlift",
                trainingMax: 100,
                amrapReps: 10,
              },
              {
                name: "bench",
                trainingMax: 50,
                amrapReps: 8,
              },
            ],
          },
          {
            number: 3,
            exercises: [
              {
                name: "squat",
                trainingMax: 75,
                amrapReps: 7,
              },
              {
                name: "overhead",
                trainingMax: 40,
                amrapReps: 7,
              },
              {
                name: "powerclean",
                trainingMax: 40,
                amrapReps: 7,
              },
              {
                name: "deadlift",
                trainingMax: 100,
                amrapReps: 7,
              },
              {
                name: "bench",
                trainingMax: 50,
                amrapReps: 8,
              },
            ],
          },
        ],
      },
    ];

    const output = {
      blockNumber: 3,
      squatMax: 85,
      overheadMax: 45,
      powercleanMax: 45,
      deadliftMax: 110,
      benchMax: 55,
    };

    expect(getNewBlockSuggestedValues(sections)).toEqual(output);
  });

  test("should return maxes incremented by previous increment (lower -> 2.5, upper -> 1)", () => {
    const sections = [
      {
        id: 2,
        number: 2,
        type: "block",
        dateCreated: Date.now() - 1000,
        weeks: [
          {
            number: 1,
            exercises: [
              {
                name: "squat",
                trainingMax: 77.5,
                amrapReps: 10,
              },
              {
                name: "overhead",
                trainingMax: 41,
                amrapReps: 11,
              },
              {
                name: "powerclean",
                trainingMax: 41,
                amrapReps: 11,
              },
              {
                name: "deadlift",
                trainingMax: 102.5,
                amrapReps: 12,
              },
              {
                name: "bench",
                trainingMax: 51,
                amrapReps: 7,
              },
            ],
          },
          {
            number: 2,
            exercises: [
              {
                name: "squat",
                trainingMax: 77.5,
                amrapReps: 9,
              },
              {
                name: "overhead",
                trainingMax: 41,
                amrapReps: 10,
              },
              {
                name: "powerclean",
                trainingMax: 41,
                amrapReps: 10,
              },
              {
                name: "deadlift",
                trainingMax: 102.5,
                amrapReps: 10,
              },
              {
                name: "bench",
                trainingMax: 51,
                amrapReps: 8,
              },
            ],
          },
          {
            number: 3,
            exercises: [
              {
                name: "squat",
                trainingMax: 77.5,
                amrapReps: 0,
              },
              {
                name: "overhead",
                trainingMax: 41,
                amrapReps: 0,
              },
              {
                name: "powerclean",
                trainingMax: 41,
                amrapReps: 0,
              },
              {
                name: "deadlift",
                trainingMax: 102.5,
                amrapReps: 0,
              },
              {
                name: "bench",
                trainingMax: 51,
                amrapReps: 0,
              },
            ],
          },
        ],
      },
      {
        id: 1,
        number: 1,
        dateCreated: Date.now() - 3000,
        type: "block",
        weeks: [
          {
            number: 1,
            exercises: [
              {
                name: "squat",
                trainingMax: 75,
                amrapReps: 10,
              },
              {
                name: "overhead",
                trainingMax: 40,
                amrapReps: 11,
              },
              {
                name: "powerclean",
                trainingMax: 40,
                amrapReps: 11,
              },
              {
                name: "deadlift",
                trainingMax: 100,
                amrapReps: 12,
              },
              {
                name: "bench",
                trainingMax: 50,
                amrapReps: 7,
              },
            ],
          },
          {
            number: 2,
            exercises: [
              {
                name: "squat",
                trainingMax: 75,
                amrapReps: 9,
              },
              {
                name: "overhead",
                trainingMax: 40,
                amrapReps: 10,
              },
              {
                name: "powerclean",
                trainingMax: 40,
                amrapReps: 10,
              },
              {
                name: "deadlift",
                trainingMax: 100,
                amrapReps: 10,
              },
              {
                name: "bench",
                trainingMax: 50,
                amrapReps: 8,
              },
            ],
          },
          {
            number: 3,
            exercises: [
              {
                name: "squat",
                trainingMax: 75,
                amrapReps: 7,
              },
              {
                name: "overhead",
                trainingMax: 40,
                amrapReps: 7,
              },
              {
                name: "powerclean",
                trainingMax: 40,
                amrapReps: 7,
              },
              {
                name: "deadlift",
                trainingMax: 100,
                amrapReps: 7,
              },
              {
                name: "bench",
                trainingMax: 50,
                amrapReps: 8,
              },
            ],
          },
        ],
      },
    ];

    const output = {
      blockNumber: 3,
      squatMax: 80,
      overheadMax: 42,
      powercleanMax: 42,
      deadliftMax: 105,
      benchMax: 52,
    };

    expect(getNewBlockSuggestedValues(sections)).toEqual(output);
  });

  test("should increment squat and deadlift by previous increments and bench and overhead by default increments", () => {
    const sections = [
      {
        id: 2,
        number: 2,
        type: "block",
        dateCreated: Date.now() - 1000,
        weeks: [
          {
            number: 1,
            exercises: [
              {
                name: "squat",
                trainingMax: 77.5,
                amrapReps: 10,
              },
              {
                name: "overhead",
                trainingMax: 41,
                amrapReps: 11,
              },
              {
                name: "powerclean",
                trainingMax: 41,
                amrapReps: 11,
              },
              {
                name: "deadlift",
                trainingMax: 102.5,
                amrapReps: 12,
              },
              {
                name: "bench",
                trainingMax: 51,
                amrapReps: 7,
              },
            ],
          },
          {
            number: 2,
            exercises: [
              {
                name: "squat",
                trainingMax: 77.5,
                amrapReps: 9,
              },
              {
                name: "overhead",
                trainingMax: 41,
                amrapReps: 10,
              },
              {
                name: "powerclean",
                trainingMax: 41,
                amrapReps: 10,
              },
              {
                name: "deadlift",
                trainingMax: 102.5,
                amrapReps: 10,
              },
              {
                name: "bench",
                trainingMax: 51,
                amrapReps: 8,
              },
            ],
          },
          {
            number: 3,
            exercises: [
              {
                name: "squat",
                trainingMax: 77.5,
                amrapReps: 0,
              },
              {
                name: "overhead",
                trainingMax: 41,
                amrapReps: 0,
              },
              {
                name: "powerclean",
                trainingMax: 41,
                amrapReps: 0,
              },
              {
                name: "deadlift",
                trainingMax: 102.5,
                amrapReps: 0,
              },
              {
                name: "bench",
                trainingMax: 51,
                amrapReps: 0,
              },
            ],
          },
        ],
      },
      {
        id: 1,
        number: 1,
        dateCreated: Date.now() - 3000,
        type: "block",
        weeks: [
          {
            number: 1,
            exercises: [
              {
                name: "squat",
                trainingMax: 75,
                amrapReps: 10,
              },
              {
                name: "deadlift",
                trainingMax: 100,
                amrapReps: 12,
              },
            ],
          },
          {
            number: 2,
            exercises: [
              {
                name: "squat",
                trainingMax: 75,
                amrapReps: 9,
              },
              {
                name: "deadlift",
                trainingMax: 100,
                amrapReps: 10,
              },
            ],
          },
          {
            number: 3,
            exercises: [
              {
                name: "squat",
                trainingMax: 75,
                amrapReps: 7,
              },
              {
                name: "deadlift",
                trainingMax: 100,
                amrapReps: 7,
              },
            ],
          },
        ],
      },
    ];

    const output = {
      blockNumber: 3,
      squatMax: 80,
      overheadMax: 43.5,
      powercleanMax: 43.5,
      deadliftMax: 105,
      benchMax: 53.5,
    };

    expect(getNewBlockSuggestedValues(sections)).toEqual(output);
  });

  test("should increment squat and deadlift by previous increments and 0s bench and overhead", () => {
    const sections = [
      {
        id: 2,
        number: 2,
        type: "block",
        dateCreated: Date.now() - 1000,
        weeks: [
          {
            number: 1,
            exercises: [
              {
                name: "squat",
                trainingMax: 77.5,
                amrapReps: 10,
              },
              {
                name: "deadlift",
                trainingMax: 102.5,
                amrapReps: 12,
              },
            ],
          },
          {
            number: 2,
            exercises: [
              {
                name: "squat",
                trainingMax: 77.5,
                amrapReps: 9,
              },
              {
                name: "deadlift",
                trainingMax: 102.5,
                amrapReps: 10,
              },
            ],
          },
          {
            number: 3,
            exercises: [
              {
                name: "squat",
                trainingMax: 77.5,
                amrapReps: 0,
              },
              {
                name: "deadlift",
                trainingMax: 102.5,
                amrapReps: 0,
              },
            ],
          },
        ],
      },
      {
        id: 1,
        number: 1,
        dateCreated: Date.now() - 3000,
        type: "block",
        weeks: [
          {
            number: 1,
            exercises: [
              {
                name: "squat",
                trainingMax: 75,
                amrapReps: 10,
              },
              {
                name: "overhead",
                trainingMax: 40,
                amrapReps: 11,
              },
              {
                name: "powerclean",
                trainingMax: 40,
                amrapReps: 11,
              },
              {
                name: "deadlift",
                trainingMax: 100,
                amrapReps: 12,
              },
              {
                name: "bench",
                trainingMax: 50,
                amrapReps: 7,
              },
            ],
          },
          {
            number: 2,
            exercises: [
              {
                name: "squat",
                trainingMax: 75,
                amrapReps: 9,
              },
              {
                name: "overhead",
                trainingMax: 40,
                amrapReps: 10,
              },
              {
                name: "powerclean",
                trainingMax: 40,
                amrapReps: 10,
              },
              {
                name: "deadlift",
                trainingMax: 100,
                amrapReps: 10,
              },
              {
                name: "bench",
                trainingMax: 50,
                amrapReps: 8,
              },
            ],
          },
          {
            number: 3,
            exercises: [
              {
                name: "squat",
                trainingMax: 75,
                amrapReps: 7,
              },
              {
                name: "overhead",
                trainingMax: 40,
                amrapReps: 7,
              },
              {
                name: "powerclean",
                trainingMax: 40,
                amrapReps: 7,
              },
              {
                name: "deadlift",
                trainingMax: 100,
                amrapReps: 7,
              },
              {
                name: "bench",
                trainingMax: 50,
                amrapReps: 8,
              },
            ],
          },
        ],
      },
    ];

    const output = {
      blockNumber: 3,
      squatMax: 80,
      overheadMax: 0,
      powercleanMax: 0,
      deadliftMax: 105,
      benchMax: 0,
    };

    expect(getNewBlockSuggestedValues(sections)).toEqual(output);
  });
});
