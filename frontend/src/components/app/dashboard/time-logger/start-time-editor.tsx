import Input from "@/src/components/ui/input";

interface Props {
  updatedTime: string;
  setUpdatedTime: (time: string) => void;
  handleTimeUpdate: () => void;
}

export default function StartTimeEditor({
  updatedTime,
  setUpdatedTime,
  handleTimeUpdate,
}: Props) {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTimeUpdate();
    }
  };

  return (
    <div className="absolute top-7 left-1/2 z-10 mt-2 w-64 -translate-x-1/2 rounded-md border border-gray-300 bg-white p-4 shadow-lg">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        Start Time
      </label>
      <Input
        placeholder="Enter start time"
        name="startTime"
        value={updatedTime}
        onChange={(e) => {
          setUpdatedTime(e.target.value);
        }}
        onBlur={() => {
          handleTimeUpdate();
        }}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
