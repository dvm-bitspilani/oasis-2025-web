import {useEffect, useRef} from "react";
export default function RegistrationClosed({onClose}: {onClose: () => void}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const previous = document.activeElement as HTMLElement | null; ref.current?.showModal(); return () => {previous?.focus()} }, []);
  return <dialog ref={ref} className="registration-closed" aria-labelledby="registration-title" onCancel={onClose} onClick={event => {if(event.target === event.currentTarget) onClose()}}><h2 id="registration-title">Registration is closed for this edition</h2><button autoFocus onClick={onClose}>Close</button></dialog>;
}
