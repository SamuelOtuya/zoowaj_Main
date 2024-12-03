import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useAppDispatch } from "@/redux/hooks/redux-hooks";
import { useRouter } from "expo-router";
import { saveProfileDetailsService } from "../../redux/services/profileservice"; // Assume the service is defined
import { updateProfileField } from "@/redux/slices/profileSlice";
import { useSelector } from "react-redux";

export default function Screen1() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [height, setHeight] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [tagline, setTagline] = useState("");

  const profileData2 = useSelector((state: any) => state.profile.data);

  const handleSubmit = () => {
    const profileData = {
      first_name: firstName,
      last_name: lastName,
      username,
      phone_number: phoneNumber,
      birthDate,
      height,
      maritalStatus,
      tagline,
    };
    dispatch(updateProfileField({ key: "about", value: profileData }));
    console.log(`Profile Data 1: ${JSON.stringify(profileData2, null, 2)}`);
    console.log(`Profile Data 1: ${JSON.stringify(profileData, null, 2)}`);
    router.push("/(profile-details)/profileDetailstwo");
  };

  return (
    <View style={styles.container}>
      <Text>First Name:</Text>
      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />

      <Text>Last Name:</Text>
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />

      <Text>Username:</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <Text>Phone Number:</Text>
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
      />

      <Text>Birth Date:</Text>
      <TextInput
        value={birthDate}
        onChangeText={setBirthDate}
        style={styles.input}
      />

      <Text>Height:</Text>
      <TextInput value={height} onChangeText={setHeight} style={styles.input} />

      <Text>Marital Status:</Text>
      <TextInput
        value={maritalStatus}
        onChangeText={setMaritalStatus}
        style={styles.input}
      />

      <Text>Tagline:</Text>
      <TextInput
        value={tagline}
        onChangeText={setTagline}
        style={styles.input}
      />

      <Button title="Next" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
});
