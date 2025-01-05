import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useAppDispatch } from "@/redux/hooks/redux-hooks";
import { useRouter } from "expo-router";
import { updateProfileField } from "@/redux/slices/profileSlice";
import { useSelector } from "react-redux";

const MAX_INTERESTS = 5;

const interests = [
  "Photography",
  "Shopping",
  "Karaoke",
  "Yoga",
  "Cooking",
  "Tennis",
  "Running",
  "Swimming",
  "Art",
  "Traveling",
  "Extreme Sports",
  "Music",
  "Drinking",
  "Video Games",
];

export default function Screen2() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // State to manage selected interests
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // Access profile data from Redux store
  const profileData = useSelector((state: any) => state.profile.data);

  // Function to handle interest selection
  const handleInterestChange = (interest: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((item) => item !== interest);
      } else if (prev.length < MAX_INTERESTS) {
        return [...prev, interest];
      }
      return prev;
    });
  };

  // Function to handle form submission
  const handleSubmit = () => {
    dispatch(
      updateProfileField({ key: "interests", value: selectedInterests })
    );
    console.log(
      `Profile Data before navigation: ${JSON.stringify(profileData, null, 2)}`
    );
    router.push("/(profile-details)/step-3");
  };

  // Render individual interest items
  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.button,
        selectedInterests.includes(item) && styles.selectedButton,
      ]}
      onPress={() => handleInterestChange(item)}
    >
      <Text style={styles.buttonText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Select Your Interests:</Text>
        <Text style={styles.counter}>
          Selected: {selectedInterests.length} / {MAX_INTERESTS}
        </Text>
        <FlatList
          data={interests}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
        <TouchableOpacity
          style={[
            // styles.button,
            {
              height: 50,
              borderRadius: 8,
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedInterests.length === 0 ? "#ccc" : "#20B2AA",
            },
          ]}
          onPress={handleSubmit}
          disabled={selectedInterests.length === 0}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    paddingBottom: 20,
  },
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 10,
  },
  counter: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  listContainer: {
    paddingBottom: 20,
    flexGrow: 1,
    justifyContent: "center",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray", // Default color for unselected buttons
  },
  selectedButton: {
    backgroundColor: "#20B2AA", // Green when selected
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
