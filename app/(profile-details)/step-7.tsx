import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/redux-hooks";
import Icon from "react-native-vector-icons/MaterialIcons";
import ImagePickerService from "@/components/imagePicker";
import {
  createProfileDetailsService,
  createProfileImagesService,
} from "@/redux/services/profileService";
import setupProfileImageData from "@/components/sendProfileImageDetails";

interface ProfileData {
  profilePhoto: string | null;
  coverPhotos: string[];
  [key: string]: any;
}

const ProfileImagePicker: React.FC = () => {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [coverPhotos, setCoverPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const profileData = useAppSelector((state: any) => state.profile.data);
  const dispatch = useAppDispatch();

  const pickImage = async (type: "profile" | "cover") => {
    try {
      if (type === "profile") {
        const uri = await ImagePickerService.pickSingleImage();
        if (uri) {
          setProfilePhoto(uri);
        }
      } else {
        if (coverPhotos.length >= 6) {
          throw new Error("Maximum 6 cover photos allowed");
        }
        const uris = await ImagePickerService.pickMultipleImages(
          6 - coverPhotos.length
        );
        if (uris.length > 0) {
          const updatedCoverPhotos = [...coverPhotos, ...uris];
          setCoverPhotos(updatedCoverPhotos);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to pick image");
    }
  };

  const validateData = (data: ProfileData): boolean => {
    if (!data.profilePhoto) {
      setError("Profile photo is required");
      return false;
    }
    if (data.coverPhotos.length === 0) {
      setError("At least one cover photo is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      const updatedProfileData: ProfileData = {
        ...profileData,
        profilePhoto,
        coverPhotos,
      };

      // Validate data before dispatching
      if (!validateData(updatedProfileData)) {
        return;
      }

      // Dispatch the action to create/update the profile details
      const profileDetailsPayload = {
        ...profileData, // Use updated profile data for API
      };

      // Wait for the first dispatch to complete
      const profileDetailsResponse = await dispatch(
        createProfileDetailsService(profileDetailsPayload)
      );

      // Check if the first dispatch was successful
      if (profileDetailsResponse.meta.requestStatus === "fulfilled") {
        // Prepare image data only if profile details were successfully updated
        const profileImagesPayload = await setupProfileImageData({
          profilePhoto,
          coverPhotos,
        });

        // Dispatch the action to upload profile images
        const profileImagesResponse = await dispatch(
          createProfileImagesService(profileImagesPayload)
        );
        if (profileImagesResponse.meta.requestStatus === "fulfilled")
          alert("Profile updated successfully!");
      } else {
        // Handle error from the first dispatch
        setError("Failed to update profile details.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCoverPhoto = ({ item }: { item: string }) => (
    <View style={styles.coverPhotoItem}>
      <Image source={{ uri: item }} style={styles.coverPhotoImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick Your Photos</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.imagePickerContainer}>
        <TouchableOpacity
          onPress={() => pickImage("profile")}
          disabled={isSubmitting}
        >
          <View style={styles.imageButton}>
            {profilePhoto ? (
              <Image
                source={{ uri: profilePhoto }}
                style={[styles.image, styles.profileImage]}
              />
            ) : (
              <Icon name="photo-camera" size={50} color="#fff" />
            )}
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Cover Photos (Up to 6)</Text>
      <FlatList
        data={coverPhotos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCoverPhoto}
        horizontal
        contentContainerStyle={styles.coverPhotoList}
      />

      <TouchableOpacity
        onPress={() => pickImage("cover")}
        style={[
          styles.addCoverPhotoButton,
          isSubmitting && styles.disabledButton,
        ]}
        disabled={isSubmitting}
      >
        <Icon name="add-photo-alternate" size={50} color="#fff" />
      </TouchableOpacity>

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
    </View>
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
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "#555",
  },
  imagePickerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageButton: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 75,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
  profileImage: {
    borderRadius: 75,
  },
  coverPhotoList: {
    paddingHorizontal: 10,
  },
  coverPhotoItem: {
    marginRight: 10,
  },
  coverPhotoImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  addCoverPhotoButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: "center",
    marginVertical: 20,
  },
  saveButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  errorText: {
    color: "#ff3b30",
    textAlign: "center",
    marginBottom: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default ProfileImagePicker;
