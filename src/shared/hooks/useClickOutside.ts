import { useEffect, useRef } from "react";

const useClickOutside = <T extends HTMLElement>(onClickOutside: () => void, listenCondition?: boolean) => {

  const onClickOutsideRef = useRef<typeof onClickOutside>(() => { });
  onClickOutsideRef.current = onClickOutside;

  const domNodeRef = useRef<T>(null);

  useEffect(() => {
    if (listenCondition) {
      const checkClickOutside = (evt: MouseEvent) => {
        // If click target is a child element of ref element, than it was not a click outside
        if (!domNodeRef.current || domNodeRef.current.contains(evt.target as HTMLElement)) return;
        onClickOutsideRef.current();
      }
      document.addEventListener("click", checkClickOutside);
      return () => {
        document.removeEventListener("click", checkClickOutside);
      }
    }
  }, [onClickOutsideRef, listenCondition]);

  return domNodeRef;
}

export { useClickOutside };
