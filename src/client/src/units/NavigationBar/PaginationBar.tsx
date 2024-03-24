import {Pagination} from "@nextui-org/react";
import {FC} from "react";
import {useAppSelector} from "../../store/hooks.ts";

interface PaginationBarProps {
  initialPage: number;
  total: number;
}

const PaginationBar: FC<PaginationBarProps> = ({initialPage, total}) => {
  const darkMode = useAppSelector((state) => state.base.darkMode);

  return (
    <div className={`flex fixed bottom-0 w-full z-50 justify-center pb-2 pt-2 ${darkMode ? 'dark' : ''}`}>
      <Pagination isCompact showControls total={total} initialPage={initialPage} color="secondary" size="lg"/>
    </div>
  );
}

export default PaginationBar;
