import { forwardRef, useState } from "react";
import styles from "./Instructions.module.scss";

import InstructionModal from "../InstructionModal/InstructionModal";

import Left from "/svgs/registration/leftarr.svg";
import Right from "/svgs/registration/rightarr.svg";

type PropsType = {
  onGoogleSignIn: () => void;
};

const Instructions = forwardRef<HTMLDivElement, PropsType>(
  ({ onGoogleSignIn }, ref) => {
    const [detailInst, setdetailInst] = useState(false);

    return (
      <>
        {detailInst && (
          <InstructionModal onCancel={() => setdetailInst(false)} />
        )}
        <div className={styles.content} ref={ref}>
          <div className={styles.headingCont}>
            <img src={Left} alt="left" />
            <h1 className={styles.heading}>INSTRUCTIONS</h1>
            <img src={Right} alt="right" />
          </div>
          <ul className={styles.instr}>
            <li>
              Complete the registration form with all required details. You'll
              be able to login through your registered email id when required.
            </li>
            <li>All team members are required to register separately.</li>
            <li>All prof shows are free. </li>
            <li>
              For further details contact, Ujjwal Kansal: +91 99915 20330,
              Sneha: +91 90268 55597
            </li>
            <li>
              For detailed Instructions{" "}
              <span onClick={() => setdetailInst(true)}>click here</span>
            </li>
          </ul>

          <button className={styles.googleButton} onClick={onGoogleSignIn}>
            Sign in with Google
          </button>
        </div>
      </>
    );
  }
);

export default Instructions;
