import {SearchIcon} from "./SearchIcon.tsx";
import {Input} from "@nextui-org/react";

interface SearchBarProps {
  size?: string;
}

export const SearchBar = ({size = "20rem",}: SearchBarProps) => (
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
  />
);

export default SearchBar;
