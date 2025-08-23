import { useState, forwardRef, useRef, useEffect } from "react";
import React from "react";
import axios from "axios";

import styles from "./Events.module.scss";

import thumb from "/svgs/registration/scrollThumb.svg";
import ScrollBar from "/svgs/registration/scroll-bar.svg";
import Left from "/svgs/registration/leftarr.svg";
import Right from "/svgs/registration/rightarr.svg";

import ConfirmModal from "../ConfirmModal/ConfirmModal";
import EventsModal from "../EventsModal/EventsModal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// const eventsData = [
//   {
//     id: 1,
//     name: "Event 1",
//     about: "Description for Event 1",
//   },
//   {
//     id: 2,
//     name: "Event 2",
//     about: "Description for Event 2",
//   },
//   {
//     id: 3,
//     name: "Event 3",
//     about: "Description for Event 3",
//   },
//   {
//     id: 4,
//     name: "Event 4",
//     about: "Description for Event 4",
//   },
//   {
//     id: 5,
//     name: "Event 5",
//     about: "Description for Event 5",
//   },
//   {
//     id: 6,
//     name: "Event 6",
//     about: "Description for Event 6",
//   },
//   {
//     id: 7,
//     name: "Event 7",
//     about: "Description for Event 7",
//   },
//   {
//     id: 8,
//     name: "Event 8",
//     about: "Description for Event 8",
//   },
// ];

const Events = forwardRef<
  HTMLDivElement,
  { userData: any; setUserData: React.Dispatch<React.SetStateAction<any>> }
