import { useGlobalContext } from "../Context/Context";

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit, error } = useGlobalContext();
  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
          <h2>Quiz-Upp</h2>
          <div className="form-control">
            <label className="label" htmlFor="amount">Number of Questions</label>
            <input
              onChange={handleChange}
              value={quiz.amount}
              type="number"
              name="amount"
              id="amount"
              className="form-input"
              min={1}
              max={50}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="category">Category</label>
            <select name="category" id="category" className="form-input" value={quiz.category} onChange={handleChange}>
              <option value="sports">Sports</option>
              <option value="history">History</option>
              <option value="animals">Animals</option>
              <option value="generalKnowledge">General Knowledge</option>
              <option value="celebrities">Celebrities</option>
              <option value="geography">Geography</option>
              <option value="books">Books</option>
              <option value="computer">Computers</option>
              <option value="videoGames">Video Games</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label" htmlFor="difficulty">Difficulty</label>
            <select name="difficulty" id="difficulty" className="form-input" onChange={handleChange} value={quiz.difficulty}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          {error && (<p className="error">Can't Generates Questions, Please Try Again</p>)}
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            Start
          </button>
        </form>
      </section>
    </main>
  );
};
export default SetupForm;
