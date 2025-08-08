import { SkewLoader } from "react-spinners";

interface Props {
  text?: string;
}

const Loading: React.FC<Props> = ({ text = "Loading ..." }) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4 text-gray-600">
        <SkewLoader color="#3b82f6" />
        <span className="text-sm font-medium">{text}</span>
      </div>
    </div>
  );
};

export default Loading;
