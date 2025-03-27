import { useEffect, useState } from "react";
import LoginView from "./Login.view";

export default function Login() {
  const [text, setText] = useState("");

  useEffect(() => {
    setText("hello world");
  }, []);

  document.title = "Masuk - Mental Health App";
  return <LoginView text={text} />;
}
