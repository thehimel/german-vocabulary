import Word from "./Word.tsx";
import {wordsData} from "./wordsData.ts";


export default function Words() {
  return (
    <div className="flex justify-center">
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 m-2">
        {wordsData.map((item, index) => (
          <Word key={index} item={item}/>
        ))}
      </div>
    </div>
  );
}
