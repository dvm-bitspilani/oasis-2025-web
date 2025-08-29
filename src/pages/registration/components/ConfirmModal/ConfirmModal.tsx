import { useState, useEffect, useRef } from "react";
import styles from "./ConfirmModal.module.scss";
import axios from "axios";
import { useCookies } from "react-cookie";

import thumb from "/svgs/registration/scrollThumb.svg";
import ScrollBar from "/svgs/registration/scroll-bar.svg";

import ReactDOM from "react-dom";

type PropsType = {
  onCancel: () => void;
  selectedEvents: { id: number; name: string }[];
  userData: any;
};

const Backdrop = () => {
  return <div className={styles.backdrop} />;
};

const Confirmation = (props: PropsType) => {
  const { onCancel, selectedEvents, userData } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [access_token, setAccess_token] = useState("");
  const [notification, setNotification] = useState({
    showSelection: true,
    isError: false,
    message: "",
  });

  const mainContainerRef = useRef<HTMLUListElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLImageElement>(null);

  const [cookies] = useCookies(["Access_token", "user-auth"]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const reqData = {
      ...userData,
      access_token: cookies["Access_token"],
    };
    axios
      .post("https://bits-oasis.org/2025/main/registrations/register/", reqData)
      .then((response) => {
        setIsSubmitting(false);
        if (response.data.message === "User has been registered") {
          setAccess_token(response.data.tokens.access);
          setNotification({
            showSelection: false,
            isError: false,
            message: "Registration Successful.",
          });
        } else {
          setNotification({
            showSelection: false,
            isError: true,
            message: response.data.message || response.data.error,
          });
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error("Error registering:", error);
        setNotification({
          showSelection: false,
          isError: true,
          message:
            error.response.data.message ||
            error.response.data.error ||
            "Registration Failed.",
        });
      });
    sessionStorage.removeItem("selectedEvents");
  };

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
    <div
      className={
        styles.selectedEvents +
        " " +
        (notification.showSelection ? "" : styles.error)
      }
    >
      {notification.showSelection ? (
        <>
          <h2 className={styles.heading}>Your Selected Events :</h2>
          <div className={styles.content}>
            <ul ref={mainContainerRef}>
              {selectedEvents.map((event) => (
                <li key={event.id}>{event.name}</li>
              ))}
            </ul>
            <div
              className={styles.scrollBarContainer}
              ref={scrollBarRef}
              // onClick={handleTrackSnap}
            >
              <img
                src={ScrollBar}
                alt="scrollbar"
                className={styles.scrollBar}
              />
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
          <div className={styles.buttonsContainer}>
            <button onClick={onCancel} className={styles.cancelButton}>
              Cancel
            </button>
            <button className={styles.confirmButton} onClick={handleSubmit}>
              {isSubmitting ? "Submitting..." : "Confirm"}
            </button>
          </div>
        </>
      ) : (
        <>
          <p>{notification.message}</p>
          <div className={styles.buttonsContainer}>
            <button
              className={styles.confirmButton}
              onClick={() => {
                if (notification.isError) {
                  onCancel();
                } else {
                  window.location.href = `https://bits-oasis.org/2025/main/registrations?token=${access_token}`;
                }
              }}
            >
              {notification.isError ? "Return" : "Dashboard"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

function ConfirmModal(props: PropsType) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <Confirmation
          userData={props.userData}
          onCancel={props.onCancel}
          selectedEvents={props.selectedEvents}
        />,
        document.getElementById("modal-root")!
      )}
    </>
  );
}

export default ConfirmModal;
