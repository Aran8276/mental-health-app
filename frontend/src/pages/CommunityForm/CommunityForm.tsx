import { useEffect, useState } from "react";
import CommunityFormView from "./CommunityForm.view";

export default function CommunityForm() {
  const [text, setText] = useState("");

  useEffect(() => {
    setText("hello world");
  }, []);


  document.title = "Forum Komunitas - Mental Health App"
  return <CommunityFormView text={text} />;
}
