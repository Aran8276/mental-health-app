import { useEffect, useState } from "react";
import AIChatbotView from "./AIChatbot.view";

export default function AIChatbot() {
  const [text, setText] = useState("");

  useEffect(() => {
    setText("hello world");
  }, []);

  document.title = "AI Chatbot - Mental Health App";
  return <AIChatbotView text={text} />;
}
