import {FC} from "react";
import Word, {WordProps} from './Word.tsx';


interface WordsProps {
  words: WordProps[];
}

const Words: FC<WordsProps> = ({words}) => {
  const size: number = words.length;

  return (
    <div className="flex justify-center max-w-screen-xl mx-auto pt-2 ps-2 pe-2">
      <div
        className={`${size > 3 ? 'grid grid-cols-2 sm:grid-cols-4 w-full' : size === 3 ? 'grid grid-cols-3' : size === 2 ? 'grid grid-cols-2' : 'flex'} gap-2`}
      >
        {words.map((item, index) => (
          <Word key={index} index={index} word={item}/>
        ))}
      </div>
    </div>
  );
}

export default Words;
