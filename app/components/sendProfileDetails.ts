import React from "react";

export default async function sendProfileData(
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

    // Add other profile data to FormData
    for (const key in profileData) {
      if (key !== "profilePhoto" && key !== "coverPhotos") {
        formData.append(key, profileData[key]);
      }
    }

    console.log(`Formdata: ${formData}`)

    // Send request to the backend
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
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
