import React, { useState, useId, useEffect } from "react";
import styles from "../scss/Main.module.scss";
const Main = () => {
  const [words, setWords] = useState([
    { value: "dog", style: "", isCurrent: true },
    { value: "cat", style: "", isCurrent: false },
    { value: "bird", style: "", isCurrent: false },
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
    let tempWords = [...words];
    let wordToCheck = tempWords[currIndex];
    // Compering the input with the word itself
    wordToCheck.value === userInput
      ? (tempWords[currIndex].style = "correct")
      : (tempWords[currIndex].style = "wrong");

    console.log(wordToCheck, userInput);
    clearUserInput();
    setWords(tempWords);
    setCurrIndex(currIndex + 1);
    changeCurrentWord();
  };
  const clearUserInput = () => {
    setUserInput("");
  };
  const changeCurrentWord = () => {
    const wordsTemp = [...words];
    wordsTemp[currIndex].isCurrent = false;
    wordsTemp[currIndex + 1].isCurrent = true;
    setWords(wordsTemp);
  };

  return (
    <div className={styles.main}>
      <div className={styles.wordsWrap}>
        {words.map((word) => (
          <span
            key={`${id}-${word.value}`}
            className={`${styles.word} ${word.isCurrent ? styles.current : ""} ${
              word.style === "wrong" && styles.wrong
            }
            ${word.style === "correct" && styles.correct}`}
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
