import React, { useEffect, useRef, useState } from "react";
import Question from "../component/Question";
import ProgressBar from "../component/ui/ProgessBar";
import QuestionsData from "../data/questionsData";
import { questionType } from "../types";
import { useDispatch } from "react-redux";
import { updateAnswer } from "../redux/Action";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState<questionType>(
    QuestionsData[0]
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const handleNextQuestion = (index: number, answer: questionType) => {
    dispatch(
      updateAnswer({
        ...answer,
        index: index,
      })
    );
    if(index + 1 === QuestionsData.length){
      navigate("/result")
      return
    }
    setCurrentQuestionIndex(index + 1);
    setCurrentQuestion(QuestionsData[index + 1]);
  };

  const handlePrevClick = (index: number) => {
    if(index === 0){
      return
    }
    setCurrentQuestionIndex(index - 1);
    setCurrentQuestion(QuestionsData[index - 1]);
  }

  const questionContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (questionContentRef.current) {
      questionContentRef.current.classList.add("slide-in");

      const timer = setTimeout(() => {
        questionContentRef.current?.classList.remove("slide-in");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentQuestion]);

  return (
    <div className="w-[100vw] max-w-[100vw] min-h-[100vh] bg-blue-100">
      <h1 className="text-3xl max-sm:text-left max-sm:ml-2">
        Welcome to M-CHAT-R Questionnaire Evaluation Module
      </h1>
      <div className="mx-auto w-fit mt-[10vh]">
        <ProgressBar
          progress={(currentQuestionIndex / QuestionsData.length) * 100}
        />
      </div>
      <div
        ref={questionContentRef}
        className="mx-auto w-fit max-sm:p-1 max-sm:mx-2 rounded-[5px] mt-[10vh] border border-black p-10 bg-blue-50 transition-opacity duration-500 ease-in-out overflow-y-auto min-h-[70vh] max-sm:min-h-[50vh]"
      >
        {currentQuestion && (
          <Question
            key={currentQuestion.id}
            question={currentQuestion}
            questionNo={currentQuestionIndex}
            handleNextQuestion={handleNextQuestion}
            handlePrevClick={handlePrevClick}
          />
        )}
      </div>

      {/* <div>
        <button
          onClick={handleNextQuestion}
          // disabled={currentQuestionIndex === Questions.length - 1} // Disable at the end
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default Home;
