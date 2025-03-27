import { useEffect, useState } from "react";
import RegisterView from "./Register.view";

export default function Register() {
  const [text, setText] = useState("");

  useEffect(() => {
    setText("hello world");
  }, []);

  document.title = "Daftar - Mental Health App";
  return <RegisterView text={text} />;
}
