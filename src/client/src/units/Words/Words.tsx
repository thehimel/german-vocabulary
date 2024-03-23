import {FC} from "react";
import Word, {WordProps} from './Word.tsx';


interface WordsProps {
  words: WordProps[];
}

const Words: FC<WordsProps> = ({words}) => {
  const size: number = words.length;

  return (
    <div className="flex justify-center">
      <div
        className={`${size > 4 ? 'grid grid-cols-2 sm:grid-cols-4' : size > 2 ? 'grid grid-cols-2' : 'flex'} gap-2 m-2`}>
        {words.map((item, index) => (
          <Word key={index} item={item}/>
        ))}
      </div>
    </div>
  );
}

export default Words;
