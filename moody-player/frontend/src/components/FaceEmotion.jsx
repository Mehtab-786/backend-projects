import { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as faceapi from "face-api.js";

function FaceEmotion({ setsong }) {
  const videoRef = useRef();
  const [emotion, setEmotion] = useState("");

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    };
    loadModels();
  }, []);

  const handleVideoPlay = async () => {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const maxEmotion = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b
      );
      setEmotion(maxEmotion); // only the dominant emotion

      axios
        .get(`http://localhost:3000/api/song/post?mood=${maxEmotion}`)
        .then((res) => {
          setsong(() => [res.data.songs]);
        })
        .catch((err) => console.log("Error while fetching songs, ", err));
    }
  };

  return (
    <div className="flex flex-col items-start mb-8">
      <video
        ref={videoRef}
        autoPlay
        muted
        width="400"
        height="300"
        className="rounded-lg border-2 border-neutral-700 shadow-lg"
      />
      <button
        onClick={handleVideoPlay}
        className="mt-3 px-4 py-2 bg-gradient-to-r cursor-pointer from-pink-500 to-orange-400 text-white font-semibold rounded-md hover:opacity-90 hover:scale-105 transition-transform duration-300"
      >
        Detect
      </button>
      <h2 className="mt-2 text-sm text-gray-400">
        Detected Emotion: <span className="text-pink-400">{emotion}</span>
      </h2>
    </div>
  );
}

export default FaceEmotion;
