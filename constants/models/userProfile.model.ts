import { ProfileData } from "../types";
import { User } from "./user.model";

export class UserProfile extends User implements ProfileData {
  userId: string;
  profilePhoto: any;
  about: any;
  religiosity: any;
  marriageIntentions: any;
  languageAndEthnicity: any;
  educationAndCareer: any;
  interests: any[];
  likes: any[];
  favorites: any[];
  coverPhotos: any[];

  constructor(userId: string, profileData: Record<string, any>) {
    super(
      profileData.userId,
      profileData.about.username + "@example.com",
      profileData.createdAt,
      profileData.updatedAt
    );
    this.userId = userId;
    this.profilePhoto = profileData.profilePhoto;
    this.about = profileData.about;
    this.religiosity = profileData.religiosity;
    this.marriageIntentions = profileData.marriageIntentions;
    this.languageAndEthnicity = profileData.languageAndEthnicity;
    this.educationAndCareer = profileData.educationAndCareer;
    this.interests = profileData.interests || [];
    this.likes = profileData.likes || [];
    this.favorites = profileData.favorites || [];
    this.coverPhotos = profileData.coverPhotos || [];
  }

  // Serialize to JSON
  toJSON(): Record<string, any> {
    return {
      ...super.toJSON(), // Include properties from User class
      profilePhoto: this.profilePhoto,
      about: this.about,
      religiosity: this.religiosity,
      marriageIntentions: this.marriageIntentions,
      languageAndEthnicity: this.languageAndEthnicity,
      educationAndCareer: this.educationAndCareer,
      interests: this.interests,
      likes: this.likes,
      favorites: this.favorites,
      coverPhotos: this.coverPhotos,
    };
  }

  // Deserialize from JSON
  static fromJSON(json: Record<string, any>): UserProfile {
    return new UserProfile(
      json.userId,
      json // Pass the entire JSON object for constructing the profile
    );
  }

  // Deserialize from JSON string
  static fromJSONString(jsonString: string): UserProfile {
    const jsonObject = JSON.parse(jsonString);
    return this.fromJSON(jsonObject);
  }
}
