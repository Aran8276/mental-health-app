import "./App.css";
import { ThemeProvider } from "./components/ui/theme-provider";
import Navigator from "./viewports/Navigator/Navigator";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Navigator />
      </ThemeProvider>
    </>
  );
}

export default App;
