import {FC, ReactNode} from "react";

interface PressProps {
  onPress?: () => void;
  children: ReactNode;
}

const Press: FC<PressProps> = ({ onPress, children }) => {
  const handleClick = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <button className="cursor-pointer" onClick={handleClick}>
      {children}
    </button>
  );
};

export default Press;
