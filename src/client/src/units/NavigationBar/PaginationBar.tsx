import {Pagination} from "@nextui-org/react";

function PaginationBar() {
  return (
    <div className="flex fixed bottom-0 w-full z-10 justify-center items-center pb-2 pt-2">
      <Pagination isCompact showControls total={10} initialPage={1} color="secondary" size="lg"/>
    </div>
  );
}

export default PaginationBar;
