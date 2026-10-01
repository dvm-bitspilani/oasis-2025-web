import {useState} from "react";
import {Helmet} from "react-helmet";
import styles from "./Registration.module.scss";
import RegistrationClosed from "../components/RegistrationClosed";
export default function Registration({goToPage}: {goToPage: (path: string) => void; startAnimation: boolean}) {
  const [open, setOpen] = useState(true);
  return <div className={styles.instrback}><Helmet><title>Registration | OASIS 2025 | Whispers Of Edo</title><meta name="description" content="Registration is closed for this edition." /></Helmet><picture><source media="(max-width: 1200px) and (max-aspect-ratio: 1.45)" srcSet="/svgs/registration/bg-mobile.svg"/><img className={styles.backgroundImage} src="/images/registration/bg-extended.png" alt="" /></picture><div className={styles.birds}><img className={styles.bannerImage} src="/svgs/registration/reg-banner.svg" alt="Registration" /></div><button className={styles.backBtn} aria-label="Back to home" onClick={() => goToPage("/")}><img src="/svgs/registration/back.svg" alt="" /></button>{open && <RegistrationClosed onClose={() => {setOpen(false); goToPage("/")}} />}</div>;
}
