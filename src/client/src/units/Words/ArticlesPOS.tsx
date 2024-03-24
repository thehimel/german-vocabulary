import {FC} from "react";

import Chips from "./Chips.tsx";

export interface WordItemProps {
  articles: [{ title: string }];
  parts_of_speech: [{ title: string }];
}

const ArticlesPOS: FC<WordItemProps> = ({ articles, parts_of_speech}) => {
  return (
    <div className="flex flex-row justify-center gap-1">
      {articles && (<Chips items={articles} color="secondary" variant="flat"/>)}
      {parts_of_speech && (<Chips items={parts_of_speech} color="secondary" variant="faded"/>)}
    </div>
  );
}

export default ArticlesPOS;
