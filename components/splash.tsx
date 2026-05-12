import { Image, StyleSheet, View, useWindowDimensions } from "react-native";

const SplashScreen = () => {
  const { height, width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/splash-imgae.png")}
        style={styles.splashImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
export default SplashScreen;
