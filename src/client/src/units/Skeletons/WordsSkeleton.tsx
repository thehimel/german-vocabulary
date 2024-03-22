import WordSkeleton from "./WordSkeleton.tsx";

export default function WordsSkeleton() {
  const numberOfSkeletons = 48;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 p-2">
      {Array.from({length: numberOfSkeletons}).map((_, index) => (
        <WordSkeleton key={index}/>
      ))}
    </div>
  );
}
