import { useEffect, useRef, useState } from "react";
import AIChatbotView from "./AIChatbot.view";
import { GeminiChatResponse, Message } from "./AIChatbot.type";
import { client } from "@/config/axiosClient";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function AIChatbot() {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedModel, setSelectedModel] = useState("Llama 3.1");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Halo! Saya di sini untuk membantu. Apa yang ada di pikiranmu hari ini?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const newUserMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsBotTyping(true);

    try {
      const res: GeminiChatResponse = (
        await client().post("/gemini-ai/chat", {
          body: inputValue,
        })
      ).data;

      const botResponse: Message = {
        id: Date.now() + 1,
        text: `${res.payload.response}`,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setIsBotTyping(false);
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(error?.message);
        console.log(error);
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isBotTyping]);

  useEffect(() => {
    chatContainerRef?.current?.scrollIntoView(false);
  }, [messages]);

  return (
    <AIChatbotView
      setSelectedModel={setSelectedModel}
      handleSendMessage={handleSendMessage}
      handleSuggestionClick={handleSuggestionClick}
      inputValue={inputValue}
      isBotTyping={isBotTyping}
      messages={messages}
      selectedModel={selectedModel}
      setInputValue={setInputValue}
      chatContainerRef={chatContainerRef}
    />
  );
}
