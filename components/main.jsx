import React, { useState, useId, useEffect } from "react";
import styles from "../scss/Main.module.scss";
const Main = () => {
  const [words, setWords] = useState([
    { value: "dog", style: "curr" },
    { value: "cat", style: "" },
    { value: "bird", style: "" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [currIndex, setCurrIndex] = useState(0);
  const id = useId();
  const checkUserInput = (e) => {
    setUserInput(e.currentTarget.value);
    if (e.nativeEvent.data === " ") {
      checkForMatch();
    }
  };
  const checkForMatch = () => {
    console.log(`word to check ${words[currIndex].value}`);
    setCurrIndex(currIndex + 1);
  };

  const changeCurrentWord = () => {
    const wordsTemp = [...words];
    wordsTemp.map((word) => (word.style = ""));
    wordsTemp[currIndex].style = "curr";
    setWords(wordsTemp);
  };

  useEffect(() => {
    changeCurrentWord();
  }, [currIndex]);
  return (
    <div className={styles.main}>
      <div className={styles.wordsWrap}>
        {words.map((word) => (
          <span
            key={`${id}-${word.value}`}
            className={`${styles.word} ${word.style ? styles.curr : ""}`}
          >
            {word.value}
          </span>
        ))}
      </div>

      <input type='text' value={userInput} onChange={(e) => checkUserInput(e)} />
    </div>
  );
};

export default Main;
