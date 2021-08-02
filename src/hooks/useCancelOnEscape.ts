import { useEffect } from "react"

const useCancelOnEscape = (onEscPress: () => void) => {
  useEffect(() => {
    const handleKeydown = (evt: KeyboardEvent) => {
      if (evt.code === "Escape") {
        onEscPress();
      }
    }
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    }
  }, [onEscPress]);
}

export { useCancelOnEscape }