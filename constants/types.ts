// UserInterface.ts
export interface UserData {
  id: string; // User ID
  email: string; // User Email
  createdAt: Date; // Creation Date
  updatedAt: Date; // Update Date
}

export interface ProfileData {
  userId: string;
  profilePhoto: any; // Define more specific types if possible
  about: {
    first_name: string;
    last_name: string;
    username: string;
    phone_number?: string;
    birthDate?: string;
    height?: string;
    maritalStatus?: string;
    tagline?: string;
  };
  religiosity: {
    muslimSect?: string;
    isConvert?: boolean;
    religiousPractice?: string;
    doYouPray?: string;
    diet?: string;
    doYouSmoke?: boolean;
    hasTattoos?: boolean;
  };
  marriageIntentions: {
    lookingToMarry?: string;
    willingToRelocate?: boolean;
    wantsChildren?: boolean;
    livingArrangements?: string;
    iceBreaker?: string;
  };
  languageAndEthnicity: {
    languages: string[];
    ethnicGroup: string;
    ethnicOrigin: string;
    biography?: string;
  };
  educationAndCareer: {
    profession: string;
    education: string;
    jobTitle: string;
  };
  interests: any[]; // Define more specific types if possible
  likes: any[];
  favorites: any[];
  coverPhotos: any[];
}
