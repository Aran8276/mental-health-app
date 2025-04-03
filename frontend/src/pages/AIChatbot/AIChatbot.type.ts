// src/types/AIChatbot.type.ts (or wherever you define it)

import { Dispatch, SetStateAction } from "react";

// Keep existing interfaces
export interface GeminiChatResponse {
    msg: string;
    payload: Payload;
}
export interface Payload {
    response: string;
}
export interface Message {
    id: number | string; // Allow string IDs for potential future use
    text: string;
    sender: "user" | "bot";
    timestamp: string;
}

// Add Conversation Type
export interface Conversation {
    id: string | number;
    title: string; // e.g., "Diskusi Awal", "Mengelola Kecemasan"
    lastMessage?: string; // Optional snippet of the last message
    timestamp?: string; // Optional timestamp of last message
}

// Update Main Props
export interface AIChatbotProps {
    setSelectedModel: Dispatch<SetStateAction<string>>;
    handleSendMessage: () => void;
    handleSuggestionClick: (suggestion: string) => void;
    selectedModel: string;
    isBotTyping: boolean;
    inputValue: string;
    setInputValue: Dispatch<SetStateAction<string>>;
    messages: Message[];
    // Removed chatContainerRef from props, handled internally in View
    conversations: Conversation[]; // Add conversations list
    activeChatId: string | number | null; // Currently selected chat ID
    handleSelectChat: (id: string | number) => void; // Function to switch chat
    handleNewChat: () => void; // Function to start a new chat
}