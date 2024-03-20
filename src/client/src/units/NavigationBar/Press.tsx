import {FC, ReactNode} from "react";

interface PressProps {
  onPress?: () => void;
  children: ReactNode;
}

const Press: FC<PressProps> = ({ onPress, children }) => {
  const handleClick = () => onPress && onPress();

  return (
    <button onClick={handleClick}>
      {children}
    </button>
  );
};

export default Press;
