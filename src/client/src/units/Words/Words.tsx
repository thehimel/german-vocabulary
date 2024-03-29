import {FC} from "react";
import {AppDispatch} from "../../store/store.ts";
import Word, {WordProps} from './Word.tsx';


interface WordsProps {
  words: WordProps[];
  addCard?: boolean;
  onPress?: (value: number) => (dispatch: AppDispatch) => void;
}

const Words: FC<WordsProps> = ({words, addCard, onPress}) => {
  const size: number = words.length;

  return (
    <div className="flex justify-center max-w-screen-xl mx-auto pt-2 ps-2 pe-2">
      <div
        className={`${size > 3 ? 'grid grid-cols-2 sm:grid-cols-4 w-full' : size === 3 ? 'grid grid-cols-3' : size === 2 ? 'grid grid-cols-2' : 'flex'} gap-2`}
      >
        {words.map((item, index) => (
          <Word addCard={addCard} key={index} index={index} word={item} onPress={onPress ? onPress : undefined}/>
        ))}
      </div>
    </div>
  );
}

export default Words;
