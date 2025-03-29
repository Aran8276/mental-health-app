import { Dispatch, SetStateAction } from "react";

export interface AIChatbotProps {
  setSelectedModel: Dispatch<SetStateAction<string>>;
  handleSendMessage: () => void;
  handleSuggestionClick: (sugggestion: string) => void;
  selectedModel: string;
  isBotTyping: boolean;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  messages: Message[];
}

export interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}
