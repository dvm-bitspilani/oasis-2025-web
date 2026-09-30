import { forwardRef, useState } from "react";
import styles from "./Instructions.module.scss";

import InstructionModal from "../InstructionModal/InstructionModal";

import Left from "/svgs/registration/leftarr.svg";
import Right from "/svgs/registration/rightarr.svg";

type PropsType = {
  onStartDemo: () => void;
};

const Instructions = forwardRef<HTMLDivElement, PropsType>(
  ({ onStartDemo }, ref) => {
    const [detailInst, setdetailInst] = useState(false);

    return (
      <>
        {detailInst && (
          <InstructionModal onCancel={() => setdetailInst(false)} />
        )}
        <div className={styles.content} ref={ref}>
          <div className={styles.headingCont}>
            <img src={Left} alt="left" />
            <h3 className={styles.heading}>INSTRUCTIONS</h3>
            <img src={Right} alt="right" />
          </div>
          <ul className={styles.instr}>
            <li>
              Use fictional sample details to explore this archived form. No login, registration, payment or information is sent or saved.
            </li>
            <li>Historical registration is closed.</li>
            <li>All prof shows are free. </li>
            <li>
              For further details contact, Ujjwal Kansal: <a href="tel:+919991520330">+91 99915 20330</a>,
              Sneha: <a href="tel:+919026855597">+91 90268 55597</a>
            </li>
            <li>
              For detailed Instructions{" "}
              <span onClick={() => setdetailInst(true)}>click here</span>
            </li>
          </ul>

          <button className={styles.googleButton} onClick={onStartDemo}>
            Start portfolio demo
          </button>
        </div>
      </>
    );
  }
);

export default Instructions;
