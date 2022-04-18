import React, { useState, useId, useRef, useEffect } from "react";
import styles from "../scss/Words.module.scss";

const Words = ({ data }) => {
  const [words, setWords] = useState([]);
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
  const init = () => {
    let wordsTemp = [...words];
    data.map((word, index) => {
      let wordObj = { value: word, style: "", isCurrent: index === 0 ? true : false };
      wordsTemp.push(wordObj);
    });
    wordsTemp.length = 50;
    setWords(wordsTemp);
  };
  useEffect(() => {
    init();
  }, []);
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
        {words.map((word, index) => (
          <div
            key={index}
            className={`${styles.word} ${word.isCurrent ? styles.current : ""} ${
              word.style === "wrong" && styles.wrong
            }
            ${word.style === "correct" && styles.correct}`}
          >
            {word.value}
          </div>
        ))}
      </div>
      <input
        type='text'
        className={styles.wordsInput}
        value={userInput}
        onChange={(e) => checkUserInput(e)}
      />
    </div>
  );
};

export default Words;
