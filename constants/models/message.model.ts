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
    id: string,
    senderId: string,
    recipientId: string,
    text: string,
    read: boolean,
    createdAt: Date | string,
    updatedAt: Date | string
  ) {
    // Fallback to a generated ID if `id` is undefined
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
      data.userId, // Assuming `userId` maps to `senderId`
      data.recipientId,
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
