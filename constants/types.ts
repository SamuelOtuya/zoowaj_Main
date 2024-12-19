// UserInterface.ts
export interface UserData {
  id: string; // User ID
  email: string; // User Email
  createdAt: Date | string; // Creation Date
  updatedAt: Date | string; // Update Date
}

export interface UserProfileData {
  userId: string;
  profilePhoto: {
    url: string;
    public_id: string;
  };
  about: {
    first_name: string;
    last_name: string;
    username: string;
    phone_number: string;
    birthDate: Date | string;
    height: string;
    maritalStatus: string;
    tagline: string;
  };
  religiosity: {
    muslimSect: string;
    isConvert: boolean;
    religiousPractice: string;
    doYouPray: string;
    diet: string;
    doYouSmoke: boolean;
    hasTattoos: boolean;
  };
  marriageIntentions: {
    lookingToMarry: string;
    willingToRelocate: boolean;
    wantsChildren: boolean;
    livingArrangements: string;
    iceBreaker: string;
  };
  languageAndEthnicity: {
    languages: string[];
    ethnicGroup: string;
    ethnicOrigin: string;
    biography: string;
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
  createdAt: Date | string; // Creation Date
  updatedAt: Date | string; // Update Date
}

export interface messageData {
  id: string;
  senderId: string;
  recipientId: string;
  text: string;
  read: boolean;
  createdAt: Date | string; // Creation Date
  updatedAt: Date | string; // Update Date
}
