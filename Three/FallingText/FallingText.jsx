import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";

const FallingText = ({
  text = "",
  highlightWords = [],
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = "2rem",
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [effectStarted, setEffectStarted] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;

    const words = text.split(" ");
    const newHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) =>
          word.toLowerCase().startsWith(hw.toLowerCase())
        );
        return `<span class="falling-word ${
          isHighlighted ? "highlight" : ""
        }">${word}</span>`;
      })
      .join(" ");

    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords]);

  useEffect(() => {
    if (trigger === "auto") {
      setEffectStarted(true);
      return;
    }

    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted || !textRef.current || !containerRef.current) return;

    const {
      Engine,
      Render,
      World,
      Bodies,
      Runner,
      Mouse,
      MouseConstraint,
    } = Matter;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
      },
    });

    const floor = Bodies.rectangle(width / 2, height + 50, width, 100, {
      isStatic: true,
    });

    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, {
      isStatic: true,
    });

    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, {
      isStatic: true,
    });

    const spans = textRef.current.querySelectorAll(".falling-word");
    const bounds = containerRef.current.getBoundingClientRect();

    const wordBodies = Array.from(spans).map((span) => {
      const spanRect = span.getBoundingClientRect();
      const x = spanRect.left - bounds.left + spanRect.width / 2;
      const y = spanRect.top - bounds.top + spanRect.height / 2;

      const body = Bodies.rectangle(x, y, spanRect.width, spanRect.height, {
          render: { fillStyle: "transparent" }, // ✅ This line is important

        restitution: 0.7,
        friction: 0.3,
        frictionAir: 0.05,
      });

      span.style.position = "absolute";
      span.style.left = "0";
      span.style.top = "0";

      return { span, body };
    });

    wordBodies.forEach(({ body, span }) => {
      span.style.transform = `translate(${body.position.x}px, ${body.position.y}px) rotate(${body.angle}rad)`;
      span.style.transformOrigin = "center center";
    });

    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    });

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      mouseConstraint,
      ...wordBodies.map(({ body }) => body),
    ]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    const animate = () => {
      wordBodies.forEach(({ span, body }) => {
        span.style.transform = `translate(${body.position.x}px, ${body.position.y}px) rotate(${body.angle}rad)`;
      });
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world);
      Matter.Engine.clear(engine);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
    };
  }, [effectStarted]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === "click" || trigger === "hover")) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseOver={trigger === "hover" ? handleTrigger : undefined}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "300px",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <div
        ref={textRef}
        style={{
          position: "relative",
          fontSize,
          lineHeight: 1.5,
          textAlign: "center",
          zIndex: 2,
        }}
      />
      <div
        ref={canvasContainerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default FallingText;
