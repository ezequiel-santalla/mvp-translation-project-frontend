import { Button } from "../Button/Button";

export const FilterActions = () => {
  return (
    <div className="flex items-center space-x-4">
      <Button
        text="Filter"
        colorClass="bg-blue-500 text-white hover:bg-blue-600"
        onClick={() => {} /* Implement filter logic if needed */}
      />
      <Button
        text="Reset filter"
        colorClass="bg-gray-500 text-white hover:bg-gray-600"
        onClick={() => {} /* Implement reset logic if needed */}
      />
    </div>
  );
};
