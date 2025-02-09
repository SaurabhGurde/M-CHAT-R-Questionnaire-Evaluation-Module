import React, { useEffect, useRef, useState } from "react";
import Checkbox from "./ui/Checkbox";
import {
  exampleQuestionType,
  nextLayerConditionType,
  noSelectedType,
  passConditionType,
  questionType,
  yesSelectedType,
} from "../types";
import { toast } from "react-toastify";
import ProgressBar from "./ui/ProgessBar";
import { cn } from "./functions";

interface PropType {
  question: questionType;
  questionNo: number;
  handleNextQuestion: Function;
  handlePrevClick: Function;
}

const Question: React.FC<PropType> = ({
  question,
  questionNo,
  handleNextQuestion,
  handlePrevClick,
}) => {
  const [mainAnswer, setMainAnswer] = useState<"yes" | "no" | "">("");
  const [subAnswer, setSubAnswer] = useState<("yes" | "no")[] | []>([]);
  const [currentSubQuestionIndex, setCurrentSubQuestionIndex] =
    useState<number>(0);
  const [currentLayer, setCurrentLayer] = useState<
    yesSelectedType | noSelectedType
  >();
  const [isPassCheckDone, setIsPassCheckDone] = useState<boolean>(false);
  const [isSelectionOn, setIsSelectionOn] = useState<boolean>(false);
  const [selectionAnswer, setselectionAnswer] = useState<
    exampleQuestionType[] | []
  >([]);
  const [passCheck, setpassCheck] = useState<"pass" | "fail">();
  const [subAnswerProgress, setSubAnswerProgress] = useState<number>(0);

  useEffect(() => {
    setMainAnswer("");
    setIsPassCheckDone(false);
    setIsSelectionOn(false);
    setCurrentLayer(undefined);
  }, [question]);

  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ref = questionRefs.current[currentSubQuestionIndex];

    if (ref) {
      ref.classList.add("slide-in");

      const timeoutId = setTimeout(() => {
        ref.classList.remove("slide-in");
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [currentSubQuestionIndex, mainAnswer]);

  const onMainAnswerChange = (data: "yes" | "no") => {
    setMainAnswer(data);
    setSubAnswer([]);
    setCurrentSubQuestionIndex(0);
    setSubAnswerProgress(0)
    if (data === "yes") {
      setCurrentLayer(question.yesSelected);
      if (question.yesSelected.questions.length === 0) {
        handleValidation(subAnswer, question.yesSelected.passCondition);
      }
    } else {
      setCurrentLayer(question.noSelected);
      if (question.noSelected.questions.length === 0) {
        handleValidation(subAnswer, question.noSelected.passCondition);
      }
    }
  };

  const onSubAnswerChange = (answer: "yes" | "no", index: number) => {
    let arr = [...subAnswer];
    arr[index] = answer;
    setSubAnswer(arr);
    if (currentLayer?.questions) {
      setSubAnswerProgress(
        ((currentSubQuestionIndex + 1) * 100) / currentLayer?.questions.length
      );
    }
    if (currentLayer?.questions) {
      if (currentLayer.questions.length - 1 === index) {
        // setCurrentLayer(undefined)
        setSubAnswerProgress(100);
        handleValidation(arr, currentLayer.passCondition);
        return;
      }
    }
    setTimeout(() => {
      setCurrentSubQuestionIndex(index + 1);
    }, 100);
  };

  const handleSelectionAnswer = (
    data: exampleQuestionType,
    bool: boolean,
    index: number
  ) => {
    let temp = [...selectionAnswer];
    if (bool) {
      // temp.push(data);
      temp[index] = data;
    } else {
      temp.splice(index, 1);
    }
    setselectionAnswer(temp);

    let passCount = 0;
    let failCount = 0;
    temp.forEach((e) => {
      if (e?.example === "pass") {
        passCount++;
      } else if (e?.example === "fail") {
        failCount++;
      }
    });

    setpassCheck(
      passCount >= failCount ? "pass" : failCount > 0 ? "fail" : undefined
    );
    setIsPassCheckDone(temp.length > 0);
  };

  const checkForYesToOnlyPassFail: () => "pass" | "fail" | "both" = () => {
    let passCount: number = 0;
    let failCount: number = 0;
    let questionsArr = currentLayer?.questions ?? [];
    subAnswer.forEach((e, i) => {
      if (e === "yes" && questionsArr[i].example === "pass") {
        passCount++;
      }
      if (e === "yes" && questionsArr[i].example === "fail") {
        failCount++;
      }
    });

    if (passCount > 0 && failCount === 0) {
      return "pass";
    } else if (failCount > 0 && passCount === 0) {
      return "fail";
    } else {
      return "both";
    }
  };

  const handlePassFailCheck = (
    subAnswerList?: ("yes" | "no")[],
    conditionargs?: passConditionType | nextLayerConditionType
  ) => {
    let yesCount: number = 0;
    let noCount: number = 0;

    let answerList = subAnswerList ?? subAnswer;

    answerList.forEach((e) => {
      if (e === "yes") {
        yesCount++;
      } else {
        noCount++;
      }
    });

    let condition: passConditionType | nextLayerConditionType | undefined;
    condition = conditionargs ?? currentLayer?.passCondition;

    switch (condition) {
      case "all-yes":
        if (yesCount === answerList.length) {
          return true;
        } else if (
          currentLayer?.nextLayerCondition &&
          handlePassFailCheck(answerList, currentLayer.nextLayerCondition)
        ) {
          return "next-layer";
        } else {
          return false;
        }
      case "all-no":
        return noCount === answerList.length;
      case "any-yes":
        if (yesCount > 0) {
          return true;
        } else if (
          currentLayer?.nextLayerCondition &&
          handlePassFailCheck(answerList, currentLayer.nextLayerCondition)
        ) {
          return "next-layer";
        } else {
          return false;
        }
      case "any-no":
        return noCount > 0;
      case "max-yes":
        return yesCount >= noCount;
      case "max-no":
        return yesCount <= noCount;
      case "pass-direct":
        return true;
      case "fail-direct":
        return false;
      case "yes-to-only-pass-fail":
        let answer = checkForYesToOnlyPassFail();
        if (answer === "pass" || answer === "fail") {
          return answer;
        } else {
          return "both";
        }
      case "yes-to-one-or-less":
        if (yesCount <= 1) {
          return true;
        } else if (
          currentLayer?.nextLayerCondition === "yes-to-two-or-more" &&
          yesCount > 1
        ) {
          return "next-layer";
        } else {
          return false;
        }
      case "yes-to-two-or-more":
        if (yesCount >= 2) {
          return true;
        } else if (
          currentLayer?.nextLayerCondition === "yes-to-only-one" &&
          yesCount === 1
        ) {
          return "next-layer";
        } else {
          return false;
        }
      case "next-layer":
        if(currentLayer?.nextLayerCondition === "all-yes" && yesCount === answerList.length){
          return "next-layer";
        } else {
          return false
        }
    }
  };

  const handleValidation = (subAnswerList: ("yes" | "no")[], condition: passConditionType | nextLayerConditionType ) => {
    let passCheck = handlePassFailCheck(subAnswerList, condition);

    if (passCheck === "both") {
      setIsSelectionOn(true);
      return;
    }
    if (passCheck === "next-layer") {
      setCurrentSubQuestionIndex(0);
      setCurrentLayer(currentLayer?.nextLayer);
      setSubAnswerProgress(0);
      setSubAnswer([]);
    } else {
      setpassCheck(passCheck ? "pass" : "fail");
      setIsPassCheckDone(true);
    }
  };

  const handleNextClick = () => {
    handleNextQuestion(questionNo, {
      ...question,
      answer: passCheck,
    });
  };

  return (
    <div className="w-[80vw] max-sm:w-auto p-3 rounded-[10px] bg-blue-50">
      <div className="ml-1 text-left text-[19px] flex">
        <span className="font-[600]">{questionNo + 1}.</span>
        <p className="ml-1">{question.title}</p>
      </div>
      {question.description && (
        <p className="text-[14px] text-left ml-5">
          ( For example {question.description} )
        </p>
      )}
      <div className="ml-5 mt-5 max-sm:mt-4">
        <Checkbox
          value={"yes"}
          label="Yes"
          onCheckboxChange={onMainAnswerChange}
          checked={mainAnswer}
        />
      </div>
      <div className="ml-5">
        <Checkbox
          value={"no"}
          label="No"
          onCheckboxChange={onMainAnswerChange}
          checked={mainAnswer}
        />
      </div>

      {mainAnswer &&
        currentLayer &&
        !isSelectionOn &&
        currentSubQuestionIndex >= 0 &&
        currentLayer.questions.length !== 0 && (
          <div className="mt-10 ml-5">
            <ProgressBar
              progress={subAnswerProgress}
              barWidth={"w-[80%]"}
              bgColor={"bg-blue-300"}
            />
          </div>
        )}

      {currentLayer && !currentLayer.title ? (
        <h2
          className={cn(
            "flex ml-5 text-[17px] font-[600] mb-2 text-left",
            isSelectionOn ? "mt-10" : "mt-3"
          )}
        >
          {mainAnswer &&
            (mainAnswer === "yes" && currentLayer
              ? currentLayer.questions.length > 0 &&
                !isSelectionOn &&
                `"If yes then..." ${
                  currentLayer.title ?? question.yesDescription
                }`
              : currentLayer &&
                currentLayer.questions.length > 0 &&
                !isSelectionOn &&
                `"If no then..." ${
                  currentLayer.title ?? question.noDescription
                }`)}
        </h2>
      ) : (
        <h2
          className={cn(
            "flex ml-5 text-[17px] font-[600] mb-2 text-left",
            isSelectionOn ? "mt-10" : "mt-3"
          )}
        >
          {currentLayer?.title}
        </h2>
      )}

      {/* ---------------list of subquestions-------------------- */}

      <div className="transition-opacity duration-500 ease-in-out">
        {mainAnswer &&
          currentLayer &&
          !isSelectionOn &&
          currentSubQuestionIndex >= 0 &&
          currentLayer.questions.length !== 0 && (
            <div
              key={currentSubQuestionIndex}
              ref={(el) => {
                if (questionRefs.current) {
                  questionRefs.current[currentSubQuestionIndex] = el;
                }
              }}
              className="ml-5 transition-transform duration-500 ease-in-out"
            >
              <div className="ml-1 text-left text-[19px] flex">
                <span className="font-[600]">
                  {currentSubQuestionIndex + 1})
                </span>
                <p className="ml-1">
                  {currentLayer.questions[currentSubQuestionIndex].title}
                </p>
              </div>

              <div className="ml-5 mt-3 max-sm:mt-4">
                <Checkbox
                  value={"yes" + "sub"}
                  label="Yes"
                  onCheckboxChange={() =>
                    onSubAnswerChange("yes", currentSubQuestionIndex)
                  }
                  checked={subAnswer[currentSubQuestionIndex] + "sub"}
                />
              </div>
              <div className="ml-5">
                <Checkbox
                  value={"no" + "sub"}
                  label="No"
                  onCheckboxChange={() =>
                    onSubAnswerChange("no", currentSubQuestionIndex)
                  }
                  checked={subAnswer[currentSubQuestionIndex] + "sub"}
                />
              </div>
            </div>
          )}
      </div>

      {/*------------ multiple selection to check for what does toddler ofen do -------------- */}

      {isSelectionOn && currentLayer && (
        <div className="ml-5 transition-transform duration-500 ease-in-out">
          <h3 className="flex">Which one does he/she do most often?</h3>
          {currentLayer.questions.map((data, index) => (
            <Checkbox
              key={index}
              label={data.title}
              onCheckboxChange={(bool: boolean) =>
                handleSelectionAnswer(data, bool, index)
              }
            />
          ))}
        </div>
      )}

      <div className="flex justify-between mr-[15vw] max-sm:mr-[2vw] mt-10">
        <button
          onClick={() => handlePrevClick(questionNo)}
          disabled={questionNo === 0}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-200"
        >
          Previous
        </button>
        <button
          onClick={handleNextClick}
          disabled={!isPassCheckDone}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Question;
