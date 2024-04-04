import {useEffect} from "react";
import {fetchPreviews} from "../../store/previews/previewsActions.ts";
import {AppDispatch} from "../../store/store.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import WordsSkeleton from "../Words/Skeletons/WordsSkeleton.tsx";
import Words from "../Words/Words.tsx";


const Home = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const previews = useAppSelector((state) => state.previews.previews);
  const primaryLanguage = useAppSelector((state) => state.base.primaryLanguage);
  const level = useAppSelector((state) => state.base.level);
  const loading = useAppSelector((state) => state.previews.loading);

  useEffect(() => {
    dispatch(fetchPreviews({
      language: primaryLanguage,
      level: level,
      loader: true
    }))
  }, [dispatch, level, primaryLanguage]);

  return (
    <>
      {loading && <WordsSkeleton/>}
      {previews && <Words words={previews}/>}
    </>
  );
}

export default Home;
