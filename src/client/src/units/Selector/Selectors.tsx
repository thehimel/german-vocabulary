import Languages from "./Languages.tsx";
import Level from "./Level.tsx";

function Selectors() {
  return (
    <div className="flex justify-between w-full max-w-screen-lg mx-auto gap-2 pt-2 ps-2 pe-2">
      <Languages label="Learning" defaultKey="de"/>
      <Languages label="With" defaultKey="en"/>
      <Level/>
    </div>
  );
}

export default Selectors;
