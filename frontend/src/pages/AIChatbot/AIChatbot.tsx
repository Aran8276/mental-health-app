import { useEffect, useRef, useState } from "react";
import AIChatbotView from "./AIChatbot.view";
import {
  GeminiChatResponse,
  Conversation,
  Chat,
  GetConversationsResponse,
  GetChatsByConversationResponse,
  GeminiContentType,
  NewConvoResponse,
} from "./AIChatbot.type";
import { client } from "@/config/axiosClient";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function AIChatbot() {
  const [selectedModel, setSelectedModel] = useState("Llama 3.1");
  const viewportRef = useRef<HTMLDivElement>(null);
  const isSettingUpNewChat = useRef(false);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | number | null>(
    null
  );
  const [messages, setMessages] = useState<Chat[]>([]);

  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  useEffect(() => {
    fetchConvos();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      viewportRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 0);
  }, [messages]);

  useEffect(() => {
    if (conversations.length > 0 && activeChatId === null) {
      setActiveChatId(conversations[0].id);
    }
  }, [conversations, activeChatId]);

  useEffect(() => {
    if (isSettingUpNewChat.current) {
      setTimeout(() => {
        isSettingUpNewChat.current = false;
      }, 0);
      setInputValue("");
      return;
    }

    if (activeChatId && typeof activeChatId === "number") {
      fetchChatByConvo(activeChatId);
    }

    setInputValue("");
  }, [activeChatId]);

  const fetchConvos = async () => {
    try {
      const res: GetConversationsResponse = (
        await client().get("/ai-Conversation")
      ).data;
      setConversations(res.payload.conversations);
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
      if (error instanceof AxiosError) {
        toast.error(error.message || "Gagal memuat daftar percakapan.");
      } else {
        toast.error("Gagal memuat daftar percakapan.");
      }
    }
  };

  const fetchChatByConvo = async (id: string | number) => {
    if (typeof id !== "number") {
      console.warn("fetchChatByConvo called with non-numeric ID:", id);
      return;
    }
    console.log(`Fetching messages for convo ID: ${id}`);
    try {
      const res: GetChatsByConversationResponse = (
        await client().get(`/ai-chat/conversation/${id}`)
      ).data;
      setMessages(res.payload.chats);
    } catch (error) {
      console.error(`Failed to fetch chats for convo ID ${id}:`, error);
      setMessages([]);
      if (error instanceof AxiosError) {
        toast.error(
          error.message || `Gagal memuat pesan untuk percakapan ${id}.`
        );
      } else {
        toast.error(`Gagal memuat pesan untuk percakapan ${id}.`);
      }
    }
  };

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();

    if (!trimmedInput || typeof activeChatId !== "number") {
      if (!trimmedInput) return;

      toast.error(
        "Tidak dapat mengirim pesan: Percakapan tidak valid atau belum dipilih."
      );
      console.error(
        "handleSendMessage called with invalid activeChatId:",
        activeChatId
      );
      return;
    }

    const currentChatId = activeChatId;

    const newUserMessage: Chat = {
      id: Date.now(),
      body: trimmedInput,
      role: "USER",
      created_at: new Date(),
      ai_conversation_id: currentChatId,
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setIsBotTyping(true);

    try {
      await client().post(`/ai-chat/conversation/${currentChatId}`, {
        role: "USER",
        body: trimmedInput,
      });

      const formattedMsg: GeminiContentType[] = updatedMessages.map((msg) => ({
        role: msg.role === "AI" ? "model" : "user",
        parts: [{ text: msg.body }],
      }));

      const res: GeminiChatResponse = (
        await client().post("/gemini-ai/chat", {
          conversation_id: currentChatId,
          content: formattedMsg,
        })
      ).data;

      const aiResponseBody = res.payload?.response;

      if (
        !aiResponseBody ||
        typeof aiResponseBody !== "string" ||
        aiResponseBody.trim() === ""
      ) {
        console.warn("AI returned an empty or invalid response body.");
        toast.error("AI tidak memberikan respon yang valid.");
      } else {
        await client().post(`/ai-chat/conversation/${currentChatId}`, {
          role: "AI",
          body: aiResponseBody,
        });

        const botResponse: Chat = {
          id: Date.now() + 1,
          body: aiResponseBody,
          role: "AI",
          created_at: new Date(),
          ai_conversation_id: currentChatId,
        };

        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }
    } catch (error) {
      toast.error("Gagal mengirim atau menerima respon AI.");
      if (error instanceof AxiosError) {
        console.error("API Error:", error.response?.data || error.message);
        toast.error(
          error?.response?.data?.msg || error.message || "Gagal mengirim pesan"
        );
      } else {
        console.error("Unknown Error:", error);
        toast.error("Terjadi kesalahan tidak terduga.");
      }
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleSelectChat = (id: string | number) => {
    if (id !== activeChatId) {
      if (isSettingUpNewChat.current) {
        isSettingUpNewChat.current = false;
      }
      setActiveChatId(id);
      setIsBotTyping(false);
    }
  };

  const handleNewChat = async () => {
    isSettingUpNewChat.current = true;

    try {
      console.log("Creating new conversation...");

      const res: NewConvoResponse = (
        await client().post("/ai-Conversation", {
          title: "Diskusi Baru",
        })
      ).data;

      const newConversation: Conversation = res.payload;
      if (!newConversation || typeof newConversation.id !== "number") {
        throw new Error(
          "Invalid response received when creating conversation."
        );
      }

      console.log(`New conversation created with ID: ${newConversation.id}`);

      setConversations((prev) => [newConversation, ...prev]);

      setMessages([
        {
          id: Date.now(),
          body: "Halo! Saya di sini untuk membantu. Apa yang ada di pikiranmu hari ini?",
          role: "AI",
          created_at: new Date(),
          ai_conversation_id: newConversation.id,
        },
      ]);

      setActiveChatId(newConversation.id);

      console.log(
        `Active chat ID set to: ${newConversation.id}. Initial message set.`
      );
    } catch (error) {
      console.error("Failed to create new conversation:", error);
      toast.error("Gagal memulai percakapan baru.");

      isSettingUpNewChat.current = false;
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.msg || error.message);
      }
    }
  };

  return (
    <AIChatbotView
      setSelectedModel={setSelectedModel}
      handleSendMessage={handleSendMessage}
      handleSuggestionClick={handleSuggestionClick}
      selectedModel={selectedModel}
      isBotTyping={isBotTyping}
      inputValue={inputValue}
      setInputValue={setInputValue}
      messages={messages}
      conversations={conversations}
      activeChatId={activeChatId}
      handleSelectChat={handleSelectChat}
      handleNewChat={handleNewChat}
      viewportRef={viewportRef}
    />
  );
}
