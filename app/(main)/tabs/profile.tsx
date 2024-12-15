import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

interface ProfileData {
  name: string;
  location: string;
  profileImage?: string;
  bannerImage?: string;
}

const API_ENDPOINT = 'https://your-api-endpoint.com/api'; // Replace with your API endpoint
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload'; // Replace with your Cloudinary account details
const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET'; // Replace with your Cloudinary preset

const ProfileScreen: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isFaceIDEnabled, setIsFaceIDEnabled] = useState<boolean>(true);
  const router = useRouter();

  const { width } = Dimensions.get('window');

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/profile`);
      if (!response.ok) throw new Error('Failed to fetch profile data');
      const data: ProfileData = await response.json();
      setProfileData(data);
      if (data.profileImage) setProfileImage(data.profileImage);
      if (data.bannerImage) setBannerImage(data.bannerImage);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch profile data',
      });
    }
  };

  const pickImage = async (setImage: React.Dispatch<React.SetStateAction<string | null>>) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImageToCloudinary = async (fileUri: string): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: fileUri,
        type: 'image/jpeg',
        name: 'upload.jpg',
      });
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Upload Error',
        text2: 'Failed to upload image',
      });
      return null;
    }
  };

  const updateProfileImage = async () => {
    if (!profileImage) return;

    const imageUrl = await uploadImageToCloudinary(profileImage);
    if (imageUrl) {
      try {
        await fetch(`${API_ENDPOINT}/update-profile-image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl }),
        });

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Profile image updated successfully',
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Update Error',
          text2: 'Failed to update profile image',
        });
      }
    }
  };

  const updateBannerImage = async () => {
    if (!bannerImage) return;

    const imageUrl = await uploadImageToCloudinary(bannerImage);
    if (imageUrl) {
      try {
        await fetch(`${API_ENDPOINT}/update-banner-image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl }),
        });

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Banner image updated successfully',
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Update Error',
          text2: 'Failed to update banner image',
        });
      }
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_ENDPOINT}/logout`, {
        method: 'POST',
      });

      Toast.show({
        type: 'success',
        text1: 'Logged Out',
        text2: 'You have successfully logged out.',
      });

      router.replace('/');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Logout Error',
        text2: 'Failed to log out',
      });
    }
  };

  return (
    <>
      <StatusBar style="light" backgroundColor="black" />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <TouchableOpacity onPress={() => pickImage(setBannerImage)}>
            <Image source={{ uri: bannerImage || undefined }} style={[styles.bannerImage, { width }]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={updateBannerImage}>
            <Text>Upload Banner Image</Text>
          </TouchableOpacity>

          <View style={styles.profileInfo}>
            <TouchableOpacity onPress={() => pickImage(setProfileImage)}>
              <Image source={{ uri: profileImage || undefined }} style={styles.profileImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={updateProfileImage}>
              <Text>Update Profile Image</Text>
            </TouchableOpacity>
            <Text style={styles.name}>{profileData?.name || 'Loading...'}</Text>
            <Text style={styles.location}>{profileData?.location || 'Loading...'}</Text>
          </View>

          <View style={styles.settingsSection}>
            <View style={styles.settingItem}>
              <Ionicons name="finger-print-outline" size={24} color="#20B2AA" />
              <Text style={styles.settingText}>Face ID / Touch ID</Text>
              <Switch value={isFaceIDEnabled} onValueChange={setIsFaceIDEnabled} />
            </View>
            <TouchableOpacity style={styles.settingItem} onPress={logout}>
              <Ionicons name="log-out-outline" size={24} color="#20B2AA" />
              <Text style={styles.settingText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  bannerImage: { height: 200 },
  profileInfo: { alignItems: 'center', marginTop: -50 },
  profileImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#fff' },
  name: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  location: { fontSize: 16, color: '#666', marginTop: 5 },
  settingsSection: { marginTop: 20, backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 10 },
  settingItem: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  settingText: { flex: 1, marginLeft: 15, fontSize: 16 },
});

export default ProfileScreen;

