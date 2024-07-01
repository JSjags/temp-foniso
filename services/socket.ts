// services/socket.ts
import { io, Socket } from "socket.io-client";
import { EventEmitter } from "events";
import { TChatConversation, TChatMessage } from "@/types";

class SocketService extends EventEmitter {
  private static instance: SocketService;
  private socket: Socket | null = null;

  private constructor() {
    super();
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  connect(url: string, authToken: string) {
    if (!this.socket) {
      this.socket = io(url, {
        extraHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      this.socket.on("connect", () => {
        console.log("Socket connected");
        this.emit("connected");
      });

      this.socket.on("connect_error", (error) => {
        console.error("Connection error:", error);
      });

      this.socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  onEvent(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  emitEvent(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  emitAndWait(eventName: string, data?: any, timeout = 90000): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        return reject(new Error("Socket is not connected"));
      }

      this.socket.emit(eventName, data, (response: any) => {
        resolve(response);
      });

      setTimeout(() => {
        reject(new Error("Socket event timed out"));
      }, timeout);
    });
  }

  async getConversations(): Promise<TChatConversation[]> {
    try {
      const conversations = (await this.emitAndWait(
        "getConversations"
      )) as TChatConversation[];
      return conversations;
    } catch (error) {
      console.error("Failed to get conversations:", error);
      throw error;
    }
  }

  async updateMessageStatus(data: number[]): Promise<any> {
    try {
      const response = (await this.emitAndWait("updateMessage", data)) as any;
      console.log(response);

      return response;
    } catch (error) {
      console.error("Failed to update read receipt", error);
      throw error;
    }
  }

  async deleteConversation(id: string): Promise<string> {
    try {
      const res = await this.emitAndWait("deleteConversation", {
        conversationId: parseInt(id),
      });
      return res;
    } catch (error) {
      console.error("Failed to delete conversations:", error);
      throw error;
    }
  }

  async getMessages({
    receiverId,
    page,
    pageSize,
  }: {
    receiverId: number;
    page: number;
    pageSize: number;
  }): Promise<TChatMessage[]> {
    try {
      const messages = (await this.emitAndWait("getMessages", {
        receiverId,
        page,
        pageSize,
      })) as TChatMessage[];
      return messages;
    } catch (error) {
      console.error("Failed to get messages:", error);
      throw error;
    }
  }

  async getMoreMessages({
    receiverId,
    page,
    pageSize,
  }: {
    receiverId: number;
    page: number;
    pageSize: number;
  }): Promise<TChatMessage[]> {
    if (page === 1) return [];
    try {
      const messages = (await this.emitAndWait("getMessages", {
        receiverId,
        page,
        pageSize,
      })) as TChatMessage[];
      return messages;
    } catch (error) {
      console.error("Failed to get messages:", error);
      throw error;
    }
  }
}

const socketService = SocketService.getInstance();
export default socketService;
