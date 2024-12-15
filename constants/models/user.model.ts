import { UserData } from "../types";

export class User implements UserData {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, email: string, createdAt: Date, updatedAt: Date) {
    this.id = id; // User ID
    this.email = email; // User Email
    this.createdAt = new Date(createdAt); // Creation Date
    this.updatedAt = new Date(updatedAt); // Update Date
  }

  // Serialize to JSON
  toJSON(): Record<string, any> {
    return {
      id: this.id,
      email: this.email,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  // Deserialize from JSON
  static fromJSON(json: Record<string, any>): User {
    return new User(json.id, json.email, json.createdAt, json.updatedAt);
  }
}
