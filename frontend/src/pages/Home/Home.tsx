import { useEffect, useState } from "react";
import HomeView from "./Home.view";

export default function Home() {
  const [text, setText] = useState("");

  useEffect(() => {
    setText("hello world");
  }, []);


  document.title = "Beranda - Mental Health App"
  return <HomeView text={text} />;
}
