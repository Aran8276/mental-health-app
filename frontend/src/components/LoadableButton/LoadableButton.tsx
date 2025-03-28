import LoadableButtonView from "./LoadableButton.view";
import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children?: ReactNode;
}

export default function LoadableButton({
  isLoading,
  children,
  ...props
}: ButtonProps) {
  return (
    <LoadableButtonView {...props} isLoading={isLoading} children={children} />
  );
}
