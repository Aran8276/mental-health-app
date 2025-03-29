import "./App.css";
import { ThemeProvider } from "./components/ui/theme-provider";
import Navigator from "./viewports/Navigator/Navigator";
import { LoadingBarContainer } from "react-top-loading-bar";

function App() {
  return (
    <>
      <LoadingBarContainer>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Navigator />
        </ThemeProvider>
      </LoadingBarContainer>
    </>
  );
}

export default App;
