import type { NextPage } from "next";

import { RefObject, useEffect, useRef, useState } from "react";

import Head from "next/head";
import Image from "next/image";

const idxToTeam = ["ai", "algo", "design", "dev"];

const Home: NextPage = () => {
  const aiSquare = useRef<HTMLDivElement>(null);
  const algoSquare = useRef<HTMLDivElement>(null);
  const designSquare = useRef<HTMLDivElement>(null);
  const devSquare = useRef<HTMLDivElement>(null);

  const [gameLength, setGameLength] = useState(2);
  const [gameStarted, setGameStarted] = useState(false);
  const [showingSequence, setShowingSequence] = useState(true);

  const refs = [aiSquare, algoSquare, designSquare, devSquare];

  const [sequence, setSequence] = useState<string[]>([]);
  const [userSequence, setUserSequence] = useState<string[]>([]);

  useEffect(() => {
    if (userSequence.length === gameLength) {
      if (userSequence.join("") === sequence.join("")) {
        setGameLength((prev) => prev + 1);
      } else {
        alert("You lost!");
        setGameLength(2);
        setShowingSequence(true);
        setUserSequence([]);
        setSequence([]);
      }
    }
  }, [userSequence]);

  // increase the size of the square, then after 750ms normalize it
  const highlight = (ref: RefObject<HTMLDivElement>) => {
    ref.current?.classList.add("scale-125");

    // add the square to the sequence
    setSequence((prev) => [...prev, idxToTeam[refs.indexOf(ref)]]);
    setTimeout(() => {
      ref.current?.classList.remove("scale-125");
    }, 750);
  };

  // when we click start, we want to randomly highlight 2 squares
  // to start the game
  useEffect(() => {
    const startGame = () => {
      setGameStarted(true);
      setShowingSequence(true);
      setSequence([]);
      setUserSequence([]);

      // randomly highlight gameLength squares
      for (let i = 0; i < gameLength; i++) {
        const randomIndex = Math.floor(Math.random() * refs.length);
        setTimeout(() => {
          highlight(refs[randomIndex]);
        }, i * 1000);
      }

      // after the sequence is done, we want to allow the user to click
      // on the squares
      setTimeout(() => {
        setShowingSequence(false);
      }, gameLength * 750);
    };
    startGame();
  }, [gameLength]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-40 py-2">
      <Head>
        <title>ACM Memory Game</title>
        <link rel="icon" href="https://acmcsuf.com/assets/badges/general.svg" />
      </Head>

      <h1 className="text-6xl font-bold">ACM Memory</h1>

      <div className="grid rotate-45 grid-cols-2 gap-8">
        <div
          ref={aiSquare}
          className={
            "square bg-ai" + (showingSequence ? " hover:scale-100" : "")
          }
          onClick={() => {
            if (!showingSequence) {
              setUserSequence([...userSequence, "ai"]);
            }
          }}
        ></div>
        <div
          ref={algoSquare}
          className={
            "square bg-algo" + (showingSequence ? " hover:scale-100" : "")
          }
          onClick={() => {
            if (!showingSequence) {
              setUserSequence([...userSequence, "algo"]);
            }
          }}
        ></div>
        <div
          ref={designSquare}
          className={
            "square bg-design" + (showingSequence ? " hover:scale-100" : "")
          }
          onClick={() => {
            if (!showingSequence) {
              setUserSequence([...userSequence, "design"]);
            }
          }}
        ></div>
        <div
          ref={devSquare}
          className={
            "square bg-dev" + (showingSequence ? " hover:scale-100" : "")
          }
          onClick={() => {
            if (!showingSequence) {
              setUserSequence([...userSequence, "dev"]);
            }
          }}
        ></div>
      </div>

      <button
        className={
          "rounded bg-blue-500 py-4 px-24 font-bold text-white hover:bg-blue-700" +
          (gameStarted
            ? " disabled:cursor-not-allowed disabled:hover:bg-blue-500"
            : "")
        }
        disabled={gameStarted}
        onClick={() => {
          if (!gameStarted) {
            setGameLength(2);
          }
        }}
      >
        Start
      </button>
    </div>
  );
};

export default Home;
