import Word from './Word.tsx';
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useEffect} from "react";
import {fetchWords} from "../../store/wordActions.ts";
import {AppDispatch} from "../../store/store.ts";

export default function Words() {
  const dispatch: AppDispatch = useAppDispatch();
  const words = useAppSelector((state) => state.words.words);

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
