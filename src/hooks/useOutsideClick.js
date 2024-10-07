import { useEffect } from "react";

function useOutsideClick(handler, capturingPhase = true, ref) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }
    document.addEventListener("click", handleClick, capturingPhase);

    return () =>
      document.removeEventListener("click", handleClick, capturingPhase);
  }, [handler, capturingPhase, ref]);
}

export default useOutsideClick;
