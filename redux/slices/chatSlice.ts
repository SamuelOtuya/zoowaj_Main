import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "react-native-gifted-chat";

interface ChatState {
  messages: IMessage[];
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    loadMessages(state, action: PayloadAction<IMessage[]>) {
      state.messages = action.payload;
    },
    loadChatMessages(state, action: PayloadAction<IMessage[]>) {
      state.messages = action.payload;
    },
    addMessage(state, action: PayloadAction<IMessage>) {
      state.messages.unshift(action.payload);
    },
  },
});

export const { loadMessages, loadChatMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer;

// // chatSlice.ts
// import { Message } from "@/constants/models/message.model";
// import { messageData } from "@/constants/types";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface ChatState {
//   messages: messageData[];
//   isTyping: boolean;
// }

// const initialState: ChatState = {
//   messages: [],
//   isTyping: false,
// };

// const chatSlice = createSlice({
//   name: "chat",
//   initialState,
//   reducers: {
//     addMessage: (state, action: PayloadAction<any>) => {
//       state.messages.push(Message.fromJSON(action.payload));
//     },
//     setTyping: (state, action: PayloadAction<boolean>) => {
//       state.isTyping = action.payload;
//     },
//     loadMessages: (state, action: PayloadAction<messageData[]>) => {
//       state.messages = action.payload;
//     },
//   },
// });

// export const { addMessage, setTyping, loadMessages } = chatSlice.actions;
// export default chatSlice.reducer;
