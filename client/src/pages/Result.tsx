import React from "react";
import { useSelector } from "react-redux";
import { questionType } from "../types";

interface State extends questionType {
  index: number;
}
interface RootState {
  answers: State[];
}

const Result = () => {
  const answers = useSelector((state: RootState) => state.answers);
  //   console.log(reduxState);
  return (
    <div className="w-[100vw] h-[100vh] px-[2.5vw] py-[5vh]">
      <h1 className="text-4xl">Results..</h1>
      <div className="relative overflow-x-auto mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Q. No.
              </th>
              <th scope="col" className="px-6 py-3">
                Question
              </th>
              <th scope="col" className="px-6 py-3">
                Result
              </th>
            </tr>
          </thead>
          <tbody>
            {answers &&
              answers.map((data) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.index + 1}
                  </th>
                  <td className="px-6 py-4">{data.title}</td>
                  {data.answer === "pass" ? (
                    <td className="px-6 py-4 text-green-500">{data.answer}</td>
                  ) : (
                    <td className="px-6 py-4 text-red-500">{data.answer}</td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Result;
