import { FC, useRef, useState } from "react";
import axios from "axios";
import { TTS_API_URL } from "../../../store/constants.ts";
import {AppDispatch} from "../../../store/store.ts";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {setIsPlayingGlobal} from "../../../store/base/baseActions.ts";
import SpeakerPlayIcon from "./icons/SpeakerPlayIcon.tsx";
import Spinner from "./icons/Spinner.tsx";
import SpeakerStopIcon from "./icons/SpeakerStopIcon.tsx";

interface Props {
  text: string;
  language?: string;
}

const Player: FC<Props> = ({ text, language }) => {
  // Global state management to keep track of current playback.
  const dispatch: AppDispatch = useAppDispatch();
  const isPlayingGlobal = useAppSelector((state) => state.base.isPlaying);

  // Local state management to not interface with each other.
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = async () => {
    setIsButtonDisabled(true); // As soon as the button is pressed, make is disabled to avoid double press.
    if (!isButtonDisabled) {
      try {
        setIsLoading(true);

        const response = await axios.get(TTS_API_URL, {
          responseType: 'blob',
          params: {text: text, language: language}
        });

        setIsLoading(false);

        const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        await audio.play();

        audio.addEventListener('ended', handleAudioEnd);
        audioRef.current = audio;

        setIsPlaying(true);
        setIsButtonDisabled(false);
        dispatch(setIsPlayingGlobal(true));
      } catch (error) {
        console.error("Error occurred while fetching and playing audio:", error);
      }
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    dispatch(setIsPlayingGlobal(false));

    // After stopping the audio, disable the button for some time to avoid repetitive playback.
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 500);
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      handleAudioEnd();
    }
  };

  const handleClick = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio().then(() => null);
    }
  };

  return (
    // If a button is pressed, the global isPlaying turns on. Therefore, all buttons becomes disabled.
    // When a button is connected to the current audio, it should not be disabled, therefore it is connected to
    // disabled=isButtonDisabled. If the button is not connected to the current audio, then disabled=isPlayingGlobal.
    <button onClick={handleClick} disabled={isPlaying ? isButtonDisabled : isPlayingGlobal}>
      {isPlaying ? <SpeakerStopIcon /> : isLoading ? <Spinner/> : <SpeakerPlayIcon/>}
    </button>
  );
};

export default Player;
