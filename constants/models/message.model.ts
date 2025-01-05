import { messageData } from "../types";

export class Message implements messageData {
  id: string;
  senderId: {
    id: string;
    email: string;
  };
  recipientId: {
    id: string;
    email: string;
  };
  text: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    senderId: {
      id: string;
      email: string;
    },
    recipientId: {
      id: string;
      email: string;
    },
    text: string,
    read: boolean,
    createdAt: Date | string,
    updatedAt: Date | string
  ) {
    // Assign values to the fields
    this.id = id || `${Date.now()}-${Math.random()}`;
    this.senderId = senderId;
    this.recipientId = recipientId;
    this.text = text;
    this.read = read;
    this.createdAt =
      typeof createdAt === "string" ? new Date(createdAt) : createdAt;
    this.updatedAt =
      typeof updatedAt === "string" ? new Date(updatedAt) : updatedAt;
  }

  // Convert an instance to a plain object
  toJSON(): object {
    return {
      id: this.id,
      senderId: this.senderId,
      recipientId: this.recipientId,
      text: this.text,
      read: this.read,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  // Create an instance from a plain object
  static fromJSON(data: any): Message {
    return new Message(
      data.id || data._id, // Handle both `id` and `_id` from raw data
      {
        id: data.userId._id,
        email: data.userId.email,
      }, // Map `userId` to `senderId`
      {
        id: data.recipientId._id,
        email: data.recipientId.email,
      }, // Map `recipientId` object
      data.text,
      data.read,
      data.createdAt,
      data.updatedAt
    );
  }

  // Create an instance from a JSON string
  static fromJSONString(jsonString: string): Message {
    const data = JSON.parse(jsonString);
    return Message.fromJSON(data);
  }
}
