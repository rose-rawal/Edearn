import React, { useRef, useEffect } from "react";

const DarkHome = () => {
  const canvasRef = useRef(null);
  const canvas2Ref = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const canvas2 = canvas2Ref.current;
    const ctx2 = canvas2.getContext("2d");

    const cw = window.innerWidth;
    const ch = window.innerHeight;
    const charArr = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    const maxCharCount = 100;
    const fallingCharArr = [];
    const fontSize = 10;
    const maxColumns = cw / fontSize;

    canvas.width = canvas2.width = cw;
    canvas.height = canvas2.height = ch;

    const randomInt = (min, max) =>
      Math.floor(Math.random() * (max - min) + min);

    const randomFloat = (min, max) => Math.random() * (max - min) + min;

    class Point {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }

      draw(ctx) {
        this.value = charArr[randomInt(0, charArr.length - 1)].toUpperCase();
        this.speed = randomFloat(1, 3);
        // this.speed = randomFloat(1, 5);

        ctx2.fillStyle = "rgba(255,255,255,0.8)";
        ctx2.font = `${fontSize}px san-serif`;
        ctx2.fillText(this.value, this.x, this.y);

        ctx.fillStyle = "#383838";
        ctx.font = `${fontSize}px san-serif`;
        ctx.fillText(this.value, this.x, this.y);

        this.y += this.speed;
        if (this.y > ch) {
          this.y = randomFloat(-100, 0);
          this.speed = 2;
          // this.speed = randomFloat(2, 5);
        }
      }
    }

    for (let i = 0; i < maxColumns; i++) {
      fallingCharArr.push(new Point(i * fontSize, randomFloat(-500, 0)));
    }

    const update = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, cw, ch);

      ctx2.clearRect(0, 0, cw, ch);

      let i = fallingCharArr.length;

      while (i--) {
        fallingCharArr[i].draw(ctx);
        const v = fallingCharArr[i];
      }

      requestAnimationFrame(update);
    };

    update();

    // Cleanup function to stop the animation when the component unmounts
    return () => cancelAnimationFrame(update);
  }, []); // The empty dependency array ensures that this effect runs only once after the initial render

  return (
    <div
      style={{
        overflow: "hidden",
        margin: 0,
        zIndex: -1,
        position: "absolute",
      }}
      className="overflow-hidden w-full h-screen"
    >
      <canvas ref={canvasRef} style={{ display: "flex" }} />
      <canvas ref={canvas2Ref} style={{ display: "flex" }} />
    </div>
  );
};

export default DarkHome;
