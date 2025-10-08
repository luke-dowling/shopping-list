import { Link } from "expo-router";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import image from "@/assets/images/android-icon-background.png";

const App = () => {
  return (
    <View className="bg-teal-500 h-full">
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text className="bg-black/30 text-4xl p-5 text-center font-semibold text-white">
          Shopping List
        </Text>
        <Link href="/contact" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Contact us</Text>
          </Pressable>
        </Link>
      </ImageBackground>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    flex: 1,
    resizeMode: "cover",
  },
  button: {
    backgroundColor: "#010101",
    borderRadius: 8,
    height: 60,
    padding: 10,
    margin: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
  },
});
