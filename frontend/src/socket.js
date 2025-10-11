import { io } from "socket.io-client";


const socket = io("https://mlsc-admin-backend-1.onrender.com");


export const onEvent = (event, callback) => {
  socket.on(event, callback);
};


export const emitEvent = (event, data) => {
  socket.emit(event, data);
};


export const offEvent = (event, callback) => {
  socket.off(event, callback);
};

export default socket;
