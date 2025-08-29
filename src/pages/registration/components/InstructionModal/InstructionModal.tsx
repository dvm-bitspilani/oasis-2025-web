import { useEffect, useRef } from "react";
import styles from "./InstructionModal.module.scss";

import thumb from "/svgs/registration/scrollThumb.svg";
import ScrollBar from "/svgs/registration/scroll-bar.svg";

import ReactDOM from "react-dom";

type PropsType = {
  onCancel: () => void;
};

const Backdrop = (props: PropsType) => {
  return <div className={styles.backdrop} onClick={props.onCancel} />;
};

const Confirmation = (props: PropsType) => {
  const { onCancel } = props;

  const mainContainerRef = useRef<HTMLUListElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLImageElement>(null);

  function handleScroll() {
    if (!mainContainerRef.current || !thumbRef.current) return;
    const maxScrollTopValue =
      mainContainerRef.current.scrollHeight -
      mainContainerRef.current.clientHeight;
    const percentage =
      14 + (mainContainerRef.current.scrollTop / maxScrollTopValue) * 72;

    percentage > 86.5
      ? (thumbRef.current.style.top = "86.5%")
      : (thumbRef.current.style.top = `${percentage}%`);
  }

  useEffect(() => {
    if (!mainContainerRef.current) return;
    mainContainerRef.current.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handlewheelMouseDown = (
    e: React.MouseEvent<HTMLImageElement> | React.TouchEvent<HTMLImageElement>
  ) => {
    e.preventDefault();

    document.addEventListener("mousemove", handlewheelDragMove);
    document.addEventListener("touchmove", handlewheelDragMove);

    document.addEventListener("mouseup", handlewheelDragEnd);
    document.addEventListener("touchend", handlewheelDragEnd);
  };

  const handlewheelDragMove = (e: MouseEvent | TouchEvent) => {
    if (!mainContainerRef.current || !scrollBarRef.current) return;

    const maxScrollTopValue =
      mainContainerRef.current.scrollHeight -
      mainContainerRef.current.clientHeight;

    const clientY = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;

    const percentage =
      ((clientY - scrollBarRef.current.offsetTop) /
        scrollBarRef.current.clientHeight) *
      100;

    mainContainerRef.current.scrollTop = (percentage / 100) * maxScrollTopValue;
  };

  const handlewheelDragEnd = () => {
    document.removeEventListener("mousemove", handlewheelDragMove);
    document.removeEventListener("mouseup", handlewheelDragEnd);
    document.removeEventListener("touchmove", handlewheelDragMove);
    document.removeEventListener("touchend", handlewheelDragEnd);
  };

  // const handleTrackSnap = (e: React.MouseEvent | React.TouchEvent) => {
  //   if (!mainContainerRef.current || !scrollBarRef.current) return;
  //   const mainWrapperElement = mainContainerRef.current;
  //   const scrollBarContainer = scrollBarRef.current;

  //   const percentage =
  //     (("touches" in e ? e.touches[0].clientY : e.clientY) /
  //       scrollBarContainer.clientHeight) *
  //     100;
  //   const maxScrollTopValue =
  //     mainWrapperElement.scrollHeight - mainWrapperElement.clientHeight;

  //   mainWrapperElement.scrollTo({
  //     top: (percentage / 100) * maxScrollTopValue,
  //     behavior: "smooth",
  //   });
  // };

  return (
    <div className={styles.selectedEvents}>
      <svg
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.close}
        onClick={onCancel}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19.7334 1.5537C19.8179 1.46918 19.885 1.36885 19.9307 1.25843C19.9765 1.14801 20 1.02966 20 0.910135C20 0.790614 19.9765 0.672264 19.9307 0.561841C19.885 0.451419 19.8179 0.351086 19.7334 0.266572C19.6489 0.182058 19.5486 0.115019 19.4382 0.06928C19.3277 0.0235414 19.2094 0 19.0899 0C18.9703 0 18.852 0.0235414 18.7416 0.06928C18.6311 0.115019 18.5308 0.182058 18.4463 0.266572L10 8.71469L1.5537 0.266572C1.46918 0.182058 1.36885 0.115019 1.25843 0.06928C1.14801 0.0235414 1.02966 8.90498e-10 0.910135 0C0.790614 -8.90498e-10 0.672264 0.0235414 0.561841 0.06928C0.451419 0.115019 0.351086 0.182058 0.266572 0.266572C0.182058 0.351086 0.115019 0.451419 0.06928 0.561841C0.0235414 0.672264 -8.90498e-10 0.790614 0 0.910135C8.90498e-10 1.02966 0.0235414 1.14801 0.06928 1.25843C0.115019 1.36885 0.182058 1.46918 0.266572 1.5537L8.71469 10L0.266572 18.4463C0.0958887 18.617 0 18.8485 0 19.0899C0 19.3312 0.0958887 19.5627 0.266572 19.7334C0.437255 19.9041 0.668752 20 0.910135 20C1.15152 20 1.38301 19.9041 1.5537 19.7334L10 11.2853L18.4463 19.7334C18.617 19.9041 18.8485 20 19.0899 20C19.3312 20 19.5627 19.9041 19.7334 19.7334C19.9041 19.5627 20 19.3312 20 19.0899C20 18.8485 19.9041 18.617 19.7334 18.4463L11.2853 10L19.7334 1.5537Z"
          fill="#EDEDED"
        />
      </svg>
      <h2 className={styles.heading}>Detailed Instructions :</h2>
      <div className={styles.content}>
        <ul ref={mainContainerRef}>
          <li>
            ⁠Complete the registration form with all required details. You'll be
            able to login through your registered email id when required. All
            team members are required to register separately.
          </li>
          <li>
            A College Representative (CR) will be appointed for each college
            who'll be responsible for allotting heads for all the societies the
            college will be participating for.
          </li>
          <li>
            The heads and CR will be responsible for approving the other
            participating members.
          </li>
          <li>
            After this, an approval email will be sent from the Department of
            Publication and Correspondence.
          </li>
          <li>Make the required payment as instructed.</li>
          <li>Upon successful payment, a confirmation email will be sent.</li>
        </ul>
        <div
          className={styles.scrollBarContainer}
          ref={scrollBarRef}
          // onClick={handleTrackSnap}
        >
          <img src={ScrollBar} alt="scrollbar" className={styles.scrollBar} />
          <img
            className={styles.scrollBarThumb}
            src={thumb}
            alt="thumb"
            draggable={false}
            onMouseDown={handlewheelMouseDown}
            onTouchStart={handlewheelMouseDown}
            ref={thumbRef}
          />
        </div>
      </div>
    </div>
  );
};

function InstructionModal(props: PropsType) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCancel={props.onCancel} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <Confirmation onCancel={props.onCancel} />,
        document.getElementById("modal-root")!
      )}
    </>
  );
}

export default InstructionModal;
