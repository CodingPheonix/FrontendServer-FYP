import { socket } from "./socket";

export const disconnectGeminiSocket = () => {
  socket.disconnect();
};

export const connectGeminiSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const setupGeminiListeners = (
  onAudioOutput: (data: ArrayBuffer) => void,
  onTextOutput: (text: string) => void,
  onInterrupted: () => void,
  onWarning: (msg: string) => void
) => {
  socket.on("audio_output", onAudioOutput);
  socket.on("text_output", onTextOutput);
  socket.on("interrupted", onInterrupted);
  socket.on("session_warning", onWarning);
};

export const removeGeminiListeners = () => {
  socket.off("audio_output");
  socket.off("text_output");
  socket.off("interrupted");
  socket.off("session_warning");
};

export const emitStartLiveSession = () => {
  socket.emit("start_live_session");
};

export const emitAudioInput = (arrayBuffer: ArrayBuffer) => {
  socket.emit("audio_input", arrayBuffer);
};
