import { useState } from "react";
import "./styles.css";

export default function App() {
  const [bDay, setBDay] = useState();
  const [result, setResult] = useState("");

  const onBirthdayChange = (event) => {
    setBDay(event.target.value);
  };
  const onCheck = () => {
    setResult(bDay);
  };
  return (
    <div className="App">
      <section>
        <h1>Palindrome Birthday!</h1>
        <h2>Enter your birth-date</h2>
        <input type="date" onChange={onBirthdayChange}></input>
        <button className="cta-btn" onClick={() => onCheck()}>
          Check
        </button>
        <h3>{result}</h3>
      </section>
    </div>
  );
}
