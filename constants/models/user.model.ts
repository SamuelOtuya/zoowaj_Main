import { UserData } from "../types";

export class User implements UserData {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    _id: string,
    email: string,
    createdAt: Date | string,
    updatedAt: Date | string
  ) {
    this.id = _id; // User ID
    this.email = email; // User Email
    this.createdAt =
      typeof createdAt === "string" ? new Date(createdAt) : createdAt; // Creation Date
    this.updatedAt =
      typeof updatedAt === "string" ? new Date(updatedAt) : updatedAt; // Update Date
  }

  // Serialize to JSON
  toJSON(): UserData {
    return {
      id: this.id,
      email: this.email,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  // Deserialize from JSON object
  static fromJSON(json: Record<string, any>): User {
    return new User(
      json.id,
      json.email,
      new Date(json.createdAt), // Ensure createdAt is a Date object
      new Date(json.updatedAt) // Ensure updatedAt is a Date object
    );
  }

  // Deserialize from JSON string
  static fromJSONString(jsonString: string): User {
    const jsonObject = JSON.parse(jsonString);
    return this.fromJSON(jsonObject);
  }
}
