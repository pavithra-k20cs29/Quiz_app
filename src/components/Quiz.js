import React, { useState } from "react";
import Questions from "./Questions";
import { MoveNextQuestion, MovePrevQuestion } from "../hooks/FetchQuestions";
//redux store import
import { useSelector, useDispatch } from "react-redux";
import { PushAnswer } from "../hooks/setResult";
import { Navigate } from "react-router-dom";

export default function Quiz() {
  const [check, setChecked] = useState();
  const result = useSelector((state) => state.result.result);
  const { queue, trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  // Buttons event handlers
  function onNext() {
    if (trace < queue.length) {
      dispatch(MoveNextQuestion()); //update trace value by one using MoveNextAction

      //insert a new result in the arrray
      if (result.length <= trace) {
        dispatch(PushAnswer(check));
      }
    }
    //shows undefined when you select none of the options
    // setChecked(undefined);
  }

  function onPrev() {
    if (trace > 0) {
      dispatch(MovePrevQuestion()); //update trace value by one using MovePrevAction
    }
  }

  // function onChecked(check) {
  //   console.log(check);
  //   setChecked(check);
  // }

  //finish exam after the last question
  if (result.length && result.length >= queue.length) {
    return (
      <Navigate to={"/result"} replace={true}>
        {" "}
      </Navigate>
    );
  }

  return (
    <>
      <div className="container">
        <h1 className="title text-light"> Quiz Application </h1>

        {/* display questions*/}
        <Questions />

        <div className="grid">
          {trace > 0 ? (
            <button className="btn prev" onClick={onPrev}>
              Previous
            </button>
          ) : (
            <div></div>
          )}
          <button className="btn next" onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
