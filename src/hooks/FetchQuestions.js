//fetch question hook to fetch api data and set values to store

import { useEffect, useState } from "react";
//import data , {answers} from "../database/data";
import { useDispatch } from "react-redux";
import { getServerData } from "../helper/helper";

//redux actions
import * as Action from "../redux/question_reducer";

export const useFetchQuestion = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    setGetData(prev => ({ ...prev, isLoading: true }));

    //async function fetch backend data
    (async () => {
      try {
        const [{ questions , answers }] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`,(data) => data)

        if (questions.length > 0) {
          setGetData((prev) => ({ ...prev, isLoading: false }));
          setGetData((prev) => ({ ...prev, apiData: {questions , answers} }));

          //dispatch on action
          dispatch(Action.startExamAction({ question : questions , answers} ));
        }
        else {
          throw new Error("No Questions available");
        }
      }
      catch (error) {
        setGetData( prev => ({ ...prev, isLoading: false }));
        setGetData( prev => ({ ...prev, serverError: error }));
      }
    })();
  }, [dispatch]);

  return [getData, setGetData];
};

//moveAction dispatch function
export const MoveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction()); //increase trace by 1
  } catch (error) {
    console.log(error);
  }
};

//previous Action dispatch function
export const MovePrevQuestion = () => async (dispatch) => {
    try {
      dispatch(Action.movePrevAction()); //dencrease trace by 1
    } catch (error) {
      console.log(error);
    }
}
