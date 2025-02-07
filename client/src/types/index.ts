export type passConditionType =
  | "all-yes"
  | "all-no"
  | "any-yes"
  | "any-no"
  | "max-yes"
  | "max-no"
  | "pass-direct"

type yesSelectedType = {
  questions: string[] | [];
  passCondition: passConditionType
};

type noSelectedType = {
  questions: string[] | [];
  passCondition: passConditionType
};

export type questionType = {
  id: number;
  title: string;
  description: string;
  yesDescription?: string;
  noDescription?: string;
  yesSelected: yesSelectedType;
  noSelected: noSelectedType;
  answer?: "pass" | "fail";
};
