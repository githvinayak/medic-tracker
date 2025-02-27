import { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  StyleSheet,
  Alert,
  Platform
} from "react-native";
import { useRouter } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { color } from "../node_modules/nativewind/src/tailwind/color";
import { asClass } from "../node_modules/tailwindcss/src/util/nameClass";

const { width, height } = Dimensions.get("window");

const AuthenticateScreen = () => {
  const [hasBiometric, sethasBiometric] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const checkBiometrics = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      sethasBiometric(hasHardware && isEnrolled);
    } catch (error) {
      console.log("Error checking biometrics:", error);
      sethasBiometric(false);
    }
  };
  const authHandler = async () => {
    try {
      setIsAuthenticating(true);
      setError(null);

      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const suppportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();


      // if (!hasHardware || !isEnrolled) {
      //   Alert.alert(
      //     "Biometric Authentication",
      //     "Biometrics not available. Please use PIN."
      //   );
      //   setIsAuthenticating(false);
      //   return;
      // }

      const auth  = await LocalAuthentication.authenticateAsync({
        promptMessage: hasHardware && isEnrolled ? "Use Face ID/Touch ID " : "Enter your PIN",
        fallbackLabel: " Use pin",
        cancelLabel:" Cancel",
        disableDeviceFallback: false,
      });
      
      if (auth.success) {
        setIsAuthenticating(false);
        router.push("/home"); // Navigate to home screen
      } else {
        setError("Authentication failed, please try again.");
        setIsAuthenticating(false);
      }
    } catch (error) {
      console.log("Authentication error:", error);
      setError("Authentication failed.");
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    checkBiometrics();
  }, []);

  return (
    <LinearGradient
      colors={["#4caf50", "#2e7d32"]} // ✅ Fixed hex code
      style={{ flex: 1 }}
    >
      <View className=" flex-1 flex justify-center items-center">
        <View className="w-28 h-28 bg-[rgba(255,255,255,0.2)] rounded-full flex justify-center items-center mb-2">
          <Ionicons name="medical" size={80} color="white" />
        </View>
        <Text className="text-2xl font-bold mb-3 shadow-slate-100 text-white">
          MedRemind
        </Text>
        <Text className="text-lg mb-8 text-white text-center">
          Your Personal Medication Reminder
        </Text>
        <View
          style={{ width: width - 40 }}
          className={`bg-white rounded-3xl p-6 flex items-center drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]`}
        >
          <Text className=" text-2xl text-[#333] font-bold mb-2 ">
            Weclone Back!
          </Text>
          <Text className="text-base text-[#666] mb-5 text-center ">
            {hasBiometric
              ? "Use Face ID/Touch ID or PIN to access your medications"
              : " Enter your PIN to access your medications"}
          </Text>
          <TouchableOpacity
            className={` bg-[#4caf50] rounded-lg w-full flex flex-row justify-center items-center py-4 px-6 ${
              isAuthenticating && " opacity-[0.7]"
            }`}
            onPress={authHandler}
            disabled={isAuthenticating}
          >
            <Ionicons
              name={hasBiometric ? "finger-print-outline" : "keypad-outline"}
              size={24}
              color="white"
              className="mr-2"
            />
            <Text className=" text-white text-lg font-[600]">
              {isAuthenticating
                ? "Verifying..."
                : hasBiometric
                ? "Authenticate"
                : "Enter PIN"}
            </Text>
          </TouchableOpacity>
          {error && (
            <View className=" flex flex-row py-2 px-4 items-center mt-3 bg-[#ffebee] rounded-md">
              <Ionicons name="alert-circle" size={22} color="#f44336" />
              <Text className=" text-[#f44336] text-base ml-3 font-medium">
                {error}
              </Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

export default AuthenticateScreen;
