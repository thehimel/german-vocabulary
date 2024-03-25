import {Pagination} from "@nextui-org/react";
import {FC} from "react";
import {useAppSelector} from "../../store/hooks.ts";

interface PaginationBarProps {
  initialPage: number;
  total: number;
  onChange: (value: number) => void;
}

const PaginationBar: FC<PaginationBarProps> = ({initialPage, total, onChange}) => {
  const darkMode = useAppSelector((state) => state.base.darkMode);

  return (
    <div className={`flex fixed bottom-0 w-full z-50 justify-center pb-8 pt-2 ${darkMode ? 'dark' : ''}`}>
      <Pagination
        isCompact
        showControls
        showShadow
        color="secondary"
        size="lg"
        total={total}
        initialPage={initialPage}
        onChange={onChange}
      />
    </div>
  );
}

export default PaginationBar;
