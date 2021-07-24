import { useEffect } from "react";

const useScrollIntoView = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  conditions: boolean[],
  doneCb?: () => void
) => {

  useEffect(() => {
    // console.log("bla!!!");
    if (ref.current === null) return;
    if (conditions.some(c => c === false)) return;
    const el = ref.current;
    window.scrollTo({
      top: el.offsetTop - el.offsetHeight,
      behavior: 'smooth'
    });
    doneCb !== undefined && doneCb();
  }, [ref, conditions, doneCb]);

}

export { useScrollIntoView };