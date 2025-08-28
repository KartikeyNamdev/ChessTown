import { useEffect, useState } from "react";
const ws_url = "ws://localhost:8080";
export const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  useEffect(() => {
    const ws = new WebSocket(ws_url);

    ws.onopen = () => {
      console.log("Connected");
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log("Disconnected");
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, []);
  return socket;
};
