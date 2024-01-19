import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchQuestion } from "../hooks/FetchQuestions";
import { updateResult } from "../hooks/setResult";

export default function Questions({ onChecked }) {
  const [checked, setChecked] = useState(undefined);
  const { trace } = useSelector((state) => state.questions);
  const onCheckedFunction = onChecked || (() => {});
  const result = useSelector((state) => state.result.result);
  const [{ isLoading, serverError }] = useFetchQuestion();
  const questions = useSelector(
    (state) => state.questions.queue[state.questions.trace]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateResult({ trace, checked }));
  }, [dispatch, trace, checked]);

  function onSelect(i) {
    onCheckedFunction(i);
    setChecked(i);
    dispatch(updateResult({ trace, checked }));
  }

  if (isLoading) return <h3 className="text-light"> Loading</h3>;
  if (serverError)
    return (
      <h3 className="text-light">{serverError.message || "Unknown Error"}</h3>
    );
  // if (serverError)
  // return <h3 className="text-light"> {serverError || "Unknown Error"} </h3>;
  // return <h3 className="text-light"> hello </h3>;

  return (
    <div className="questions">
      <h2 className="text-light">{questions?.question}</h2>
      <ul>
        {questions?.options.map((q, i) => (
          <li key={i}>
            <input
              type="radio"
              value={i}
              name="options"
              id={`q${i}-option`}
              onChange={() => onSelect(i)}
            />

            <label className="text-primary" htmlFor={`q${i}-option`}>
              {q}
            </label>
            <div
              className={`check ${result[trace] === i ? "checked" : ""}`}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// //custom hook
// import { useFetchQuestion } from "../hooks/FetchQuestions";
// //import { updateResultAction } from '../redux/result_reducer'
// import { updateResult } from "../hooks/setResult";

// export default function Questions({ onChecked }) {
//   const [checked, setChecked] = useState(undefined);
//   const { trace } = useSelector((state) => state.questions);
//   const result = useSelector(state => state.result.result)
//   const [{ isLoading, serverError }] = useFetchQuestion()

//   // const result = useSelector((state) => state.result.result);
//   // useSelector(state => console.log(state))
//   const questions = useSelector((state) => state.questions.queue[state.questions.trace]);
//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(updateResult({ trace, checked }))
//   }, [checked])

//   function onSelect(i) {
//     onChecked(i);
//     setChecked(i);
//     dispatch(updateResult({ trace, checked }));
//   }

//   if (isLoading) return <h3 className='text-light'> isLoading</h3>;
//   if (serverError)
//     return <h3 className='text-light'> {serverError || "Unknown Error"} </h3>;

//   return (
//     <div className="questions">
//       <h2 className="text-light">{questions?.question}</h2>

//       <ul key={questions?.id}>
//         {questions?.options.map((q, i) => (
//           <li key={i}>
//             <input
//               type="radio"
//               value={false}
//               name="options"
//               id={`q${i}-option`}
//               onChange={() => onSelect(i)}
//             />

//             <label className="text-primary" htmlFor={`q${i}-option`}>{q}</label>
//             <div className={`check ${result[trace] === i ? "checked" : ""}`}></div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
