import { useEffect, useRef } from "react";

const useFocusWhen = (condition: boolean) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current === null) return;
    const field = ref.current;
    field.focus();
    field.select();
  }, [condition]);

  return ref;
}

export { useFocusWhen }