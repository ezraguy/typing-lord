import React, { useState, useId, useRef } from "react";
import styles from "../scss/Words.module.scss";

const Words = () => {
  const [words, setWords] = useState([
    { value: "dog", style: "", isCurrent: true },
    { value: "cat", style: "", isCurrent: false },
    { value: "bird", style: "", isCurrent: false },
  ]);
  const [userInput, setUserInput] = useState("");
  const [currIndex, setCurrIndex] = useState(0);
  const id = useId();
  const [correctWords, setCorrectWords] = useState(0);
  const correctWordsRef = useRef();
  const [animating, setAnimating] = useState(false);
  const checkUserInput = (e) => {
    setUserInput(e.currentTarget.value);
    if (e.nativeEvent.data === " ") {
      checkForMatch();
    }
  };
  const checkForMatch = () => {
    let tempWords = [...words];
    let wordToCheck = tempWords[currIndex];
    // Compering the input with the word itself
    if (wordToCheck.value === userInput) {
      tempWords[currIndex].style = "correct";
      setTimeout(() => {
        setCorrectWords(correctWords + 1);
      }, 200);
      setAnimating(true);
      setTimeout(() => {
        setAnimating(false);
      }, 500);
    } else {
      tempWords[currIndex].style = "wrong";
    }
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
    <div className={styles.words}>
      <div className={styles.correctWordsWrap}>
        <div
          ref={correctWordsRef}
          className={`${styles.correctWords} ${animating ? styles.animateNumbers : ""}`}
        >
          {correctWords}
        </div>
      </div>

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

export default Words;
