import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function sendProfileImageData(
  endpoint: string,
  profileData: Record<string, any>
): Promise<any> {
  try {
    const formData = new FormData();

    // Add profile photo to FormData
    if (profileData.profilePhoto) {
      const profilePhoto: any = {
        uri: profileData.profilePhoto,
        name: "profile_photo.jpg",
        type: "image/jpeg",
      };
      formData.append("profilePhoto", profilePhoto);
    }

    // Add cover photos to FormData
    if (profileData.coverPhotos?.length) {
      profileData.coverPhotos.forEach((photoUri: string, index: number) => {
        const coverPhoto: any = {
          uri: photoUri,
          name: `cover_photo_${index + 1}.jpg`,
          type: "image/jpeg",
        };
        formData.append("coverPhotos", coverPhoto);
      });
    }

    // Retrieve the bearer token from Async Storage
    const token = await AsyncStorage.getItem("bearerToken");

    // Send request to the backend
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, 
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to save profile data");
    }

    const responseData = await response.json();
    console.log("API Response:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending profile data:", error);
    throw error;
  }
}
