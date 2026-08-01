import { useEffect, useRef, useState } from "react";

import backgroundPhoto from "@/assets/background.jpg";
import mainPhoto from "@/assets/main.jpg";
import sub1Photo from "@/assets/sub1.jpeg";
import sub2Photo from "@/assets/sub2.jpeg";
import sub3Photo from "@/assets/sub3.jpeg";

import "./App.css";

type CardState = "closed" | "opening" | "open" | "closing";

const photos = [
  { id: 1, src: sub1Photo, alt: "Isabel sitting with a dog" },
  { id: 2, src: sub2Photo, alt: "Denis and Isabel together" },
  { id: 3, src: sub3Photo, alt: "Denis and Isabel standing together" },
];

function App() {
  const [cardState, setCardState] = useState<CardState>("closed");
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  };

  const openCard = () => {
    if (cardState !== "closed") return;

    clearTimers();
    setCardState("opening");

    timers.current.push(
      window.setTimeout(() => {
        setCardState("open");
      }, 3500),
    );
  };

  const closeCard = () => {
    if (cardState !== "open") return;

    clearTimers();
    setCardState("closing");

    timers.current.push(
      window.setTimeout(() => {
        setCardState("closed");
      }, 3500),
    );
  };

  useEffect(() => clearTimers, []);

  const isOpen = cardState === "opening" || cardState === "open";
  return (
    <main className="page" style={{ backgroundImage: `url(${backgroundPhoto})` }}>
      <div className="backgroundOverlay" aria-hidden="true" />

      <section className="cardScene" data-state={cardState}>
        <div className="envelopeBack" aria-hidden="true" />

        <article className="messageCard" aria-hidden={!isOpen}>
          <div className="messageContent">
            <header className="insideHeader">
              <h1>Happy Birthday, Isabel</h1>
              <span className="titleUnderline" />
            </header>

            <div className="mainPhoto">
              <img src={mainPhoto} alt="Denis and Isabel together" />
            </div>

            <div className="letter">
              <p className="letterGreeting">Dear Isabel,</p>
            
              <p>
                Happy birthday to the most incredible person I know. I&apos;m so
                grateful that you&apos;re in my life, and I honestly couldn&apos;t
                ask for anyone better. Thank you for every laugh, every memory, and every moment we share. Being with you is my favourite place to be.
                I hope your 21st year brings you happiness, success, and countless
                reasons to smile. You deserve nothing but the best. I love you.
              </p>
            
              <p className="letterEnding">
                Happy Birthday. ❤️
                <br />
                Love always,
                <br />
                Denis
              </p>
            </div>

            <div className="photoStrip">
              {photos.map((photo) => (
                <div className="smallPhoto" key={photo.id}>
                  <img src={photo.src} alt={photo.alt} />
                </div>
              ))}
            </div>
          </div>
        </article>

        <div className="envelopeFront" aria-hidden="true">
          <div className="envelopeFrontLeft" />
          <div className="envelopeFrontRight" />
          <div className="envelopeFrontBottom" />
        </div>

        <button
          className="envelopeFlap"
          type="button"
          aria-expanded={isOpen}
          aria-label="Open birthday card"
          disabled={cardState !== "closed"}
          onClick={openCard}
        >
        </button>

        <div className="envelopeMessage" aria-hidden="true">
          <h2>For My Favourite Person</h2>
        </div>
      </section>

      <button
        className={`closeButton ${cardState === "open" ? "closeButtonVisible" : ""}`}
        type="button"
        disabled={cardState !== "open"}
        onClick={closeCard}
      >
        Close card
      </button>
    </main>
  );
}

export default App;
