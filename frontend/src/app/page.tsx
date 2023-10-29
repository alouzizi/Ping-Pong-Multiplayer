"use client";

import Ball from "@/components/Ball";
import Paddle from "@/components/Paddle";
import { time } from "console";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const ballRef = useRef(null);
  const playerRef = useRef(null);
  const computerRef = useRef(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  
  
  useEffect(() => {
    
    const ball = new Ball(ballRef.current);
    const playerPaddle = new Paddle(playerRef.current);
    const computerPaddle = new Paddle(computerRef.current);

    let lastTime:any;
    let animationFrameId: number;
    let animationFrameId1: number;
  
  // <----------------- Update ----------------->
    function update(time:any) {

      if (lastTime != null) {
        const delta = time - lastTime;
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.update(delta, ball.y);
        const hue = parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue('--hue')
        );
        document.documentElement.style.setProperty('--hue', (hue + delta * 0.01).toString());
        if (isLose()) handleLose();
      }
      
      lastTime = time;
      animationFrameId1 = window.requestAnimationFrame(update);
    }

    animationFrameId = window.requestAnimationFrame(update);

    function isLose() {
      const rect = ball.rect();
      return rect.right >= window.innerWidth || rect.left <= 0
    }

    function handleLose() {
      const rect = ball.rect();
      if (rect.right >= window.innerWidth) {
        setPlayerScore(playerScore + 1);
      } else {
        setComputerScore(computerScore + 1);
      }
      ball.reset();
      computerPaddle.reset();
    }



    document.addEventListener("mousemove", e => {
      playerPaddle.position = (e.y / window.innerHeight) * 100
    })

  
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.cancelAnimationFrame(animationFrameId1);
      document.addEventListener("mousemove", e => {
        playerPaddle.position = (e.y / window.innerHeight) * 100
      })
    }
  }, [playerScore, computerScore]);
 
  return (
    <div className="w-screen bg-white h-screen flex justify-center items-center">
      <div className="border border-black rounded-md">
        <div className="score">
          <div id="player-score">{playerScore}</div>
          <div id="computer-score">{computerScore}</div>
        </div>
        <div ref={ballRef} className="ball" id="ball"></div>
        <div ref={playerRef} className="paddle left" id="player-paddle left"></div>
        <div ref={computerRef} className="paddle right" id="computer-paddle"></div>
      </div>
    </div>
  );
}
 