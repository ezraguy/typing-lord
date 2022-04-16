import React, { useState, useId, useEffect } from "react";
import Words from "./words";
import styles from "../scss/Main.module.scss";

const Main = () => {
  return (
    <div className={styles.main}>
      <Words />
    </div>
  );
};

export default Main;
