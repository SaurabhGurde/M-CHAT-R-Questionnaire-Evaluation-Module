import { questionType } from "../types";

const QuestionsData: questionType[] = [
  {
    id: 1,
    title:
      "If you point at something across the room, does your child look at it?",
    description:
      "if you point at a toy or an animal, does your child look at the toy or animal?",
    yesDescription:
      "Please give me an example of how he/she will respond if you point at something If parent does not give a PASS example below, ask each individually.",
    noDescription:
      "If you point at something, what does your child typically do?",
    yesSelected: {
      questions: [
        " Look at object?",
        "Point to object?",
        "Look and comment on object?",
        "Look if you point and say “look!”?",
      ],
      passCondition: "max-yes",
    },
    noSelected: {
      questions: [
        " Ignores you?",
        "Look around room randomly?",
        "Look at your finger?",
      ],
      passCondition: "max-yes",
    },
  },
  {
    id: 2,
    title: "Have you ever wondered if your child might be deaf?",
    description:
      "You reported that you have wondered if you child is deaf. What led you to wonder that?",
    yesDescription: "Does he/she…",
    noDescription: "",
    yesSelected: {
      questions: ["often ignore sounds?", "often ignore people?"],
      passCondition: "all-no",
    },
    noSelected: {
      questions: [],
      passCondition: "pass-direct",
    },
  },
  {
    id: 3,
    title: "Does your child play pretend or make-believe?",
    description:
      "pretend to drink from an empty cup, pretend to talk on a phone, or pretend to feed a doll or stuffed animal?)",
    yesDescription:
      "Please give me an example of his/her pretend play. (If parent does not give a PASS example below, ask each individually.)",
    yesSelected: {
      questions: [
        "Pretend to drink from a toy cup?",
        "Pretend to eat from a toy spoon or fork?",
        "Pretend to talk on the telephone?",
        "Pretend to feed a doll or stuffed animal with real or imaginary food?",
        "Push a car as if it is going along a pretend road?",
        "Pretend to be a robot, an airplane, a ballerina, or any other favorite character?",
        "Put a toy pot on a pretend stove?",
        "Stir imaginary food?",
        "Put an action figure or doll into a car or truck as if it is the driver or passenger?",
        "Pretend to vacuum the rug, sweep the floor, or mow the lawn?",
      ],
      passCondition: "any-yes",
    },
    noSelected: {
      questions: [
        "Pretend to drink from a toy cup?",
        "Pretend to eat from a toy spoon or fork?",
        "Pretend to talk on the telephone?",
        "Pretend to feed a doll or stuffed animal with real or imaginary food?",
        "Push a car as if it is going along a pretend road?",
        "Pretend to be a robot, an airplane, a ballerina, or any other favorite character?",
        "Put a toy pot on a pretend stove?",
        "Stir imaginary food?",
        "Put an action figure or doll into a car or truck as if it is the driver or passenger?",
        "Pretend to vacuum the rug, sweep the floor, or mow the lawn?",
      ],
      passCondition: "all-yes",
    },
  },
  {
    id: 4,
    title: "Does your child like climbing on things?",
    description: "furniture, playground Yes No equipment, or stairs",
    yesDescription:
      "Please give me an example of something he/she enjoys climbing on. (If parent does not give a PASS example below, ask each individually.)",
    noDescription: "",
    yesSelected: {
      questions: ["Stairs?", "Chairs?", "Furniture?", "Playground  equipment?"],
      passCondition: "any-yes",
    },
    noSelected: {
      questions: ["Stairs?", "Chairs?", "Furniture?", "Playground  equipment?"],
      passCondition: "all-yes",
    },
  },
  {
    id: 5,
    title:
      "Does your child make unusual finger movements near his or her eyes?",
    description:
      "(FOR EXAMPLE, does your child wiggle his or her fingers close to his or her eyes?)",
    yesDescription:
      "Please describe these movements (If parent does not give a PASS example below, ask each individually.)",
    noDescription: "",
    yesSelected: {
      questions: [
        "Wiggle his/her fingers near his/her eyes?",
        "Hold his/her hands up close to his/her eyes?",
        "Hold his/her hands off to the side of his/her eyes?",
        "Flap his/her hands near his/her face?",
      ],
      passCondition: "all-no",
    },
    noSelected: {
      questions: [],
      passCondition: "pass-direct",
    },
  },
  {
    id: 6,
    title:
      "Does your child point with one finger to ask for something or to get help?",
    description: "pointing to a snack or toy that is out of reach",
    yesDescription: "",
    noDescription:
      "If there is something your child wants that is out of reach, such as a snack or toy that is out of reach, how does he/she get it? (If parent does not give a PASS example below, ask each individually.)",
    yesSelected: {
      questions: [],
      passCondition: "pass-direct",
    },
    noSelected: {
      questions: [
        "Reach for the object with his/her whole hand?",
        "Lead you to the object?",
        "Try to get the object for him/herself?",
        "Ask for it using words or sounds?",
      ],
      passCondition: "any-yes",
    },
  },
  {
    id: 7,
    title:
      "Does your child point with one finger to show you something interesting?",
    description:
      "pointing to an airplane in the sky or a big truck in the road",
    yesDescription:
      "Please give me an example something he/she might point at to show you. (If parent does not give a PASS example below, ask each individually.)",
    noDescription:
      "Does your child sometimes want you to see something interesting such as….",
    yesSelected: {
      questions: [
        "An airplane in the sky?",
        "A truck on the road?",
        "A bug on the ground?",
        "An animal in the yard?",
      ],
      passCondition: "any-yes",
    },
    noSelected: {
      questions: [
        "An airplane in the sky?",
        "A truck on the road?",
        "A bug on the ground?",
        "An animal in the yard?",
      ],
      passCondition: "any-yes",
    },
  },
  {
    id: 8,
    title: "Is your child interested in other children?",
    description:
      "does your child watch Yes No other children, smile at them, or go to them?)",
    yesDescription: "",
    noDescription: "",
    yesSelected: {
      questions: [
        "Is he/she interested in children who are not his/her brother or sister?",
      ],
      passCondition: "all-yes",
    },
    noSelected: {
      questions: [
        "When you are at the playground or supermarket, does your child usually respond to other children?",
      ],
      passCondition: "all-yes",
    },
  },
  {
    id: 9,
    title:
      "Does your child show you things by bringing them to you or holding them up for you to Yes No see – not to get help, but just to share?",
    description: "showing you a flower, a stuffed animal, or a toy truck)",
    yesDescription:
      "Please give me an example of something he/she might bring to show you or hold up for you to see. (If parent does not give one of the following PASS examples, ask each individually.)",
    noDescription: "",
    yesSelected: {
      questions: [
        "A picture or toy just to show you?",
        "A drawing he/she has done?",
        "A flower he/she has picked?",
        "A bug he/she has found in the grass?",
        "A few blocks he/she has put together?",
        "Other (describe):",
      ],
      passCondition: "any-yes",
    },
    noSelected: {
      questions: [
        "A picture or toy just to show you?",
        "A drawing he/she has done?",
        "A flower he/she has picked?",
        "A bug he/she has found in the grass?",
        "A few blocks he/she has put together?",
        "Other (describe):",
      ],
      passCondition: "any-yes",
    },
  },
  {
    id: 10,
    title: "Does your child respond when you call his or her name?",
    description: "does he or she look up, talk or babble, or stop what he or she is doing when you call his or her name?)",
    yesDescription: "Please give me an example of how he/she responds when you call his/her name. (If parent does not give a PASS example below, ask each individually.)",
    noDescription: "If he/she is not involved in something fun or interesting, what does he/she do when you call his/her name? (If parent does not give a PASS example below, ask each individually.)",
    yesSelected: {
      questions: [
        "Look up?",
        "Talk or babble?",
        "Stop what he/she is doing?"
      ],
      passCondition: "all-yes"
    },
    noSelected: {
      questions: [
        "Make no response?",
        "Seem to hear but ignores parent?",
        "Respond only if parent is right in front of the child's face?",
        "Respond only if touched?"
      ],
      passCondition: "all-no"
    },
  },
  // {
  //   id: 2,
  //   title: "",
  //   description: "",
  //   yesDescription: "",
  //   noDescription: "",
  //   yesSelected: {
  //     questions: [],
  //     passCondition: ""
  //   },
  //   noSelected: {
  //     questions: [],
  //     passCondition: ''
  //   },
  // },
];

export default QuestionsData;
