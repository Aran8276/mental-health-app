import {
  Dispatch,
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES,
  ReactNode,
  RefObject,
  SetStateAction,
} from "react";
import { LoadingBarRef } from "react-top-loading-bar";

export interface MultiLayoutProps {
  children:
    | ReactNode
    | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  loader: RefObject<LoadingBarRef | null>;
  isLoading: boolean;
}
