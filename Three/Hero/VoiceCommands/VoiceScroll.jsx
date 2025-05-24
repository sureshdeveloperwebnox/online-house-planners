"use client";
import React, { useEffect, useRef } from "react";

const VoiceScroll = () => {
  const recognitionRef = useRef(null);

  useEffect(() => {
    console.log("Listenng");
    
    if (typeof window === "undefined" || !("webkitSpeechRecognition" in window)) {
      alert("Web Speech API is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log("Heard:", transcript);

      if (transcript.includes("scroll down")) {
        window.scrollBy({ top: 400, behavior: "smooth" });
      } else if (transcript.includes("scroll up")) {
        window.scrollBy({ top: -200, behavior: "smooth" });
      } else if (transcript.includes("scroll top")) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (transcript.includes("scroll bottom")) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      // Attempt restart on error (except if permission denied)
      if (event.error !== "not-allowed") {
        recognition.start();
      }
    };

    recognition.onend = () => {
      // Restart if ended unexpectedly
      recognition.start();
    };

    recognitionRef.current = recognition;

    // Try to get permission immediately
    recognition.start();

    return () => {
      recognition.stop();
    };
  }, []);

  return null; // No buttons or visible elements
};

export default VoiceScroll;
