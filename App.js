import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

export default function App() {
  const [sound, setSound] = useState();
  const [upValue, setUpValue] = useState(0);
  const [beepNumber, setBeepNumber] = useState(0);
  const [status, setStatus] = useState(false);
  const [delay, setDelay] = useState(2);
  let timeoutRef = React.useRef(null);

  const handleChangeText = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setDelay(numericValue);
  };

  const start = () => {
    if (!sound) {
      console.error("Sound not loaded yet");
      return;
    }
    timeoutRef.current = setInterval(async () => {
      await sound.replayAsync();
      setBeepNumber((prev) => prev + 1);
    }, delay * 1000);
    setStatus(true);
  };

  const stop = () => {
    clearInterval(timeoutRef.current);
    setStatus(false);
  };

  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("./assets/beep-02.mp3")
        );
        setSound(sound);
      } catch (error) {
        console.error("Failed to load sound:", error);
      }
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.iconsBox}>
        <View style={styles.numbersBox}>
          <View style={styles.numberBox}>
            <Text style={styles.beepNumber}>{beepNumber}</Text>
          </View>
          <TextInput
            keyboardType="numeric"
            value={String(delay)}
            onChangeText={handleChangeText}
            style={styles.range}
          />
          <View style={styles.numberBox}>
            <Text style={styles.upNumber}>{upValue}</Text>
          </View>
        </View>
        <View style={styles.imageBox}></View>
        <View style={styles.buttonsBox}>
          <Text
            style={{ ...styles.button, ...styles.resetBtn }}
            onPress={() => {
              setBeepNumber(0);
              setUpValue(0);
              stop();
            }}
          >
            Reset
          </Text>
          {!status ? (
            <Text
              style={{ ...styles.button, ...styles.startBtn }}
              onPress={start}
            >
              Start
            </Text>
          ) : (
            <Text
              style={{ ...styles.button, ...styles.stopBtn }}
              onPress={stop}
            >
              Stop
            </Text>
          )}

          <Text
            style={{ ...styles.button, ...styles.upBtn }}
            onPress={() => setUpValue((pre) => pre + 1)}
          >
            Up
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "url(/assets/background.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  iconsBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  numbersBox: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "7.5rem",
    padding: "0px",
    marginBottom: "1.25rem",
    flexDirection: "row",
  },
  numberBox: {
    justifyContent: "center", // Align children in the center
    color: "white", // Text color
    width: 100, // Width (converted from rem to pt)
    height: 100, // Height (converted from rem to pt)
    margin: 20, // Margin (converted from rem to pt)
    textAlign: "center", // Center text inside the component
  },
  imageBox: {
    width: "16.75rem",
    height: "16.75rem",
    borderRadius: "10.625rem",
    border: "solid rgb(255, 255, 255) 0.625rem",
    backgroundImage: 'url("/assets/background.jpg")',
    backgroundSize: "contain",
    filter: "grayscale(0.5)",
    overflow: "hidden",
  },
  buttonsBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "150px",
    display: "flex",
    width: "100%",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  beepNumber: {
    backgroundColor: "#aeaeae",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "2.5rem",
    textShadow: "0.3125rem 0.3125rem 0.4375rem black",
    border: "solid 0.3125rem #fff",
    paddingRight: "0.625rem",
  },
  upNumber: {
    backgroundColor: "#aeaeae",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "2.5rem",
    textShadow: "0.3125rem 0.3125rem 0.4375rem black",
    border: "solid 0.3125rem #fff",
    paddingRight: "0.625rem",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "105px",
    height: "110px",
    fontFamily: "sport",
    borderRadius: "93px",
    border: "none",
    fontSize: "27px",
    margin: "auto",
    textShadow: "3px 3px 4px black",
    color: "white",
    cursor: "pointer",
  },
  upBtn: { backgroundColor: "rgb(0, 247, 255)" },
  resetBtn: { backgroundColor: "gray" },
  startBtn: { backgroundColor: "rgb(0, 255, 149)" },
  stopBtn: { backgroundColor: "red" },
  range: {
    width: "20%",
    height: "50%",
    textAlign: "center",
    fontSize: "1.5rem",
    fontFamily: "sport",
    outline: "none",
    border: "5px solid grey",
    backgroundColor: "#fff",
  },
});
