import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

function App() {
  const [streamData, setStreamData] = useState(null);
  let socket: Socket;

  useEffect(() => {
    // 소켓 연결을 설정합니다.
    socket = io("http://localhost:5000", {
      transports: ["websocket"], // Websocket 전송 방식 사용
    });

    // 데이터 스트림을 구독합니다.
    socket.on("streamData", (data) => {
      console.log("??");
      setStreamData(data);
    });

    // 컴포넌트 언마운트 시 소켓 연결을 해제합니다.
    return () => {
      socket.disconnect();
    };
  }, []);

  // 데이터 전송 함수
  const sendData = () => {
    const data = "Some data to send"; // 전송할 데이터
    socket.emit("streamData", data); // 서버로 데이터 전송
  };

  return (
    <div>
      <button onClick={() => sendData()}>Send</button>
      {streamData ? <p>New data: {streamData}</p> : <p>No data yet.</p>}
    </div>
  );
}

export default App;
