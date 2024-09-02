import { Audio } from "expo-av";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [sound, setSound] = useState();
  const [upValue, setUpValue] = useState(0);
  const [beepNumber, setBeepNumber] = useState(0);
  const [status, setStatus] = useState(false);
  const [duration, setDuration] = useState("time");
  const [delay, setDelay] = useState("delay");
  const [dropMenu, setDropMenu] = useState(false);
  let timeoutRef = React.useRef(null);
  let timeoutDelayRef = React.useRef(null);
  let [_] = useFonts({
    sport: require("./assets/Hard_Sports.ttf"),
  });

  const handleChangeTime = (text) => {
    const isValidNumber = /^(\d+(\.\d*)?|\.\d+)$/.test(text);
    if (isValidNumber) {
      setDuration(text);
    } else {
      setDuration("");
    }
  };
  const handleChangeDelay = (text) => {
    const isValidNumber = /^(\d+(\.\d*)?|\.\d+)$/.test(text);
    if (isValidNumber) {
      setDelay(text);
    } else {
      setDelay("");
    }
  };

  const start = () => {
    if (!sound || duration === "time") {
      return;
    }
    if (delay === "delay") {
      perform();
      setStatus(true);
    } else {
      setStatus(true);
      setTimeout(() => {
        perform();
      }, delay * 1000);
      timeoutDelayRef.current = setInterval(() => {
        setDelay((prevDelay) => {
          if (prevDelay > 0) {
            return prevDelay - 1;
          } else {
            clearInterval(timeoutDelayRef.current);
            return "delay";
          }
        });
      }, 1000);
    }
  };

  const perform = () => {
    timeoutRef.current = setInterval(async () => {
      await sound.replayAsync();
      setBeepNumber((prev) => prev + 1);
    }, duration * 1000);
    setDelay("delay");
  };

  const stop = () => {
    clearInterval(timeoutRef.current);
    setStatus(false);
    setDelay("delay");
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
      width: "100%",
      position: "relative",
      height: "100dvh",
    },
    iconsBox: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      position: "relative",
    },
    numbersBox: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      height: "8rem",
      flexDirection: "row",
      paddingHorizontal: "1rem",
    },
    numberBox: {
      justifyContent: "center", // Align children in the center
      color: "white", // Text color
      width: "5rem", // Width (converted from rem to pt)
      height: "5rem", // Height (converted from rem to pt)
      margin: 10, // Margin (converted from rem to pt)
      textAlign: "center", // Center text inside the component
    },
    imageBox: {
      width: "70vw",
      height: "70vw",
      borderRadius: "10.625rem",
      border: "solid rgb(255, 255, 255) 0.625rem",
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
      width: "4.5rem",
      height: "4.5rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "2.5rem",
      textShadow: "0.3125rem 0.3125rem 0.4375rem rgb(86 86 86)",
      border: "solid 0.3125rem #fff",
      paddingRight: "0.625rem",
      fontFamily: "sport",
      fontSize: "2.5rem",
    },
    upNumber: {
      backgroundColor: "#aeaeae",
      width: "4.5rem",
      height: "4.5rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "2.5rem",
      textShadow: "0.3125rem 0.3125rem 0.4375rem rgb(86 86 86)",
      border: "solid 0.3125rem #fff",
      paddingRight: "0.625rem",
      fontFamily: "sport",
      fontSize: "2.5rem",
    },
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "25vw",
      height: "25vw",
      borderRadius: "93px",
      border: "none",
      fontFamily: "sport",
      fontSize: "2rem",
      margin: "auto",
      textShadow: "3px 3px 4px rgb(90 90 90)",
      color: "white",
      cursor: "pointer",
      userSelect: "none",
    },
    upBtn: { backgroundColor: "gray" },
    resetBtn: { backgroundColor: "gray" },
    startBtn: { backgroundColor: "rgb(0, 255, 149)" },
    stopBtn: { backgroundColor: "red" },
    duration: {
      backgroundColor: "#fff",
    },
    delay: {
      backgroundColor: "#F8D714",
    },
    input: {
      width: "80%",
      height: "100%",
      textAlign: "center",
      fontSize: "1.5rem",
      outline: "none",
      border: "5px solid grey",
      fontSize: "30px",
      fontWeight: "100",
      paddingVertical: "0.3rem",
    },
    inputBox: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    options: {
      width: "100%",
      textAlign: "center",
      backgroundColor: "#000",
      position: "absolute",
      top: "0",
      paddingVertical: "0.8rem",
      fontWeight: "700",
      color: "white",
      borderBottomWidth: "2px",
      borderColor: "#fff",
      borderStyle: "solid",
    },
    menu: {
      width: "100vw",
      height: "100dvh",
      position: "absolute",
      top: dropMenu ? "0" : "-50rem",
      left: "0",
      backgroundColor: "gray",
      justifyContent: "center",
      alignItems: "center",
      transition: "top 0.7s ease", // Add transition property
    },
    close: {
      width: "100%",
      textAlign: "center",
      backgroundColor: "red",
      position: "absolute",
      bottom: "0",
      paddingVertical: "0.8rem",
      color: "white",
      fontWeight: "700",
    },
    arrowDown: {
      transform: "scale(0.5)",
    },
    timerImg: {
      position: "absolute",
      top: "5rem",
      left: "50%",
      transform: "translate(-50%, 0%)",
    },
  });

  return (
    <View style={styles.container}>
      <Text onPress={() => setDropMenu(true)} style={styles.options}>
        {" "}
        Options
      </Text>
      <View style={styles.iconsBox}>
        <View style={styles.numbersBox}>
          <View style={styles.numberBox}>
            <Text style={styles.beepNumber}>{beepNumber}</Text>
          </View>
          <View style={styles.numberBox}>
            <Text style={styles.upNumber}>{upValue}</Text>
          </View>
        </View>
        <View style={styles.imageBox}>{delay !== "delay" && delay}</View>
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
            onPress={(e) => {
              setUpValue((pre) => pre + 1);
            }}
          >
            Up
          </Text>
        </View>
      </View>
      <View style={styles.menu}>
        {" "}
        <Image
          style={styles.timerImg}
          source={require("./assets/stopwatch.png")}
        ></Image>
        <View style={styles.inputBox}>
          <TextInput
            keyboardType="numeric"
            value={String(duration)}
            onChangeText={handleChangeTime}
            style={{ ...styles.duration, ...styles.input }}
          />
          <TextInput
            keyboardType="numeric"
            value={String(delay)}
            onChangeText={handleChangeDelay}
            style={{ ...styles.delay, ...styles.input }}
          />
        </View>
        <Text style={styles.close} onPress={() => setDropMenu(false)}>
          {" "}
          close
        </Text>
      </View>
    </View>
  );
}
