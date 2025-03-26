import { useEffect, useState } from "react";
import AIChatbotView from "./AIChatbot.view";

export default function AIChatbot() {
  const [text, setText] = useState("");

  useEffect(() => {
    setText("hello world");
  }, []);


  document.title = "Forum Komunitas - Mental Health App"
  return <AIChatbotView text={text} />;
}
