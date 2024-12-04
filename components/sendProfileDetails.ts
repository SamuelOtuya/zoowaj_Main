import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function sendProfileData(
  endpoint: string,
  profileData: Record<string, any>
): Promise<any> {
  try {
    const formData = new FormData();

    // Add other profile data to FormData
    for (const key in profileData) {
      if (key !== "profilePhoto" && key !== "coverPhotos") {
        formData.append(key, profileData[key]);
      }
    }

    // Retrieve the bearer token from Async Storage
    const token = await AsyncStorage.getItem("bearerToken");
    console.log(`Token ${token}`);

    // Log FormData contents for debugging
    console.log(`Form Data: ${JSON.stringify(formData, null, 2)}`);

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
