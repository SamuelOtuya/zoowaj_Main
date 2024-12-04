import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
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
  // console.log(`Profile Data 3: ${JSON.stringify(profileData, null, 2)}`)

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
    <View style={styles.container}>
      <Text>Muslim Sect:</Text>
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

      <Text>Are you a convert?:</Text>
      <RNPickerSelect
        onValueChange={(value) => setIsConvert(value)}
        items={[
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
        ]}
        placeholder={{ label: "Select an option", value: null }}
        style={pickerStyles}
      />

      <Text>Religious Practice:</Text>
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

      <Text>Do you pray?</Text>
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

      <Text>Diet:</Text>
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

      <Text>Do you smoke?</Text>
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

      <Text>Do you have tattoos?</Text>
      <RNPickerSelect
        onValueChange={(value) => setHasTattoos(value)}
        items={[
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
        ]}
        placeholder={{ label: "Select an option", value: null }}
        style={pickerStyles}
      />

      <Button title="Next" onPress={handleSubmit} />
    </View>
  );
}

const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    marginBottom: 10,
  },
});

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});
