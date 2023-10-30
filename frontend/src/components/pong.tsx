import { useContext, useEffect, useRef } from "react";
import { Ball, Padlle, canvasContext, useCanvas } from "./interface";
import updateCanvas, { drawCanvas, drawCircle, drawRect, drawText } from "./pongUtils";

const Pong = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasCtx = useCanvas();
  let animationFrameId: number;
  let animationFrameId1: number;
  // if (!canvasRef.current) return;
  // const canvas = canvasRef.current;
  // const ctx = canvas?.getContext("2d");

  const player: Padlle = {
    x: 10,
    y: 0,
    width: 10,
    height: 100,
    color: "white",
    score: 0,
  };

  const computer: Padlle = {
    x: 0,
    y: 0,
    width: 10,
    height: 100,
    color: "white",
    score: 0,
  };

  const ball: Ball = {
    x: 0,
    y: 0,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: "WHITE",
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    computer.x = canvas.width - 15;
    computer.y = canvas.height / 2 - 100 / 2;
    const handleMouseMove = (e: any) => {
      const rect = canvas.getBoundingClientRect();
      const mouseY = e.clientY - rect.top - player.height / 2;
      // player.y = mouseY;
      player.y = Math.min(Math.max(mouseY, 0), canvas.height - player.height);
      // console.log({x: e.clientX, y: e.clientY});
    };
    function update(){
      updateCanvas(
        ctx,canvasCtx, canvas, ball, computer, player
        );
        let computerLevel = 0.9;
        ctx?.clearRect(0, 0, canvasCtx.width, canvasCtx.height);
        drawCanvas(ctx, canvas, canvasCtx);
        drawCircle(ctx, ball);
        let desiredComputerY = ball.y - computer.height / 2;
        desiredComputerY = Math.min(Math.max(desiredComputerY, 0), canvasCtx.height - computer.height);
        computer.y += (desiredComputerY - computer.y) * computerLevel;
        drawRect(ctx, player);
        drawRect(ctx, computer);
        drawText(ctx, canvasCtx.width / 4, canvasCtx.height / 5, player.score);
        drawText(ctx, (3 * canvasCtx.width) / 4, canvasCtx.height / 5, computer.score);
        animationFrameId1 = window.requestAnimationFrame(update);
    }
    animationFrameId = window.requestAnimationFrame(update);
    window.addEventListener("mousemove", handleMouseMove);
  
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.cancelAnimationFrame(animationFrameId1);
      window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={canvasCtx.width}
      height={canvasCtx.height}
      className="border border-black rounded-md"
    />
  )
}

export default Pong;