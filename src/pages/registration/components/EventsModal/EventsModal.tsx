import styles from "./EventsModal.module.scss";

import ReactDOM from "react-dom";

type PropsType = {
  handleEvent: () => void;
  closeModal: () => void;
  eventData: { id: number; name: string; about: string } | null;
  selectedEvents: { id: number; name: string }[];
};

const Backdrop = () => {
  return <div className={styles.backdrop} />;
};

const Confirmation = (props: PropsType) => {
  return (
    <div className={styles.selectedEvents}>
      <h2 className={styles.heading}>{props.eventData?.name}</h2>
      <p className={styles.description}>{props.eventData?.about}</p>
      <button
        className={`${
          props.selectedEvents.some((e) => e.id === props.eventData?.id)
            ? styles.removeButton
            : styles.confirmButton
        }`}
        onClick={props.handleEvent}
      >
        {props.selectedEvents.some((e) => e.id === props.eventData?.id)
          ? "Remove"
          : "Add"}
      </button>
      <div className={styles.close} onClick={props.closeModal}>
        <svg fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.7334 1.5537C19.8179 1.46918 19.885 1.36885 19.9307 1.25843C19.9765 1.14801 20 1.02966 20 0.910135C20 0.790614 19.9765 0.672264 19.9307 0.561841C19.885 0.451419 19.8179 0.351086 19.7334 0.266572C19.6489 0.182058 19.5486 0.115019 19.4382 0.06928C19.3277 0.0235414 19.2094 0 19.0899 0C18.9703 0 18.852 0.0235414 18.7416 0.06928C18.6311 0.115019 18.5308 0.182058 18.4463 0.266572L10 8.71469L1.5537 0.266572C1.46918 0.182058 1.36885 0.115019 1.25843 0.06928C1.14801 0.0235414 1.02966 8.90498e-10 0.910135 0C0.790614 -8.90498e-10 0.672264 0.0235414 0.561841 0.06928C0.451419 0.115019 0.351086 0.182058 0.266572 0.266572C0.182058 0.351086 0.115019 0.451419 0.06928 0.561841C0.0235414 0.672264 -8.90498e-10 0.790614 0 0.910135C8.90498e-10 1.02966 0.0235414 1.14801 0.06928 1.25843C0.115019 1.36885 0.182058 1.46918 0.266572 1.5537L8.71469 10L0.266572 18.4463C0.0958887 18.617 0 18.8485 0 19.0899C0 19.3312 0.0958887 19.5627 0.266572 19.7334C0.437255 19.9041 0.668752 20 0.910135 20C1.15152 20 1.38301 19.9041 1.5537 19.7334L10 11.2853L18.4463 19.7334C18.617 19.9041 18.8485 20 19.0899 20C19.3312 20 19.5627 19.9041 19.7334 19.7334C19.9041 19.5627 20 19.3312 20 19.0899C20 18.8485 19.9041 18.617 19.7334 18.4463L11.2853 10L19.7334 1.5537Z"
            fill="#EDEDED"
          />
        </svg>
      </div>
    </div>
  );
};

function EventsModal(props: PropsType) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <Confirmation
          handleEvent={props.handleEvent}
          eventData={props.eventData}
          closeModal={props.closeModal}
          selectedEvents={props.selectedEvents}
        />,
        document.getElementById("modal-root")!
      )}
    </>
  );
}

export default EventsModal;
