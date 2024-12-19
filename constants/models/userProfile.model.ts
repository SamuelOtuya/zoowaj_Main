import { UserProfileData } from "../types";

// UserProfile.ts
export class UserProfile implements UserProfileData {
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
    birthDate: Date;
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
  interests: any[]; // Consider defining more specific types if possible
  likes: any[];
  favorites: any[];
  coverPhotos: any[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: UserProfileData) {
    this.userId = data.userId;
    this.profilePhoto = data.profilePhoto;

    this.about = {
      ...data.about,
      birthDate:
        typeof data.about.birthDate === "string"
          ? new Date(data.about.birthDate)
          : data.about.birthDate,
    };

    this.religiosity = data.religiosity || {};
    this.marriageIntentions = data.marriageIntentions || {};
    this.languageAndEthnicity = data.languageAndEthnicity || {};
    this.educationAndCareer = data.educationAndCareer || {};
    this.interests = data.interests || [];
    this.likes = data.likes || [];
    this.favorites = data.favorites || [];
    this.coverPhotos = data.coverPhotos || [];

    this.createdAt =
      typeof data.createdAt === "string"
        ? new Date(data.createdAt)
        : data.createdAt; // Creation Date
    this.updatedAt =
      typeof data.updatedAt === "string"
        ? new Date(data.updatedAt)
        : data.updatedAt; // Update Date
  }

  // Serialize to JSON
  toJSON(): UserProfileData {
    return {
      userId: this.userId,
      profilePhoto: this.profilePhoto,
      about: {
        ...this.about,
        birthDate: this.about.birthDate.toISOString(),
      },
      religiosity: this.religiosity,
      marriageIntentions: this.marriageIntentions,
      languageAndEthnicity: {
        ...this.languageAndEthnicity,
        languages: Array.isArray(this.languageAndEthnicity.languages)
          ? this.languageAndEthnicity.languages
          : [], // Default to an empty array if not already an array
      },
      educationAndCareer: this.educationAndCareer,
      interests: this.interests,
      likes: this.likes,
      favorites: this.favorites,
      coverPhotos: this.coverPhotos,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  static fromJSON(data: UserProfileData): UserProfile {
    return new UserProfile({
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      about: {
        ...data.about,
        birthDate:
          typeof data.about.birthDate === "string"
            ? new Date(data.about.birthDate)
            : data.about.birthDate,
      },
    });
  }

  // Static method to create an instance from a JSON string
  static fromJSONString(jsonString: string): UserProfile {
    const data = JSON.parse(jsonString);

    return UserProfile.fromJSON(data);
  }

  // Example method to get full name
  getFullName(): string {
    return `${this.about.first_name} ${this.about.last_name}`;
  }

  // Example method to check if user is open to marriage
  isOpenToMarriage(): boolean {
    return this.marriageIntentions.lookingToMarry === "yes";
  }

  // Add more methods as needed for your application
}
