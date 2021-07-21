import { useEffect } from "react";

const useClickOutside = (ref: React.RefObject<HTMLElement>, onClickOutside: () => void) => {

  console.log("useClickOutside called");

  useEffect(() => {
    const checkClickOutside = (evt: MouseEvent) => {
      if (ref.current === null) return;
      // If click target is not child element of ref element, than it was a click outside
      if (!ref.current.contains(evt.target as HTMLElement)) {
        onClickOutside();
      }
    }
    console.log("addEventListener called");
    document.addEventListener("click", checkClickOutside);
    return () => {
      console.log("removeEventListener called");
      document.removeEventListener("click", checkClickOutside);
    }
  }, [ref, onClickOutside]);
}

export { useClickOutside };