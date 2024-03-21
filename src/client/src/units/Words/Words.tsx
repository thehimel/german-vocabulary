import Word from './Word.tsx';
import {useDispatch, useSelector} from "react-redux";
import {WordsProps} from "../../store/WordSlice.ts";
import {useEffect} from "react";
import {fetchWords} from "../../store/WordActions.ts";

export default function Words() {
  const dispatch = useDispatch();
  const words = useSelector((state: WordsProps) => state.word.words);

  useEffect(() => {
    dispatch(fetchWords())
  }, [dispatch]);

  return (
    <div className="flex justify-center">
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 m-2">
        {words && words.map((item, index) => (
          <Word key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
