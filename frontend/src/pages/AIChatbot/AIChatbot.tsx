import { useEffect, useRef, useState } from "react";
import AIChatbotView from "./AIChatbot.view";
import { Message } from "./AIChatbot.type";

export default function AIChatbot() {
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

  const handleSendMessage = () => {
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

    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: `Terima kasih telah berbagi. Mengingat Anda menyebutkan "${inputValue.substring(
          0,
          20
        )}...", mari kita bahas lebih lanjut. Bagaimana perasaanmu tentang itu? (Model: ${selectedModel})`,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setIsBotTyping(false);
      setMessages((prev) => [...prev, botResponse]);
    }, 1500 + Math.random() * 1000);
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
    />
  );
}
