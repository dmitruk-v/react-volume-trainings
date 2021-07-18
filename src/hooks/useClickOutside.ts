import { useCallback, useEffect } from "react";

const useClickOutside = (ref: React.RefObject<HTMLElement>, onClickOutside: () => void) => {

  console.log("useClickOutside called");

  const checkClickOutside = useCallback((evt: MouseEvent) => {
    if (ref.current === null) return;
    // If click target is not child element of ref element, than it was a click outside
    if (!ref.current.contains(evt.target as HTMLElement)) {
      onClickOutside();
    }
  }, [ref, onClickOutside]);

  useEffect(() => {
    console.log("addEventListener called");
    document.addEventListener("click", checkClickOutside);
    return () => {
      console.log("removeEventListener called");
      document.removeEventListener("click", checkClickOutside);
    }
  }, [checkClickOutside]);
}

export { useClickOutside };