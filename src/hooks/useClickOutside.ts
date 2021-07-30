import { useEffect, useRef } from "react";

const useClickOutside = <T extends HTMLElement>(onClickOutside: () => void, listenCondition?: boolean) => {

  const domNodeRef = useRef<T>(null);

  useEffect(() => {
    if (listenCondition) {
      const checkClickOutside = (evt: MouseEvent) => {
        // If click target is a child element of ref element, than it was not a click outside
        if (!domNodeRef.current || domNodeRef.current.contains(evt.target as HTMLElement)) return;
        onClickOutside();
      }
      document.addEventListener("click", checkClickOutside);
      return () => {
        document.removeEventListener("click", checkClickOutside);
      }
    }
  }, [onClickOutside, listenCondition]);

  return domNodeRef;
}

export { useClickOutside };
