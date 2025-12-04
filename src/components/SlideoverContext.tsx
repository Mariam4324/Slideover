import { createContext, type SetStateAction } from "react";

export const SlideoverContext = createContext<
  | {
      container: HTMLDivElement | null;
      onStackChange: (value: SetStateAction<(() => void)[]>) => void;
    }
  | undefined
>(undefined);

export const SlideoverContextProvider = SlideoverContext.Provider;
