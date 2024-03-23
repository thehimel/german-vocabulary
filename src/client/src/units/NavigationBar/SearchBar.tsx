import {SearchIcon} from "./SearchIcon.tsx";
import {Input} from "@nextui-org/react";
import {AppDispatch} from "../../store/store.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {ChangeEvent} from "react";
import {fetchWords} from "../../store/words/wordsActions.ts";

interface SearchBarProps {
  size?: string;
}

export const SearchBar = ({size = "20rem",}: SearchBarProps) => {
  const dispatch: AppDispatch = useAppDispatch();
  const primaryLanguage = useAppSelector((state) => state.base.primaryLanguage);
  const level = useAppSelector((state) => state.base.level);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(fetchWords(primaryLanguage, level, value ? value : "", true));
  };

  return (
    <Input
      classNames={{
        base: `max-w-full sm:max-w-[${size}] h-10`,
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      placeholder="Type to search..."
      size="sm"
      startContent={<SearchIcon size={18} />}
      type="search"
      onChange={handleSearch}
    />
  );
}

export default SearchBar;
