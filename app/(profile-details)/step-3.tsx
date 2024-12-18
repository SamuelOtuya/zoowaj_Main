import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useAppDispatch } from "@/redux/hooks/redux-hooks";
import { useRouter } from "expo-router";
import { updateProfileField } from "@/redux/slices/profileSlice";
import { useSelector } from "react-redux";

export default function Screen3() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [muslimSect, setMuslimSect] = useState("");
  const [isConvert, setIsConvert] = useState("");
  const [religiousPractice, setReligiousPractice] = useState("");
  const [doYouPray, setDoYouPray] = useState("");
  const [diet, setDiet] = useState("");
  const [doYouSmoke, setDoYouSmoke] = useState("");
  const [hasTattoos, setHasTattoos] = useState("");

  const profileData = useSelector((state: any) => state.profile.data);

  const handleSubmit = () => {
    const religiosityData = {
      muslimSect,
      isConvert,
      religiousPractice,
      doYouPray,
      diet,
      doYouSmoke,
      hasTattoos,
    };
    dispatch(
      updateProfileField({ key: "religiosity", value: religiosityData })
    );
    console.log(`Profile Data 3: ${JSON.stringify(profileData, null, 2)}`);
    router.push("/(profile-details)/step-4");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Religious Information</Text>

        <Text style={styles.label}>Muslim Sect:</Text>
        <RNPickerSelect
          onValueChange={(value) => setMuslimSect(value)}
          items={[
            { label: "Sunni", value: "Sunni" },
            { label: "Shia", value: "Shia" },
            { label: "Other", value: "Other" },
          ]}
          placeholder={{ label: "Select your sect", value: null }}
          style={pickerStyles}
        />

        <Text style={styles.label}>Are you a convert?:</Text>
        <RNPickerSelect
          onValueChange={(value) => setIsConvert(value)}
          items={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
          placeholder={{ label: "Select an option", value: null }}
          style={pickerStyles}
        />

        <Text style={styles.label}>Religious Practice:</Text>
        <RNPickerSelect
          onValueChange={(value) => setReligiousPractice(value)}
          items={[
            { label: "Strict", value: "Strict" },
            { label: "Moderate", value: "Moderate" },
            { label: "Liberal", value: "Liberal" },
          ]}
          placeholder={{ label: "Select your practice", value: null }}
          style={pickerStyles}
        />

        <Text style={styles.label}>Do you pray?</Text>
        <RNPickerSelect
          onValueChange={(value) => setDoYouPray(value)}
          items={[
            { label: "Regularly", value: "Regularly" },
            { label: "Occasionally", value: "Occasionally" },
            { label: "Rarely", value: "Rarely" },
          ]}
          placeholder={{ label: "Select an option", value: null }}
          style={pickerStyles}
        />

        <Text style={styles.label}>Diet:</Text>
        <RNPickerSelect
          onValueChange={(value) => setDiet(value)}
          items={[
            { label: "Halal", value: "Halal" },
            { label: "Halal and Non-Halal", value: "Halal and Non-Halal" },
            { label: "Vegan", value: "Vegan" },
            { label: "Vegetarian", value: "Vegetarian" },
          ]}
          placeholder={{ label: "Select your diet", value: null }}
          style={pickerStyles}
        />

        <Text style={styles.label}>Do you smoke?</Text>
        <RNPickerSelect
          onValueChange={(value) => setDoYouSmoke(value)}
          items={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
            { label: "Occasionally", value: "Occasionally" },
          ]}
          placeholder={{ label: "Select an option", value: null }}
          style={pickerStyles}
        />

        <Text style={styles.label}>Do you have tattoos?</Text>
        <RNPickerSelect
          onValueChange={(value) => setHasTattoos(value)}
          items={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
          placeholder={{ label: "Select an option", value: null }}
          style={pickerStyles}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    color: "#333",
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    color: "#333",
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    paddingBottom: 20,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
