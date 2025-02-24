import React from "react";
import { View, Text, Button, Animated, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import "../global.css";
import { useRouter } from "expo-router";

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const router = useRouter();
  useEffect(() => {
    Animated.parallel([
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 10,
            friction: 2,
            useNativeDriver: true,
          }),
    ]).start(); // ✅ Start animation
    const timer = setTimeout(()=>{
 router.replace("/auth")
    },2000)

    return () => clearTimeout(timer)
  }, []);

  return (
    <View className="flex-1 bg-green-500 flex justify-center items-center ">
      <Animated.View
        style={[
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
        className="flex-1 bg-green-500 flex justify-center items-center "
      >
        <Ionicons name="medical" size={100} color="white" />
        <Text className="text-white font-[800] text-3xl tracking-[1]">MedRemind</Text>
      </Animated.View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1976D2",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   iconContainer: {
//     color: "white",
//     fontSize: 32,
//     fontWeight: "bold",
//     marginTop: 20,
//     letterSpacing: 1,
//   },
//   text: {
//     color: "white",
//     fontSize: 32,
//     fontWeight: "bold",
//     marginTop: 20,
//     letterSpacing: 1,
//   },
// });

export default SplashScreen;
