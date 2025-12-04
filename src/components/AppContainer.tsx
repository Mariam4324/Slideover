import { useState, type ReactNode  } from "react";
import { SlideoverContextProvider } from "./SlideoverContext";

export const AppContainer = ({ children }: { children: ReactNode }) => {
    const [slideoverContainer, setSlideoverContainer] =
      useState<HTMLDivElement | null>(null);
    const [, setSlideoverStack] = useState<(() => void)[]>([]);
  
    return (
      <SlideoverContextProvider
        value={{
          container: slideoverContainer,
          onStackChange: setSlideoverStack,
        }}
      >
        {children}
        <div ref={(element) => setSlideoverContainer(element)} />
      </SlideoverContextProvider>
    );
  };