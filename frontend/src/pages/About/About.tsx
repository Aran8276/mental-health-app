import { useEffect, useState } from "react";
import AboutView from "./About.view";

export default function About() {
  const [text, setText] = useState("");

  useEffect(() => {
    setText("hello world");
  }, []);

  document.title = "Tentang - Mental Health App";
  return <AboutView text={text} />;
}
