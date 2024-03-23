import { FC, useRef, useState } from "react";
import axios from "axios";
import { Language } from "../../../store/base/baseSlice.ts";
import { TTS_API_URL } from "../../../store/constants.ts";
import {SpeakerLoudIcon, SpeakerOffIcon} from "@radix-ui/react-icons";
import {AppDispatch} from "../../../store/store.ts";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {setIsPlayingGlobal} from "../../../store/base/baseActions.ts";

interface Props {
  text: string;
  language?: Language;
}

const Player: FC<Props> = ({ text, language }) => {
  // Global state management to keep track of current playback.
  const dispatch: AppDispatch = useAppDispatch();
  const isPlayingGlobal = useAppSelector((state) => state.base.isPlaying);

  // Local state management to not interface with each other.
  const [isPlaying, setIsPlaying] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = async () => {
    try {
      const response = await axios.get(TTS_API_URL, {
        responseType: 'blob',
        params: {
          text: text,
          language: language
        }
      });
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      await audio.play();
      audio.addEventListener('ended', handleAudioEnd);
      audioRef.current = audio;
      setIsPlaying(true);
      dispatch(setIsPlayingGlobal(true));
    } catch (error) {
      console.error('Error occurred while fetching and playing audio:', error);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      dispatch(setIsPlayingGlobal(false));

      // After stopping the audio, disable the button for some time to avoid repetitive playback.
      setIsButtonDisabled(true);
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 500);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    dispatch(setIsPlayingGlobal(false));
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
    <button className="ms-1" onClick={handleClick} disabled={isPlaying ? isButtonDisabled : isPlayingGlobal}>
      {isPlaying ? <SpeakerOffIcon /> : <SpeakerLoudIcon />}
    </button>
  );
};

export default Player;
