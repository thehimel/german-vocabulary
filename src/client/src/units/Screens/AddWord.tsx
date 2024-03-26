import {Input} from "@nextui-org/react";

const AddWord = () => {


  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input type="text" label="Word"/>
          <Input type="text" label="Article"/>
        </div>
      </div>
    </>
  );
}

export default AddWord;
