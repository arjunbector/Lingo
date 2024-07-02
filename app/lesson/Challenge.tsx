import { cn } from "@/lib/utils";
import Card from "./Card";

type Props = {
  options: any[];
  onSelect: (id: string) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: string;
  disabled?: boolean;
  type: "ASSIST" | "SELECT";
};
const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}: Props) => {
  return (
    <div
      className={cn(
        "grid gap-2",
        type === "ASSIST" && "grid-cols-1",
        type === "SELECT" &&
          "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]",
      )}
    >
      {options.map((option, index) => (
        <Card
          key={option._id}
          id={option._id}
          text={option.text}
          imageSrc={option.imageSrc}
          shortcut={`${index + 1}`}
          selected={selectedOption === option._id}
          onClick={() => onSelect(option._id)}
          status={status}
          audioSrc={option.audioSrc}
          disabled={disabled}
          type={type}
        />
      ))}

    </div>
    
  );
};

export default Challenge;
