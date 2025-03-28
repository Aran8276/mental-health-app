import { FC } from "react";
import { LoadableButtonProps } from "./LoadableButton.type";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

const LoadableButtonView: FC<LoadableButtonProps> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <>
      {isLoading ? (
        <Button disabled {...props}>
          <Loader className="animate-spin" />
        </Button>
      ) : (
        <Button {...props}>{children}</Button>
      )}
    </>
  );
};

export default LoadableButtonView;
