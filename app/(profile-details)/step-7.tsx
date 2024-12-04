import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/redux-hooks";
import { createProfileDetailsService } from "@/redux/services/profileService";
import { Redirect } from "expo-router";

const ProfileDetailsPage = () => {
  const profileData = useAppSelector((state: any) => state.profile.data);

  const [formData, setFormData] = useState(profileData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleInputChange = (key: string, value: any, category?: string) => {
    if (category) {
      setFormData({
        ...formData,
        [category]: { ...formData[category], [key]: value },
      });
    } else {
      setFormData({ ...formData, [key]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await dispatch(createProfileDetailsService(formData));

      if (response.meta.requestStatus === "fulfilled") {
        Alert.alert("Success", "Profile updated successfully!");
        return <Redirect href={"/step-8"} />;
      } else {
        setError(response.payload?.message || "Failed to update profile.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update profile."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSection = (sectionTitle: string, sectionData: object) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      {Object.entries(sectionData).map(([key, value]) => {
        // Handle array data differently (e.g., languages)
        if (Array.isArray(value)) {
          return (
            <View key={key} style={styles.inputContainer}>
              <Text style={styles.label}>{key}</Text>
              <TextInput
                style={styles.input}
                value={value.join(", ")} // Join array items as a comma-separated string
                onChangeText={
                  (text) =>
                    handleInputChange(key, text.split(", "), sectionTitle) // Split string back to array
                }
              />
            </View>
          );
        }
        // Handle objects (nested data)
        if (typeof value === "object" && value !== null) {
          return renderSection(key, value);
        }
        // Handle simple key-value pairs
        return (
          <View key={key} style={styles.inputContainer}>
            <Text style={styles.label}>{key}</Text>
            <TextInput
              style={styles.input}
              value={String(value)} // Cast to string
              onChangeText={(text) =>
                handleInputChange(key, text, sectionTitle)
              }
            />
          </View>
        );
      })}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}> Profile Details</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {Object.entries(formData).map(([sectionKey, sectionData]) =>
        typeof sectionData === "object" && sectionData !== null ? (
          renderSection(sectionKey, sectionData)
        ) : (
          <View key={sectionKey} style={styles.inputContainer}>
            <Text style={styles.label}>{sectionKey}</Text>
            <TextInput
              style={styles.input}
              value={String(sectionData)} // Cast to string
              onChangeText={(text) => handleInputChange(sectionKey, text)}
            />
          </View>
        )
      )}

      <TouchableOpacity
        style={[styles.saveButton, isSubmitting && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Save Profile</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  errorText: {
    color: "#ff3b30",
    textAlign: "center",
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#555",
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default ProfileDetailsPage;
