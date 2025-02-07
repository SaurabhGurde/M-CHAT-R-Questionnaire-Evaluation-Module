import React, { useEffect, useRef, useState } from "react";
import Checkbox from "./ui/Checkbox";
import { passConditionType, questionType } from "../types";
import { toast } from "react-toastify";

interface PropType {
  question: questionType;
  questionNo: number;
  handleNextQuestion: Function;
  handlePrevClick: Function
}

const Question: React.FC<PropType> = ({
  question,
  questionNo,
  handleNextQuestion,
  handlePrevClick
}) => {
  const [mainAnswer, setMainAnswer] = useState<"yes" | "no" | "">("");
  const [subAnswer, setSubAnswer] = useState<("yes" | "no")[] | []>([]);

  useEffect(() => {
    setMainAnswer("");
  }, [question]);

  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    questionRefs.current?.forEach((ref, index) => {
      if (ref) {
        ref.classList.add("slide-in");
        setTimeout(() => {
          ref.classList.remove("slide-in");
        }, 500 * (index + 1));
      }
    });

    return () => {
      questionRefs.current?.forEach((ref) => ref?.classList.remove("slide-in"));
    };
  }, [mainAnswer]);

  const onMainAnswerChange = (data: "yes" | "no") => {
    setMainAnswer(data);
    setSubAnswer([]);
  };

  const onSubAnswerChange = (answer: "yes" | "no", index: number) => {
    let arr = [...subAnswer];
    arr[index] = answer;
    setSubAnswer(arr);
  };

  const handlePassFailCheck = (
    answerArr: ("yes" | "no")[],
    condition: passConditionType
  ) => {
    let yesCount: number = 0;
    let noCount: number = 0;

    answerArr.forEach((e) => {
      if (e === "yes") {
        yesCount++;
      } else {
        noCount++;
      }
    });

    switch (condition) {
      case "all-yes":
        return yesCount === answerArr.length;
      case "all-no":
        return noCount === answerArr.length;
      case "any-yes":
        return yesCount > 0;
      case "any-no":
        return noCount > 0;
      case "max-yes":
        return yesCount >= noCount;
      case "max-no":
        return yesCount <= noCount;
      case "pass-direct":
        return true;
    }
  };

  const handleNextClick = () => {
    if (mainAnswer === "") {
      toast.error("Please select answers")
      return
    }

    if (mainAnswer === "yes") {
      if (question.yesSelected.questions.length !== 0 && subAnswer.length === 0) {
        toast.error("Please select answers")
        return
      }
      let passCheck = handlePassFailCheck(subAnswer, question.yesSelected.passCondition);
      handleNextQuestion(questionNo, {
        ...question,
        answer: passCheck ? "pass" : "fail"
      });
    } else {
      if (question.noSelected.questions.length !== 0 && subAnswer.length === 0) {
        toast.error("Please select answers")
        return
      }
      let passCheck = handlePassFailCheck(subAnswer, question.noSelected.passCondition);
      handleNextQuestion(questionNo, {
        ...question,
        answer: passCheck ? "pass" : "fail"
      });
    }

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

      <h2 className="flex ml-5 text-[17px] font-[600] mb-2 mt-3 text-left">
        {mainAnswer &&
          (mainAnswer === "yes"
            ? (question.yesSelected.questions.length > 0 && `"If yes then..." ${question.yesDescription}`)
            : (question.noSelected.questions.length > 0 && `"If no then..." ${question.noDescription}`))}
      </h2>

      {/* ---------------list of subquestions-------------------- */}
      <div className="transition-opacity duration-500 ease-in-out">
        {mainAnswer === "yes" &&
          question.yesSelected.questions.length !== 0 &&
          question.yesSelected.questions.map((data, index) => (
            <div
              ref={(el) => {
                if (questionRefs.current) {
                  questionRefs.current[index] = el;
                }
              }}
              key={index}
              className="ml-5 "
            >
              <div className="ml-1 text-left text-[19px] flex">
                <span className="font-[600]">{index + 1})</span>
                <p className="ml-1">{data}</p>
              </div>
              <div className="ml-5 mt-3 max-sm:mt-4">
                <Checkbox
                  value={"yes" + "sub" + index}
                  label="Yes"
                  onCheckboxChange={() => onSubAnswerChange("yes", index)}
                  checked={subAnswer[index] + "sub" + index}
                />
              </div>
              <div className="ml-5">
                <Checkbox
                  value={"no" + "sub" + index}
                  label="No"
                  onCheckboxChange={() => onSubAnswerChange("no", index)}
                  checked={subAnswer[index] + "sub" + index}
                />
              </div>
            </div>
          ))}
      </div>

      <div className="transition-opacity duration-500 ease-in-out">
        {mainAnswer === "no" &&
          question.noSelected.questions.length !== 0 &&
          question.noSelected.questions.map((data, index) => (
            <div
              ref={(el) => {
                if (questionRefs.current) {
                  questionRefs.current[index] = el;
                }
              }}
              key={index}
              className="ml-5"
            >
              <div className="ml-1 text-left text-[19px] flex">
                <span className="font-[600]">{index + 1})</span>
                <p className="ml-1">{data}</p>
              </div>
              <div className="ml-5 mt-3 max-sm:mt-4">
                <Checkbox
                  value={"yes" + "sub" + index}
                  label="Yes"
                  onCheckboxChange={() => onSubAnswerChange("yes", index)}
                  checked={subAnswer[index] + "sub" + index}
                />
              </div>
              <div className="ml-5">
                <Checkbox
                  value={"no" + "sub" + index}
                  label="No"
                  onCheckboxChange={() => onSubAnswerChange("no", index)}
                  checked={subAnswer[index] + "sub" + index}
                />
              </div>
            </div>
          ))}
      </div>

      <div className="flex justify-between mr-[15vw] max-sm:mr-[2vw] mt-5">
        <button
          onClick={() => handlePrevClick(questionNo)}
          // disabled={currentQuestionIndex === Questions.length - 1} // Disable at the end
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNextClick}
          // disabled={currentQuestionIndex === Questions.length - 1} // Disable at the end
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Question;
