export default async function setupProfileImageData(
  profileData: Record<string, any>
): Promise<FormData> {
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
      formData.append("coverPhotos", coverPhoto); // Ensure this is correct
    });
  }

  return formData;
}
