import { createPortal } from "react-dom";
import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useRef,
  type SetStateAction,
} from "react";

export const SlideoverContext = createContext<
  | {
      container: HTMLDivElement | null;
      onStackChange: (value: SetStateAction<(() => void)[]>) => void;
    }
  | undefined
>(undefined);

export const SlideoverContextProvider = SlideoverContext.Provider;

const sizeClasses = {
  s: { maxWidth: "360px", minWidth: "360px" },
  m: { maxWidth: "448px", minWidth: "448px" },
  l: { maxWidth: "528px", minWidth: "528px" },
  xl: { maxWidth: "764px", minWidth: "764px" },
};

export const Slideover = ({
  title,
  onClose,
  size = "m",
  content,
}: {
  title?: string;
  onClose?: () => void;
  size?: "s" | "m" | "l" | "xl";
  content?: ReactNode;
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const currentOnCloseRef = useRef<(() => void) | undefined>(onClose);
  const slideoverContext = useContext(SlideoverContext);

  if (!slideoverContext) {
    throw new Error("Slideover must have an access to SlideoverContext");
  }

  const { container, onStackChange } = slideoverContext;

  useLayoutEffect(() => {
    currentOnCloseRef.current = onClose;
  }, [onClose]);

  useLayoutEffect(() => {
    const currentOnClose = currentOnCloseRef.current;
    if (!currentOnClose) return;

    onStackChange((prevStack) => {
      prevStack.forEach((callback) => {
        if (callback !== currentOnClose) {
          try {
            callback();
          } catch (e) {
            console.error(e);
          }
        }
      });
      return [currentOnClose];
    });

    return () => {
      onStackChange((prevStack) =>
        prevStack.filter((callback) => callback !== currentOnClose)
      );
    };
  }, [onStackChange]);

  if (!container) {
    return null;
  }

  return createPortal(
    <div
      style={{
        position: "relative",
      }}
    >
      <section
        role="presentation"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: "flex",
          justifyContent: "flex-end",
          pointerEvents: "none",
        }}
      >
        <div
          ref={panelRef}
          tabIndex={0}
          role="region"
          style={{
            pointerEvents: "auto",
            outline: "none",
            backgroundColor: "#ffffff",
            ...sizeClasses[size],
            maxHeight: "100%",
            display: "grid",
            gridTemplateRows: title ? "max-content 1fr" : "1fr",
            borderTopLeftRadius: "24px",
            borderBottomLeftRadius: "24px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
            overflow: "hidden",
          }}
        >
          {title && (
            <div
              style={{
                display: "grid",
                alignItems: "flex-start",
                minHeight: "60px",
                boxSizing: "border-box",
                paddingTop: "8px",
                paddingBottom: "4px",
                paddingLeft: "16px",
                paddingRight: "8px",
                gridTemplateColumns: "1fr auto",
                columnGap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  paddingTop: "10px",
                  fontSize: "16px",
                  fontWeight: "500",
                  margin: 0,
                }}
              >
                {title}
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  aria-label="Close"
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "20px",
                    color: "#6b7280",
                    cursor: "pointer",
                    padding: "8px",
                    borderRadius: "4px",
                  }}
                >
                  ×
                </button>
              )}
            </div>
          )}
          <div
            style={{
              display: "grid",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            {content}
          </div>
        </div>
      </section>
    </div>,
    container
  );
};

