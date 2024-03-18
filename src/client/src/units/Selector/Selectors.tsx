import Languages from "./Languages.tsx";
import Level from "./Level.tsx";

function Selectors() {
  return (
    <>
      <Languages label="Learning" defaultKey="de"/>
      <Languages label="With" defaultKey="en"/>
      <Level/>
    </>
  );
}

export default Selectors;
