import { Audio } from "expo-av";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ConicGradient from "./ConicGradient";

export default function App() {
  const [sound, setSound] = useState();
  const [upValue, setUpValue] = useState(0);
  const [beepNumber, setBeepNumber] = useState(0);
  const [status, setStatus] = useState(false);
  const [duration, setDuration] = useState("time");
  const [timer, setTimer] = useState("time");
  const [timerShow, setTimerShow] = useState("");
  const [delay, setDelay] = useState("delay");
  const [dropMenu, setDropMenu] = useState(false);
  const [intervalMenu, setIntervalMenu] = useState(false);
  const [timerMenu, setTimerMenu] = useState(false);
  const [progress, setProgress] = useState(0); // Add progress state
  let progressIntervalRef = React.useRef(null);
  let intervalId = React.useRef(null);
  let timeoutDelayRef = React.useRef(null);
  let timerRef = React.useRef(null);

  let [_] = useFonts({
    sport: require("./assets/Hard_Sports.ttf"),
  });

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

  useEffect(() => {
    if (status && timer === "time") {
      // Manage progress and beep sound simultaneously
      intervalId.current = setInterval(async () => {
        await sound.replayAsync();
        setBeepNumber((prev) => prev + 1);
        setProgress(0); // Reset progress to 0 each time the beep plays
      }, duration * 1000);
    }
  }, [status, duration, timer, sound]);

  useEffect(() => {
    if (status && timer === "time") {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress == 100) {
            return 0; // Ensure it doesn't exceed 100
          }
          return prevProgress + 1; // Increment progress
        });
      }, (duration / 100) * 1000); // Adjust the increment interval as needed
    } else if (status && duration === "time") {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress == 100) {
            clearInterval(progressIntervalRef.current);
            return 0; // Ensure it doesn't exceed 100
          }
          return prevProgress + 1; // Increment progress
        });
      }, (timer / 100) * 1000); // Adjust the increment interval as needed
    }
  }, [status, duration, timer]);

  const handleChangeTime = (text) => {
    const isValidNumber = /^(\d+(\.\d*)?|\.\d+)$/.test(text);
    if (isValidNumber) {
      setDuration(text);
      setTimer("time");
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

  const handleChangeTimer = (text) => {
    const isValidNumber = /^(\d+(\.\d*)?|\.\d+)$/.test(text);
    if (isValidNumber) {
      setTimer(text);
      setTimerShow(text);
      setDuration("time");
    } else {
      setTimer("");
    }
  };

  const start = () => {
    if (timer === "time") {
      if (!sound || duration === "time") {
        return;
      }
      if (delay === "delay") {
        setStatus(true);
      } else {
        setTimeout(() => {
          setStatus(true);
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
    } else {
      setStatus(true);
      timerRef.current = setInterval(() => {
        setTimerShow((prevTime) => {
          if (prevTime > 1) {
            return prevTime - 1;
          } else {
            sound.replayAsync();
            clearInterval(timerRef.current);
            setStatus(false);
            return timer;
          }
        });
      }, 1000);
    }
  };

  const stop = () => {
    clearInterval(progressIntervalRef.current);
    if (timer === "time") {
      clearInterval(intervalId.current);
      setProgress(0)
      setStatus(false);
      setDelay("delay");
    } else {
      setStatus(false);
      clearInterval(timerRef.current);
    }
  };

  const reset = () => {
    setUpValue(0);
    stop();
    if (timer === "time") {
      setBeepNumber(0);
      setProgress(0); // Reset progress on reset
    } else {
      setTimerShow(timer);
      setProgress(0);
    }
  };

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
      width: "6rem", // Width (converted from rem to pt)
      height: "6rem", // Height (converted from rem to pt)
      margin: 10, // Margin (converted from rem to pt)
      textAlign: "center", // Center text inside the component
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
      width: "6rem",
      height: "6rem",
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
      width: "6rem",
      height: "6rem",
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
      paddingVertical: "0.8rem",
      fontWeight: "700",
      color: "white",
      borderBottomWidth: "2px",
      borderColor: "#fff",
      borderStyle: "solid",
    },
    optionsBox: {
      display: "flex",
      position: "absolute",
      top: "0",
      width: "100%",
      zIndex: "100",
    },
    optionItem: {
      width: "100%",
      textAlign: "center",
      backgroundColor: "gray",
      paddingVertical: "0.8rem",
      fontWeight: "700",
      color: "white",
      borderBottomWidth: "2px",
      borderColor: "#fff",
      borderStyle: "solid",
      display: dropMenu ? "block" : "none",
    },
    menu: {
      width: "100vw",
      height: "100dvh",
      position: "absolute",
      left: "0",
      backgroundColor: "gray",
      justifyContent: "center",
      alignItems: "center",
      transition: "top 0.7s ease", // Add transition property
      zIndex: "101",
    },
    intervalMenu: { top: intervalMenu ? "0" : "-50rem" },
    timerMenu: { top: timerMenu ? "0" : "-50rem" },
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
      <View style={styles.optionsBox}>
        <Text
          style={styles.optionItem}
          onPress={() => {
            setTimerMenu(true);
            setDropMenu(false);
          }}
        >
          Timer
        </Text>
        <Text
          style={styles.optionItem}
          onPress={() => {
            setIntervalMenu(true);
            setDropMenu(false);
          }}
        >
          Interval
        </Text>
        <Text onPress={() => setDropMenu(!dropMenu)} style={styles.options}>
          {" "}
          options
        </Text>
      </View>
      <View style={styles.iconsBox}>
        <View style={styles.numbersBox}>
          <View style={styles.numberBox}>
            <Text style={styles.beepNumber}>{beepNumber}</Text>
          </View>
          <View style={styles.numberBox}>
            <Text style={styles.upNumber}>{upValue}</Text>
          </View>
        </View>
        <SafeAreaView>
          <ConicGradient
            progress={progress}
            timer={timer}
            delay={delay}
            timerShow={timerShow}
          />
        </SafeAreaView>
        <View style={styles.buttonsBox}>
          <Text
            style={{ ...styles.button, ...styles.resetBtn }}
            onPress={reset}
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
      <View style={{ ...styles.menu, ...styles.intervalMenu }}>
        {" "}
        <Image
          style={styles.timerImg}
          source={require("./assets/notification.png")}
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
        <Text style={styles.close} onPress={() => setIntervalMenu(false)}>
          {" "}
          close
        </Text>
      </View>
      <View style={{ ...styles.menu, ...styles.timerMenu }}>
        {" "}
        <Image
          style={styles.timerImg}
          source={require("./assets/stopwatch.png")}
        ></Image>
        <View style={styles.inputBox}>
          <TextInput
            keyboardType="numeric"
            value={String(timer)}
            onChangeText={handleChangeTimer}
            style={{ ...styles.duration, ...styles.input }}
          />
        </View>
        <Text style={styles.close} onPress={() => setTimerMenu(false)}>
          {" "}
          close
        </Text>
      </View>
    </View>
  );
}
