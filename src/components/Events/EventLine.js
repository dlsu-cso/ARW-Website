import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Img from "gatsby-image";

const EventLine = (props) => {
  // Setting Default Position of Active depending on day
  let date = new Date();
  let startDate = new Date("11/23/2020");
  let diffTime = date - startDate;
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let openEvent = 0;
  if (diffDays <= 0) {
    openEvent = 1;
  } else if (diffDays >= 4) {
    openEvent = 4;
  } else {
    openEvent = diffDays + 1;
  }

  const [eventDay, setEventDay] = useState(openEvent);
  const [deltaDay, setDeltaDay] = useState(-1);
  const { events } = props;

  // Animation for change state
  const changeContent = (day) => {
    if (day > eventDay) {
      setDeltaDay(1);
    } else {
      setDeltaDay(-1);
    }
    setEventDay(day);
  };

  const contentRef = useRef([]);
  contentRef.current = [];

  const addToRefs = (el) => {
    if (el && !contentRef.current.includes(el)) {
      contentRef.current.push(el);
    }
  };

  useEffect(() => {
    contentRef.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          x: 1000 * deltaDay,
          opacity: 0,
          ease: "power4.easeOut",
        },
        {
          x: 0,
          duration: 1,
          opacity: 1,
          ease: "power4.easeOut",
        }
      );
    });
  }, [eventDay, deltaDay]);

  return (
    <section>
      <h2 className="main-header">More Events</h2>

      {/* Event Timeline */}
      <div className="events__event-line">
        <div
          className="events__progress"
          style={{ width: `${((eventDay - 1) / 4) * 100}%` }}
        ></div>
        <div className="events__event-line-items">
          {events.map((event, index) => {
            return (
              <div
                key={event.id}
                className={
                  eventDay === event.id
                    ? "item active current"
                    : eventDay >= event.id
                      ? "item active"
                      : "item"
                }
                onKeyDown={() => changeContent(event.id)}
                onClick={() => changeContent(event.id)}
                role="button"
                tabIndex={index}
              >
                <div className="item-subTitle">{event.subTitle}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Content */}
      <div ref={addToRefs} className="events__event-content">
        <div className="event-image">
          <Img
            fluid={events[eventDay - 1].img.childImageSharp.fluid}
            alt={events[eventDay - 1].img.name}
          />
        </div>
        <div className="event-info">
          <h3>{events[eventDay - 1].title}</h3>
          <p>{events[eventDay - 1].content}</p>
        </div>
      </div>
    </section>
  );
};

export default EventLine;
