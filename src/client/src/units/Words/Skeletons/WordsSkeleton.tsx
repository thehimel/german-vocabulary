import {FC} from "react";
import WordSkeleton, {WordSkeletonProps} from "./WordSkeleton.tsx";

const WordsSkeleton: FC<WordSkeletonProps> = ({isFull}) => {
  const numberOfSkeletons = 48;

  return (
    <div className="justify-center max-w-screen-xl mx-auto pt-2 ps-2 pe-2">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {Array.from({length: numberOfSkeletons}).map((_, index) => (
          <WordSkeleton isFull={isFull} key={index}/>
        ))}
      </div>
    </div>
  );
}

export default WordsSkeleton;
