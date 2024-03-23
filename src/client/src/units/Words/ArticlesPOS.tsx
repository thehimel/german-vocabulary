import {FC} from "react";
import {WordItemProps} from "./Word.tsx";
import Chips from "./Chips.tsx";

const ArticlesPOS: FC<WordItemProps> = ({ word }) => {
  return (
    <div className="flex flex-row justify-center gap-1">
      {word.articles && (<Chips items={word.articles} color="secondary" variant="flat"/>)}
      {word.parts_of_speech && (<Chips items={word.parts_of_speech} color="secondary" variant="faded"/>)}
    </div>
  );
}

export default ArticlesPOS;