>(({ userData, setUserData }, ref) => {
  const mainContainerRef = useRef<HTMLUListElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const eventDescRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLImageElement>(null);

  const [selectedEvents, setSelectedEvents] = useState<
    { id: number; name: string }[]
  >(JSON.parse(sessionStorage.getItem("selectedEvents") || "[]"));
  const [confirmModal, setConfirmModal] = useState(false);
  const [search, setSearch] = useState("");
  const [activeEvent, setActiveEvent] = useState<{
    id: number;
    name: string;
    about: string;
  } | null>(null);
  const [eventsOptions, setEventsOptions] = useState<
    { id: number; name: string; about: string }[]
  >([]);
  const [eventsModal, setEventsModal] = useState(false);

  const { contextSafe } = useGSAP();

  const sortBySearch = (data: typeof eventsOptions, search: string) => {
    const lowerSearch = search.trim().toLowerCase();
    return data.filter((item) => item.name.toLowerCase().includes(lowerSearch));
  };

  const sortedArray = sortBySearch(eventsOptions, search);

  useEffect(() => {
    axios
      .get("https://bits-oasis.org/2025/main/registrations/events_details/")
      .then((response) => {
        setEventsOptions(response.data);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const showEventDescription = (event: {
    id: number;
    name: string;
    about: string;
  }) => {
    const mm = gsap.matchMedia();
    contextSafe(() => {
      mm.add("(min-width: 1200px) or (aspect-ratio > 1.45)", () => {
        if (!activeEvent || activeEvent.id !== event.id) {
          const tl = gsap.timeline({
            onStart: () => {
              setActiveEvent(event);
            },
          });
          tl.set(eventDescRef.current, { display: "flex" }).fromTo(
            eventDescRef.current,
            { opacity: 0, duration: 0.5 },
            { opacity: 1, duration: 0.5 }
          );
        }
      });
      mm.add("(max-width: 1199px) and (aspect-ratio <= 1.45)", () => {
        setActiveEvent(event);
        setEventsModal(true);
      });
    })();
  };

  const handleEvent = (
    event: { id: number; name: string; about: string } | null,
    flag: boolean
  ) => {
    if (!event) return;
    if (flag) {
      if (selectedEvents.some((e) => e.id === event.id)) {
        sessionStorage.setItem(
          "selectedEvents",
          JSON.stringify(selectedEvents.filter((e) => e.id !== event.id))
        );
        setSelectedEvents((prev) => prev.filter((e) => e.id !== event.id));
      } else {
        sessionStorage.setItem(
          "selectedEvents",
          JSON.stringify([...selectedEvents, event])
        );
        setSelectedEvents((prev) => [...prev, event]);
      }
      showEventDescription(event);
    } else {
      const mm = gsap.matchMedia();
      contextSafe(() => {
        mm.add("(min-width: 1200px) or (aspect-ratio > 1.45)", () => {
          if (selectedEvents.some((e) => e.id === event.id)) {
            sessionStorage.setItem(
              "selectedEvents",
              JSON.stringify(selectedEvents.filter((e) => e.id !== event.id))
            );
            setSelectedEvents((prev) => prev.filter((e) => e.id !== event.id));
          } else {
            sessionStorage.setItem(
              "selectedEvents",
              JSON.stringify([...selectedEvents, event])
            );
            setSelectedEvents((prev) => [...prev, event]);
          }
          showEventDescription(event);
        });
        mm.add("(max-width: 1199px) and (aspect-ratio <= 1.45)", () => {
          showEventDescription(event);
        });
      })();
    }
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

  const handleSubmit = () => {
    setUserData((prevData: any) => ({
      ...prevData,
      events: selectedEvents.map((event) => event.id),
    }));
    setConfirmModal(true);
  };

  return (
    <>
      <div className={styles.eventsContainer} ref={ref}>
        <div className={styles.headingCont}>
          <img src={Left} alt="left" />
          <h1 className={styles.heading}>CHOOSE EVENTS</h1>
          <img src={Right} alt="right" />
        </div>
        <div className={styles.eventsSubContainer}>
          <div className={styles.eventsListCont}>
            <div className={styles.search}>
              <input
                type="text"
                placeholder="SEARCH HERE"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.6667 30L17.1667 19.5C16.3333 20.1667 15.375 20.6944 14.2917 21.0833C13.2083 21.4722 12.0556 21.6667 10.8333 21.6667C7.80556 21.6667 5.24333 20.6178 3.14667 18.52C1.05 16.4222 0.00111199 13.86 8.81834e-07 10.8333C-0.00111023 7.80667 1.04778 5.24444 3.14667 3.14667C5.24556 1.04889 7.80778 0 10.8333 0C13.8589 0 16.4217 1.04889 18.5217 3.14667C20.6217 5.24444 21.67 7.80667 21.6667 10.8333C21.6667 12.0556 21.4722 13.2083 21.0833 14.2917C20.6944 15.375 20.1667 16.3333 19.5 17.1667L30 27.6667L27.6667 30ZM10.8333 18.3333C12.9167 18.3333 14.6878 17.6044 16.1467 16.1467C17.6056 14.6889 18.3344 12.9178 18.3333 10.8333C18.3322 8.74889 17.6033 6.97833 16.1467 5.52167C14.69 4.065 12.9189 3.33556 10.8333 3.33333C8.74778 3.33111 6.97722 4.06056 5.52167 5.52167C4.06611 6.98278 3.33667 8.75333 3.33333 10.8333C3.33 12.9133 4.05945 14.6844 5.52167 16.1467C6.98389 17.6089 8.75445 18.3378 10.8333 18.3333Z"
                  fill="white"
                />
              </svg>
            </div>
            <ul className={styles.eventsList} ref={mainContainerRef}>
              {sortedArray.map((event, index) => (
                <li
                  key={index}
                  onMouseEnter={() => {
                    showEventDescription(event);
                  }}
                  onClick={() => handleEvent(event, false)}
                  className={styles.eventItem}
                >
                  <svg
                    viewBox="0 0 573 95"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_350_4)">
                      <rect
                        y="0.551514"
                        width="573"
                        height="73.8473"
                        fill={`${
                          selectedEvents.some((e) => e.id === event.id)
                            ? "#E2DCCB"
                            : "#181818"
                        }`}
                      />
                      <rect
                        x="560"
                        y="37.0488"
                        width="18.4537"
                        height="18.4537"
                        transform="rotate(-45 560 37.0488)"
                        fill={`${
                          selectedEvents.some((e) => e.id === event.id)
                            ? "#181818"
                            : "#E2DCCB"
                        }`}
                      />
                      <rect
                        x="-13"
                        y="37.0488"
                        width="18.4537"
                        height="18.4537"
                        transform="rotate(-45 -13 37.0488)"
                        fill={`${
                          selectedEvents.some((e) => e.id === event.id)
                            ? "#181818"
                            : "#E2DCCB"
                        }`}
                      />
                    </g>
                    <rect
                      x="0.5"
                      y="1.05151"
                      width="572"
                      height="72.8473"
                      stroke="#E2DCCB"
                    />
                    <path
                      d="M256 74.3823C257.048 78.5084 262.605 87.2106 270.153 84.5099C277.142 98.0134 298.983 98.0134 306.322 84.5099C310.515 84.5099 317.435 81.5842 317.854 74.3823H296.362L287.5 84.51L278.016 74.3823H256Z"
                      fill="#181818"
                      stroke="#E2DCCB"
                      strokeWidth="0.7"
                    />
                    <path
                      d="M287.484 84.01L296.347 74.0099L287.484 64.103L278 73.8823L287.484 84.01Z"
                      fill={`${
                        selectedEvents.some((e) => e.id === event.id)
                          ? "#181818"
                          : "#E2DCCB"
                      }`}
                      stroke="#E2DCCB"
                      strokeWidth="0.7"
                    />
                    <defs>
                      <clipPath id="clip0_350_4">
                        <rect
                          y="0.551514"
                          width="573"
                          height="73.8473"
                          fill="white"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <button
                    style={{
                      color: selectedEvents.some((e) => e.id === event.id)
                        ? "#000"
                        : "#fff",
                    }}
                  >
                    {event.name}
                  </button>
                </li>
              ))}
            </ul>
            <button
              className={styles.confirmButton}
              onClick={handleSubmit}
              disabled={selectedEvents.length === 0}
            >
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.confirmIcon}
              >
                <path
                  d="M0 3.80298C2.50922 3.80298 66.6863 5.62965 83.2277 6.54299L87.8205 3.80298L83.2277 0.925964L0 3.80298Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="0.16"
                />
              </svg>
              SUBMIT
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.confirmIcon}
              >
                <path
                  d="M0 3.80298C2.50922 3.80298 66.6863 5.62965 83.2277 6.54299L87.8205 3.80298L83.2277 0.925964L0 3.80298Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="0.16"
                />
              </svg>
            </button>
          </div>
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
          {activeEvent && (
            <div className={styles.eventDescription} ref={eventDescRef}>
              <h2>{activeEvent.name}</h2>
              <p>{activeEvent.about}</p>
              <button
                onClick={() => handleEvent(activeEvent, true)}
                className={
                  selectedEvents.some((e) => e.id === activeEvent.id)
                    ? styles.button2
                    : styles.button1
                }
              >
                {selectedEvents.some((e) => e.id === activeEvent.id)
                  ? "REMOVE"
                  : "ADD"}
              </button>
            </div>
          )}
        </div>
      </div>
      {confirmModal && (
        <ConfirmModal
          onCancel={() => setConfirmModal(false)}
          selectedEvents={selectedEvents}
          userData={userData}
        />
      )}
      {eventsModal && (
        <EventsModal
          handleEvent={() => handleEvent(activeEvent, true)}
          eventData={activeEvent}
          closeModal={() => setEventsModal(false)}
          selectedEvents={selectedEvents}
        />
      )}
    </>
  );
});

export default Events;
