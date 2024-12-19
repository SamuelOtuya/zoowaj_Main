import { messageData } from "../types";

export class Message implements messageData {
  id: string;
  senderId: string;
  recipientId: string;
  text: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    _id: string,
    userId: string,
    recipientId: string,
    text: string,
    read: boolean,
    createdAt: Date | string,
    updatedAt: Date | string
  ) {
    this.id = _id;
    this.senderId = userId;
    this.recipientId = recipientId;
    this.text = text;
    this.read = read;
    this.createdAt =
      typeof createdAt === "string" ? new Date(createdAt) : createdAt; // Creation Date
    this.updatedAt =
      typeof updatedAt === "string" ? new Date(updatedAt) : updatedAt; // Update Date
  }

  // Method to convert an instance to a plain object
  toJSON(): object {
    return {
      id: this.id,
      userId: this.senderId,
      recipientId: this.recipientId,
      text: this.text,
      read: this.read,
      createdAt: this.createdAt.toISOString(), // Convert date to ISO string
      updatedAt: this.updatedAt.toISOString(), // Convert date to ISO string
    };
  }

  // Method to create an instance from a plain object
  static fromJSON(data: any): Message {
    return new Message(
      data.id,
      data.userId,
      data.recipientId,
      data.text,
      data.read,
      data.createdAt,
      data.updatedAt
    );
  }

  // Method to create an instance from a JSON string
  static fromJSONString(jsonString: string): Message {
    const data = JSON.parse(jsonString);
    return Message.fromJSON(data);
  }
}
