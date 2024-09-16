import { Audio } from "expo-av";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

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
  const [progress, setProgress] = useState(0);
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
      intervalId.current = setInterval(async () => {
        await sound.replayAsync();
        setBeepNumber((prev) => prev + 1);
        setProgress(0);
      }, duration * 1000);
    }
  }, [status, duration, timer, sound]);

  useEffect(() => {
    if (status && timer === "time") {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress == 100) {
            return 0;
          }
          return prevProgress + 1;
        });
      }, (duration / 100) * 1000);
    } else if (status && duration === "time") {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress == 100) {
            clearInterval(progressIntervalRef.current);
            return 0;
          }
          return prevProgress + 1;
        });
      }, (timer / 100) * 1000);
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
      setProgress(0);
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
      setProgress(0);
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
      width: "100%",
      height: "100%",
    },
    iconsBox: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    numbersBox: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      height: 128,
      flexDirection: "row",
      paddingHorizontal: 16,
    },
    numberBox: {
      justifyContent: "center",
      color: "white",
      width: 96,
      height: 96,
      margin: 10,
      textAlign: "center",
    },
    buttonsBox: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: 150,
      width: "100%",
      marginBottom: 20,
      flexWrap: "wrap",
    },
    beepNumber: {
      backgroundColor: "#aeaeae",
      width: 96,
      height: 96,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 40,
      borderColor: "#fff",
      borderWidth: 5,
      paddingRight: 10,
      fontFamily: "sport",
      fontSize: 40,
      textAlign: "center",
      textShadowColor: "rgba(86, 86, 86, 0.5)",
      textShadowOffset: { width: 5, height: 5 },
      textShadowRadius: 7,
    },
    upNumber: {
      backgroundColor: "#aeaeae",
      width: 96,
      height: 96,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 40,
      borderColor: "#fff",
      borderWidth: 5,
      paddingRight: 10,
      fontFamily: "sport",
      fontSize: 40,
      textAlign: "center",
      textShadowColor: "rgba(86, 86, 86, 0.5)",
      textShadowOffset: { width: 5, height: 5 },
      textShadowRadius: 7,
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      width: 100, // Adjusted to fit better in the layout
      height: 100, // Adjusted to fit better in the layout
      borderRadius: 50,
      borderWidth: 0,
      margin: 5,
      fontFamily: "sport",
      fontSize: 20,
      textShadowColor: "rgba(90, 90, 90, 0.5)",
      textShadowOffset: { width: 3, height: 3 },
      textShadowRadius: 4,
      color: "white",
      textAlign: "center", // Center text horizontally
      lineHeight: 85, // Ensure line height matches height for vertical centering
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
      textAlign: "center",
      fontSize: 24,
      borderWidth: 5,
      borderColor: "grey",
      paddingVertical: 4.8,
    },
    inputBox: {
      flexDirection: "column",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    options: {
      width: "100%",
      textAlign: "center",
      backgroundColor: "#000",
      paddingVertical: 12.8,
      fontWeight: "700",
      color: "white",
      borderBottomWidth: 2,
      borderColor: "#fff",
    },
    optionsBox: {
      position: "absolute",
      top: 0,
      width: "100%",
      zIndex: 100,
    },
    optionItem: {
      width: "100%",
      textAlign: "center",
      backgroundColor: "gray",
      paddingVertical: 12.8,
      fontWeight: "700",
      color: "white",
      borderBottomWidth: 2,
      borderColor: "#fff",
      display: dropMenu ? "flex" : "none",
    },
    menu: {
      width: "100%",
      height: "100%",
      position: "absolute",
      left: 0,
      backgroundColor: "gray",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 101,
    },
    intervalMenu: { top: intervalMenu ? 0 : -1000 },
    timerMenu: { top: timerMenu ? 0 : -1000 },
    close: {
      width: "100%",
      textAlign: "center",
      backgroundColor: "red",
      position: "absolute",
      bottom: 0,
      paddingVertical: 12.8,
      color: "white",
      fontWeight: "700",
    },
    arrowDown: {
      transform: [{ scale: 0.5 }],
    },
    timerImg: {
      position: "absolute",
      top: 80,
      left: "50%",
      transform: [{ translateX: -50 }],
    },
    imageBox: {
      width: "70vw",
      height: "70vw",
      borderRadius: 170,
      backgroundImage: 'url("/assets/background.jpg")',
      backgroundSize: "contain",
      filter: "grayscale(0.5)",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      fontSize: 80,
      fontWeight: "bold",
      zIndex: 2,
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
      transform: [{ translateX: -50 }, { translateY: 0 }],
      background: `conic-gradient(orange ${progress}%, white 0)`,
      borderRadius: 170,
      zIndex: 1,
    },
  });

  return (
    <ImageBackground
      source={require("./assets/background.jpg")}
      style={styles.container}
    >
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
          Options
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
        <View style={styles.imageContainer}>
          <View style={styles.pseudoImageBox}></View>
          <View style={styles.imageBox}>
            {timer === "time" ? delay !== "delay" && delay : timerShow}
          </View>
        </View>
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
            onPress={() => setUpValue((pre) => pre + 1)}
          >
            Up
          </Text>
        </View>
      </View>
      {/* interval menu */}
      <View style={{ ...styles.menu, ...styles.intervalMenu }}>
        <Image
          style={styles.timerImg}
          source={require("./assets/notification.png")}
        />
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
          Close
        </Text>
      </View>
      {/* timer menu */}
      <View style={{ ...styles.menu, ...styles.timerMenu }}>
        <Image
          style={styles.timerImg}
          source={require("./assets/stopwatch.png")}
        />
        <View style={styles.inputBox}>
          <TextInput
            keyboardType="numeric"
            value={String(timer)}
            onChangeText={handleChangeTimer}
            style={{ ...styles.duration, ...styles.input }}
          />
        </View>
        <Text style={styles.close} onPress={() => setTimerMenu(false)}>
          Close
        </Text>
      </View>
    </ImageBackground>
  );
}
