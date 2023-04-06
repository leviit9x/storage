import { io, Socket } from "socket.io-client";
import { Config } from "@/configs";

class IOClient {
  io: Socket;
  static instance: IOClient;

  private constructor() {
    this.io = io(Config.endpoint, { secure: true });
  }

  static getInstance = (): IOClient => {
    if (!IOClient.instance) {
      IOClient.instance = new IOClient();
    }
    return IOClient.instance;
  };

  public getSocket = (): Socket => {
    return this.io;
  };
}

const Connection: Socket = IOClient.getInstance().getSocket();

export { Connection };
