import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useAppDispatch } from "@/redux/hooks/redux-hooks";
import { useRouter } from "expo-router";
import { updateProfileField } from "@/redux/slices/profileSlice";
import { useSelector } from "react-redux";

export default function Screen4() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [lookingToMarry, setLookingToMarry] = useState("");
  const [willingToRelocate, setWillingToRelocate] = useState("");
  const [wantsChildren, setWantsChildren] = useState("");
  const [livingArrangements, setLivingArrangements] = useState("");
  const [iceBreaker, setIceBreaker] = useState("");

  const profileData = useSelector((state: any) => state.profile.data);

  const handleSubmit = () => {
    const marriageIntentions = {
      lookingToMarry,
      willingToRelocate,
      wantsChildren,
      livingArrangements,
      iceBreaker,
    };
    dispatch(
      updateProfileField({
        key: "marriageIntentions",
        value: marriageIntentions,
      })
    );
    console.log(`Profile Data 4: ${JSON.stringify(profileData, null, 2)}`);
    router.push("/(profile-details)/step-5");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Marriage Intentions</Text>

        <Text style={styles.label}>Looking to Marry:</Text>
        <RNPickerSelect
          onValueChange={(value) => setLookingToMarry(value)}
          items={[
            { label: "Within 1 year", value: "Within 1 year" },
            { label: "1-2 years", value: "1-2 years" },
            { label: "2-3 years", value: "2-3 years" },
            { label: "3-5 years", value: "3-5 years" },
          ]}
          placeholder={{ label: "Select your time frame", value: null }}
          style={pickerSelectStyles}
        />

        <Text style={styles.label}>Willing to Relocate:</Text>
        <RNPickerSelect
          onValueChange={(value) => setWillingToRelocate(value)}
          items={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
            { label: "Maybe", value: "Maybe" },
          ]}
          placeholder={{ label: "Select an option", value: null }}
          style={pickerSelectStyles}
        />

        <Text style={styles.label}>Wants Children:</Text>
        <RNPickerSelect
          onValueChange={(value) => setWantsChildren(value)}
          items={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
            { label: "Maybe", value: "Maybe" },
          ]}
          placeholder={{ label: "Select an option", value: null }}
          style={pickerSelectStyles}
        />

        <Text style={styles.label}>Living Arrangements:</Text>
        <RNPickerSelect
          onValueChange={(value) => setLivingArrangements(value)}
          items={[
            { label: "Living alone", value: "Living alone" },
            { label: "Living with family", value: "Living with family" },
            { label: "Living with roommates", value: "Living with roommates" },
          ]}
          placeholder={{ label: "Select an arrangement", value: null }}
          style={pickerSelectStyles}
        />

        <Text style={styles.label}>Ice Breaker (Max 120 characters):</Text>
        <TextInput
          value={iceBreaker}
          onChangeText={setIceBreaker}
          style={styles.input}
          maxLength={120}
          placeholder="Share something interesting about yourself"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const pickerSelectStyles = {
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
};

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
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
