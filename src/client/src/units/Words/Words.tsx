import {FC} from "react";
import Word, {WordProps} from './Word.tsx';


interface WordsProps {
  words: WordProps[];
}

const Words: FC<WordsProps> = ({words}) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 m-2">
        {words.map((item, index) => (
          <Word key={index} item={item}/>
        ))}
      </div>
    </div>
  );
}

export default Words;
