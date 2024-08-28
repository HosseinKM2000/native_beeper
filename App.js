import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.iconsBox}>
        <View style={styles.numbersBox}>
          <View style={styles.numberBox}>
            <Text style={styles.beepNumber}>0</Text>
          </View>
          <View style={styles.numberBox}>
            <Text style={styles.upNumber}>0</Text>
          </View>
        </View>
        <View style={styles.imageContainer}></View>
        <View style={styles.buttonsBox}>
          <Text style={{ ...styles.button, ...styles.resetBtn }}>Reset</Text>
          <Text style={{ ...styles.button, ...styles.startBtn }}>Start</Text>
          <Text style={{ ...styles.button, ...styles.stopBtn }}>Stop</Text>
          <Text style={{ ...styles.button, ...styles.upBtn }}>Up</Text>
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
    fontSize: 80, // Font size (converted from rem to pt)
    width: 100, // Width (converted from rem to pt)
    height: 100, // Height (converted from rem to pt)
    margin: 20, // Margin (converted from rem to pt)
    textAlign: "center", // Center text inside the component
  },
  imageContainer: {},
  imageBox: {},
  buttonsBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "150px",
    display: "flex",
    width: "736px",
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
    border: "solid 0.3125rem",
    marginBottom: "2.5rem",
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
    border: "solid 0.3125rem",
    marginBottom: "2.5rem",
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
});
