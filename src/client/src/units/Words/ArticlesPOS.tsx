import {FC} from "react";

import Chips from "./Chips.tsx";
import {WordProps} from "./Word.tsx";

export interface WordItemProps {
  word: WordProps;
}

const ArticlesPOS: FC<WordItemProps> = ({ word }) => {
  return (
    <div className="flex flex-row justify-center gap-1">
      {word.articles && (<Chips items={word.articles} color="secondary" variant="flat"/>)}
      {word.parts_of_speech && (<Chips items={word.parts_of_speech} color="secondary" variant="faded"/>)}
    </div>
  );
}

export default ArticlesPOS;
