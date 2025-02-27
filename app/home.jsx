import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  Animated,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Modal,
} from "react-native";
import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

const { width, height } = Dimensions.get("window");
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const QUICK_ACTIONS = [
  {
    icon: "add-circle-outline",
    label: "Add\nMedication",
    route: "/medications/add",
    color: "#2E7D32",
    gradient: ["#4CAF50", "#2E7D32"],
  },
  {
    icon: "calendar-outline",
    label: "Calendar\nView",
    route: "/calendar",
    color: "#1976D2",
    gradient: ["#2196F3", "#1976D2"],
  },
  {
    icon: "time-outline",
    label: "History\nLog",
    route: "/history",
    color: "#C2185B",
    gradient: ["#E91E63", "#C2185B"],
  },
  {
    icon: "medical-outline",
    label: "Refill\nTracker",
    route: "/refills",
    color: "#E64A19",
    gradient: ["#FF5722", "#E64A19"],
  },
];

const CircularProgress = ({ progress, totalDoses, completedDoses }) => {
  const animationValue = useRef(new Animated.Value(0)).current;
  const size = width * 0.55;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);
  const strokeDashoffset = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });
  return (
    <View className=" flex justify-center items-center my-3">
      <View className="absolute z-1 flex justify-center items-center ">
        <Text className="text-4xl font-bold text-white">
          {Math.round(progress)}%
        </Text>
        <Text className="text-lg font-bold text-[rgba(255,255,255,0.9)]">
          {completedDoses} of {totalDoses} doses
        </Text>
      </View>
      <Svg width={size} height={size} style={styles.progressRing}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="white"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap={"round"}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
    </View>
  );
};

const HomeScreen = () => {
  return (
    <ScrollView
      className="flex-1 bg-[#f8f9fa]"
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient style={styles.header} colors={["#1a8e2d", "#146922"]}>
        <View className="flex items-center px-4">
          <View className="w-full flex flex-row items-center mb-6">
            <View className="flex-1">
              <Text className="text-lg font-bold text-white opacity-[0.9]">
                Daily Progress
              </Text>
            </View>
            <TouchableOpacity className="relative p-2 bg-[rgba(255,255,255,0.15)] rounded-xl ml-4">
              <Ionicons name="notifications-outline" size={24} color="white" />
              {
                <View className=" absolute top-[-4] right-[-4] bg-[#ff5252] rounded-full h-6 flex justify-center items-center border-2 border-[#146922] min-w-6">
                  <Text className=" text-xs font-bold text-white">5</Text>
                </View>
              }
            </TouchableOpacity>
          </View>
          {/* circular progress */}
          <CircularProgress progress={50} totalDoses={10} completedDoses={5} />
        </View>
      </LinearGradient>

      <View className="flex-1 pt-4">
        <View className="px-5  mb-4">
          <Text className=" text-xl font-[700] text-[#1a1a1a] mb-2">
            Quick Actions
          </Text>
          <View className="flex flex-row flex-wrap gap-4 mt-4">
            {QUICK_ACTIONS.map((action) => (
              <Link href={action.route} key={action.label} asChild>
                <TouchableOpacity
                  style={{ width: (width - 52) / 2, height: 110 }}
                  className="rounded-2xl overflow-hidden"
                >
                  <LinearGradient
                    colors={action.gradient}
                    style={styles.actionGradient}
                  >
                    <View className="flex-1 flex justify-between">
                      <View className="w-12 h-12 rounded-xl bg-[rgba(255,255,255,0.2)] flex justify-center items-center">
                        <Ionicons name={action.icon} size={28} color="white" />
                      </View>
                      <Text className="text-[1rem] font-[600] text-white mt-[0.6rem]">
                        {action.label}
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </View>
        <View className="px-4">
          <View className="flex flex-row justify-between items-center mb-2">
            <Text className=" text-xl font-[700] text-[#1a1a1a] mb-2">
              Today's Schedule
            </Text>
            <Link href="/calender">
              <TouchableOpacity>
                <Text className=" text-[#2e7d32] font-[600]">See All</Text>
              </TouchableOpacity>
            </Link>
          </View>
          {true ? (
            <View className="flex items-center p-6 bg-white rounded-lg mt-1">
              <Ionicons name="medical-outline" size={48} color="#ccc" />
              <Text className="text-base text-[#666] mt-3 mb-4">
                No medication Schedule for today
              </Text>
              <Link href="/medication/add">
                <TouchableOpacity className="bg-[#1a8e2d] px-4 py-2 rounded-2xl ">
                  <Text className=" font-[600] text-white">
                    {" "}
                    Add Medication
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          ) : (
            [].map((medications) => {
              {
                /* const taken */
              }
              return (
                <View
                  key={Math.random()}
                  className="flex flex-row items-center bg-white rounded-md p-4 mb-3 shadow-md shadow-black/5"
                >
                  <View
                    className={`w-16 h-16 rounded-xl flex justify-center items-center mr-3 bg-[${medications.color}]`}
                  >
                    <Ionicons
                      name="medical"
                      size={24}
                      color={medications.color}
                    />
                  </View>
                  <View className="flex-1 flex justify-between ">
                    <View>
                      <Text className="text-base font-semibold text-[#333] mb-1">
                        Medication 1
                      </Text>
                      <Text className="text-sm text-[#666] mb-1">dosage</Text>
                    </View>
                    <View className="flex flex-row items-center">
                      <Ionicons name="time-outline" size={16} color="#ccc" />
                      <Text className="ml-2 text-[#666] text-sm">12:00 PM</Text>
                    </View>
                  </View>
                  {true ? (
                    <View className="flex flex-row bg-[#e8f5e9] px-4 py-2 rounded-md ml-3">
                      <Ionicons
                        name="checkmark-circle-outline"
                        size={24}
                        color="#00c853"
                      />
                      <Text className="text-[#4caf50] font-semibold text-sm ml-1">
                        Taken
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity className="py-3 px-5 rounded-md ml-3">
                      <Text className="font-semibold text-white text-base">
                        Take
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })
          )}
        </View>
      </View>
      <Modal visible={true} transparent={true} animationType="slide">
        <View className="flex-1 bg-[rgba(0,0,0,0.5)] flex justify-end">
          <View className=" bg-white rounded-tr-[1.5rem] rounded-tl-[1.5rem] p-8 max-h-[80%]">
            <View className="flex flex-row justify-between items-center mb-4">
              <Text className="font-bold text-lg text-[#333]">
                Notifications
              </Text>
              <TouchableOpacity className="p-2">
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            {[].map(() => {
              <View className="flex flex-row p-5 rounded-md bg-[#f5f5f5] mb-4">
                <View className="w-16 h-16 rounded-xl bg-[#e8f5e9] flex justify-center items-center mr-5">
                  <Ionicons name="medical" size={24} color={""} />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-lg text-[#333] mb-1">
                    medication name
                  </Text>
                  <Text className="text-base text-[#666] mb-1">
                    {" "}
                    medication dosage
                  </Text>
                  <Text className="text-sm text-[#999]"> medication time</Text>
                </View>
              </View>;
            })}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  progressRing: {
    transform: [{ rotate: "-90deg" }],
  },
  actionGradient: {
    flex: 1,
    padding: 15,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 15,
  },
  actionButton: {
    width: (width - 52) / 2,
    height: 110,
    borderRadius: 16,
    overflow: "hidden",
  },
  actionGradient: {
    flex: 1,
    padding: 15,
  },
  actionContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    marginTop: 8,
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 5,
  },
});

//className="text-base font-bold text-white" progress details
// empty state
//empty state text
