import { useEffect } from "react";

const useLifecycleLog = (componentName: string) => {
  useEffect(() => {
    console.log(`[MOUNT] ${componentName}`);
    return () => {
      console.log(`[UNMOUNT] ${componentName}`);
    }
  });
}

export { useLifecycleLog };