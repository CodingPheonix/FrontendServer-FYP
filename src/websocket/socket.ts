export const createSocket = (url: string): WebSocket => {
  return new WebSocket(url);
};
