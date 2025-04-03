import { Dispatch, Ref, SetStateAction } from "react";

export interface AIChatbotProps {
  setSelectedModel: Dispatch<SetStateAction<string>>;
  handleSendMessage: () => void;
  handleSuggestionClick: (sugggestion: string) => void;
  selectedModel: string;
  isBotTyping: boolean;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  messages: Message[];
  chatContainerRef: Ref<HTMLDivElement | null>;
}

export interface GeminiChatResponse {
  msg: string;
  payload: Payload;
}

export interface Payload {
  response: string;
}

export interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}
