import { useState, useContext, createContext } from "react";
import axios from "axios";

const table = {
  sports: 21,
  history: 23,
  animals : 27,
  generalKnowledge: 9,
  celebrities: 26,
  geography: 22,
  books:10,
  computer: 18,
  videoGames: 15
};

const AppContext = createContext();
const AppProvider = ({ children }) => {
  //waiting
  const [waiting, setWaiting] = useState(true);
  //loading
  const [loading, setLoading] = useState(false);
  //questions
  const [questions, setQuestions] = useState([]);
  //index
  const [index, setIndex] = useState(0);
  //correct answers
  const [correct, setCorrect] = useState(0);
  //errors
  const [error, setError] = useState(false);
  //quiz
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });
  //modal
  const [showModal, setShowModal] = useState(false);
  //fetch
  const getData = async (url) => {
    setLoading(true);
    setWaiting(false);
    const response = await axios.get(url).catch((err) => console.log(err));
    if (response) {
      const data = response.data.results;
      if (data.length>0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setLoading(true);
      }
    } else {
      setWaiting(true);
    }
  };
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setWaiting(true);
    setCorrect(0);
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  const checkAnswers = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1);
    }
    nextQuestion();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, difficulty, category } = quiz;
    const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
    getData(url);
  };
  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        showModal,
        nextQuestion,
        checkAnswers,
        closeModal,
        quiz,
        handleSubmit,
        handleChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
