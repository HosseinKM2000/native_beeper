import React from "react";
import { View } from "react-native";

const ConicGradient = ({ progress, timer, delay, timerShow }) => {
  const styles = {
    imageBox: {
      width: "70vw",
      height: "70vw",
      borderRadius: "10.625rem",
      backgroundImage: 'url("/assets/background.jpg")',
      backgroundSize: "contain",
      filter: "grayscale(0.5)",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      fontSize: "5rem",
      fontWeight: "bold",
      zIndex: "2",
    },
    imageContainer: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    pseudoImageBox: {
      width: "75vw",
      height: "75vw",
      position: "absolute",
      left: "50%",
      transform: "translate(-50%, 0%)",
      background: `conic-gradient(orange ${progress}%, white 0)`,
      borderRadius: "10.625rem",
      zIndex: "1",
    },
  };

  return (
    <View style={styles.imageContainer}>
      {" "}
      <View style={styles.pseudoImageBox}></View>
      <View style={styles.imageBox}>
        {timer === "time" ? delay !== "delay" && delay : timerShow}
      </View>
    </View>
  );
};

export default ConicGradient;
