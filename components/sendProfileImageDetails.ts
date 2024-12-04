export default async function setupProfileImageData(
  profileData: Record<string, any>
): Promise<FormData> {
  const formData = new FormData();

  // Add profile photo to FormData
  if (profileData.profilePhoto) {
    formData.append("profilePhoto", {
      uri: profileData.profilePhoto,
      name: "profile_photo.jpg",
      type: "image/jpeg",
    } as any); // Explicit cast for TypeScript
  }

  // Add cover photos individually
  if (profileData.coverPhotos?.length) {
    profileData.coverPhotos.forEach((photoUri: string, index: number) => {
      formData.append("coverPhotos", {
        uri: photoUri,
        name: `cover_photo_${index + 1}.jpg`,
        type: "image/jpeg",
      } as any); // Explicit cast for TypeScript
    });
  }

  return formData;
}

// export default async function setupProfileImageData(
//   profileData: Record<string, any>
// ): Promise<FormData> {
//   const formData = new FormData();

//   // Add profile photo to FormData
//   if (profileData.profilePhoto) {
//     formData.append("profilePhoto", {
//       uri: profileData.profilePhoto,
//       name: "profile_photo.jpg",
//       type: "image/jpeg",
//     } as any); // Explicit cast for TypeScript
//   }

//   // Add cover photos to FormData
//   if (profileData.coverPhotos?.length) {
//     profileData.coverPhotos.forEach((photoUri: string, index: number) => {
//       formData.append("coverPhotos", {
//         uri: photoUri,
//         name: `cover_photo_${index + 1}.jpg`,
//         type: "image/jpeg",
//       } as any);
//     });
//   }

//   return formData;
// }
