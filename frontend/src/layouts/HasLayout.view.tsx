import { FC } from "react";
import { MultiLayoutProps } from "./layout.type";
import { Loader2 } from "lucide-react";
import LoadingBar from "react-top-loading-bar";
import { Toaster } from "sonner";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const HasLayoutView: FC<MultiLayoutProps> = ({
  children,
  setIsLoading,
  loader,
  isLoading,
}) => {
  return (
    <>
      <LoadingBar
        onLoaderFinished={() => setIsLoading(false)}
        color="blue"
        height={2}
        ref={loader}
        shadow={false}
      />

      {isLoading && (
        <Loader2 className="fixed z-100 right-2 top-2 animate-spin text-blue-500" />
      )}

      <Header />
      <main className="flex flex-col min-h-screen">
        {children}
        <Toaster />
      </main>
      <Footer />
    </>
  );
};

export default HasLayoutView;
