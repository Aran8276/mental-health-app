// src/views/AIChatbot/AIChatbot.tsx

import { useEffect, useState } from "react";
import AIChatbotView from "./AIChatbot.view";
import { GeminiChatResponse, Message, Conversation } from "./AIChatbot.type"; // Make sure type imports are correct
import { client } from "@/config/axiosClient";
import { AxiosError } from "axios";
import { toast } from "sonner";

// Dummy initial chat history for different conversations
const dummyChatHistories: Record<string | number, Message[]> = {
  chat1: [
    {
      id: 1,
      text: "Halo! Selamat datang di percakapan pertama Anda.",
      sender: "bot",
      timestamp: "10:00",
    },
  ],
  chat2: [
    {
      id: 101,
      text: "Mari kita bahas tentang manajemen stres.",
      sender: "bot",
      timestamp: "10:05",
    },
    {
      id: 102,
      text: "Tentu, saya merasa agak kewalahan akhir-akhir ini.",
      sender: "user",
      timestamp: "10:06",
    },
  ],
  new_chat: [
    {
      id: 1,
      text: "Halo! Saya di sini untuk membantu. Apa yang ada di pikiranmu hari ini?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ],
};

// Initial Conversations List
const initialConversations: Conversation[] = [
  { id: "chat1", title: "Diskusi Awal" },
  { id: "chat2", title: "Manajemen Stres" },
];

export default function AIChatbot() {
  // Ref removed from here, View handles its internal scroll refs
  const [selectedModel, setSelectedModel] = useState("Llama 3.1");

  // --- New State for Conversations ---
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [activeChatId, setActiveChatId] = useState<string | number | null>(
    initialConversations[0]?.id || "new_chat"
  ); // Default to first chat or new
  const [chatHistory, setChatHistory] =
    useState<Record<string | number, Message[]>>(dummyChatHistories); // Store history per chat ID
  const [messages, setMessages] = useState<Message[]>([]); // Current displayed messages

  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  // --- Load messages for the active chat ---
  useEffect(() => {
    if (activeChatId !== null) {
      // Load history or default message for the selected chat
      setMessages(chatHistory[activeChatId] || dummyChatHistories["new_chat"]);
    } else {
      setMessages(dummyChatHistories["new_chat"]); // Default if no chat is active (e.g., after deleting all)
    }
    // Reset input when chat changes
    setInputValue("");
  }, [activeChatId, chatHistory]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || activeChatId === null) return; // Check for active chat

    const newUserMessage: Message = {
      id: Date.now().toString(), // Use string timestamp as ID
      text: inputValue,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // --- Update local state first ---
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages); // Update displayed messages immediately
    setChatHistory((prev) => ({
      // Update the history for the current chat
      ...prev,
      [activeChatId]: updatedMessages,
    }));
    // --- Optionally update conversation title/last message ---
    // Find convo and update its preview here if needed
    // ...

    setInputValue("");
    setIsBotTyping(true);

    // --- API Call ---
    try {
      const res: GeminiChatResponse = (
        await client().post("/gemini-ai/chat", { body: inputValue })
      ).data;

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `${res.payload.response}`, // Consider markdown formatting here if API provides it
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const finalMessages = [...updatedMessages, botResponse];
      setMessages(finalMessages); // Update displayed messages with bot response
      setChatHistory((prev) => ({
        // Update history again with bot response
        ...prev,
        [activeChatId]: finalMessages,
      }));
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error?.response?.data?.msg || error.message || "Gagal mengirim pesan"
        );
        console.error("API Error:", error);
        // Optionally remove the user's message if API call fails critically
      } else {
        toast.error("Terjadi kesalahan tidak terduga.");
        console.error("Unknown Error:", error);
      }
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    // Consider auto-sending:
    // handleSendMessage();
  };

  // --- Conversation Management ---
  const handleSelectChat = (id: string | number) => {
    if (id !== activeChatId) {
      setActiveChatId(id);
      setIsBotTyping(false); // Stop typing indicator if switching
      // Messages will update via the useEffect hook
    }
  };

  const handleNewChat = () => {
    const newChatId = `new_chat_${Date.now()}`; // Create a unique ID
    const newConversation: Conversation = {
      id: newChatId,
      title: `Diskusi Baru ${
        conversations.filter((c) => c.title.startsWith("Diskusi Baru")).length +
        1
      }`,
    };

    setConversations((prev) => [newConversation, ...prev]); // Add to top
    setChatHistory((prev) => ({
      ...prev,
      [newChatId]: dummyChatHistories["new_chat"], // Start with default welcome message
    }));
    setActiveChatId(newChatId); // Switch to the new chat
  };

  // No need for scroll useEffect here, View component handles it with its own ref

  return (
    <AIChatbotView
      // Pass all required props down
      setSelectedModel={setSelectedModel}
      handleSendMessage={handleSendMessage}
      handleSuggestionClick={handleSuggestionClick}
      selectedModel={selectedModel}
      isBotTyping={isBotTyping}
      inputValue={inputValue}
      setInputValue={setInputValue}
      messages={messages} // Pass the currently active messages
      conversations={conversations}
      activeChatId={activeChatId}
      handleSelectChat={handleSelectChat}
      handleNewChat={handleNewChat}
    />
  );
}
