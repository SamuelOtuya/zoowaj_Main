import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useAppDispatch } from "@/redux/hooks/redux-hooks";
import Icon from "react-native-vector-icons/MaterialIcons";
import ImagePickerService from "@/components/imagePicker";
import { createProfileImagesService } from "@/redux/services/profileService";
import setupProfileImageData from "@/components/sendProfileImageDetails";
import { router } from "expo-router";

interface ProfileMedia {
  profilePhoto: string | null;
  coverPhotos: string[];
}

const MAX_COVER_PHOTOS = 6;

const ProfileImagePicker: React.FC = () => {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [coverPhotos, setCoverPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const pickImage = async (type: "profile" | "cover") => {
    try {
      if (type === "profile") {
        const uri = await ImagePickerService.pickSingleImage();
        if (uri) {
          setProfilePhoto(uri);
        }
      } else {
        if (coverPhotos.length >= MAX_COVER_PHOTOS) {
          throw new Error(`Maximum ${MAX_COVER_PHOTOS} cover photos allowed`);
        }
        const uris = await ImagePickerService.pickMultipleImages(
          MAX_COVER_PHOTOS - coverPhotos.length
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

  const validateData = (data: ProfileMedia): boolean => {
    if (!data.profilePhoto) {
      setError("Profile photo is required");
      return false;
    }
    if (data.coverPhotos.length === 1) {
      setError("At least two cover photos are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      const userProfileData: ProfileMedia = {
        profilePhoto,
        coverPhotos,
      };

      if (!validateData(userProfileData)) {
        setError("Please provide valid profile data.");
        return;
      }

      const payload: FormData = await setupProfileImageData(userProfileData);
      const response = await dispatch(createProfileImagesService(payload));

      if (response.meta.requestStatus === "fulfilled") {
        Alert.alert("Profile updated successfully!");
        await router.replace("/(main)/tabs/home");
      } else {
        setError("Uploading profile images failed.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCoverPhotoItem = ({ item }: { item: string | null }) => {
    if (item === null) {
      // Render placeholder
      return (
        <TouchableOpacity 
          style={[styles.coverPhotoItem, styles.placeholderContainer]}
          onPress={() => pickImage("cover")}
          disabled={isSubmitting}
        >
          <Icon name="add-photo-alternate" size={30} color="#999" />
          <Text style={styles.placeholderText}>Add Photo</Text>
        </TouchableOpacity>
      );
    }

    // Render actual photo
    return (
      <View style={styles.coverPhotoItem}>
        <Image source={{ uri: item }} style={styles.coverPhotoImage} />
      </View>
    );
  };

  // Create array with actual photos and placeholders
  const coverPhotoItems = [
    ...coverPhotos,
    ...Array(MAX_COVER_PHOTOS - coverPhotos.length).fill(null)
  ];

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
              <>
                <Icon name="photo-camera" size={50} color="#999" />
                <Text style={styles.placeholderText}>Profile Photo</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Cover Photos (2-6 Required)</Text>
      <FlatList
        data={coverPhotoItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCoverPhotoItem}
        horizontal
        contentContainerStyle={styles.coverPhotoList}
        showsHorizontalScrollIndicator={false}
      />

      <TouchableOpacity
        style={[styles.saveButton, isSubmitting && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Create Profile</Text>
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
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "dashed",
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
    width: 100,
    height: 100,
  },
  placeholderContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "dashed",
  },
  placeholderText: {
    color: "#999",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  coverPhotoImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: "#20B2AA",
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