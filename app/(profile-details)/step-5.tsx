import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useAppDispatch } from "@/redux/hooks/redux-hooks";
import { useRouter } from "expo-router";
import { updateProfileField } from "@/redux/slices/profileSlice";
import { useSelector } from "react-redux";
import Checkbox from "expo-checkbox";

export default function Screen5() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [languages, setLanguages] = useState<string[]>([]);
  const [ethnicGroup, setEthnicGroup] = useState("");
  const [ethnicOrigin, setEthnicOrigin] = useState("");
  const [biography, setBiography] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const availableLanguages = [
    { label: "English", value: "English" },
    { label: "Arabic", value: "Arabic" },
    { label: "Urdu", value: "Urdu" },
    { label: "Bengali", value: "Bengali" },
    { label: "Other", value: "Other" },
  ];

  const toggleLanguage = (language: string) => {
    if (languages.includes(language)) {
      setLanguages(languages.filter((item) => item !== language));
    } else {
      setLanguages([...languages, language]);
    }
  };

  const profileData = useSelector((state: any) => state.profile.data);

  const handleSubmit = () => {
    const languageAndEthnicity = {
      languages,
      ethnicGroup,
      ethnicOrigin,
      biography,
    };
    dispatch(
      updateProfileField({
        key: "languageAndEthnicity",
        value: languageAndEthnicity,
      })
    );
    console.log(`Profile Data 5: ${JSON.stringify(profileData, null, 2)}`);
    router.push("/(profile-details)/step-6");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Language and Ethnicity</Text>

        <View>
          <Text style={styles.label}>Languages:</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.languageSelection}>
              {languages.length > 0 ? languages.join(", ") : "Select languages"}
            </Text>
          </TouchableOpacity>

          <Modal
            transparent={true}
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <FlatList
                  data={availableLanguages}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <View style={styles.checkboxContainer}>
                      <Checkbox
                        value={languages.includes(item.value)}
                        onValueChange={() => toggleLanguage(item.value)}
                      />
                      <Text style={styles.checkboxLabel}>{item.label}</Text>
                    </View>
                  )}
                />
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.doneButton}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <Text style={styles.label}>Ethnic Group:</Text>
        <RNPickerSelect
          onValueChange={(value) => setEthnicGroup(value)}
          items={[
            { label: "Asian", value: "Asian" },
            { label: "Black", value: "Black" },
            { label: "Hispanic", value: "Hispanic" },
            { label: "Middle Eastern", value: "Middle Eastern" },
            { label: "White", value: "White" },
            { label: "Other", value: "Other" },
          ]}
          placeholder={{ label: "Select an ethnic group", value: null }}
          style={pickerSelectStyles}
        />

        <Text style={styles.label}>Ethnic Origin:</Text>
        <RNPickerSelect
          onValueChange={(value) => setEthnicOrigin(value)}
          items={[
            { label: "Indian", value: "Indian" },
            { label: "Pakistani", value: "Pakistani" },
            { label: "Bangladeshi", value: "Bangladeshi" },
            { label: "Arab", value: "Arab" },
            { label: "Turkish", value: "Turkish" },
            { label: "Other", value: "Other" },
          ]}
          placeholder={{ label: "Select an ethnic origin", value: null }}
          style={pickerSelectStyles}
        />

        <Text style={styles.label}>Biography (Max 500 characters):</Text>
        <TextInput
          value={biography}
          onChangeText={setBiography}
          style={styles.input}
          maxLength={500}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
  languageSelection: {
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginVertical: 40,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  doneButton: {
    paddingVertical: 10,
    alignItems: "center",
  },
  doneButtonText: {
    color: "#007BFF",
    fontWeight: "bold",
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

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
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
    borderWidth: 0.5,
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
