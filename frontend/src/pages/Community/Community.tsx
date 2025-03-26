import { useEffect, useState } from "react";
import CommunityView from "./Community.view";

export default function Community() {
  const [text, setText] = useState("");

  useEffect(() => {
    setText("hello world");
  }, []);


  document.title = "Forum Komunitas - Mental Health App"
  return <CommunityView text={text} />;
}
