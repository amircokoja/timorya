import { Pagination as FlowbitePagination } from "flowbite-react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <FlowbitePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        theme={{
          pages: {
            base: "inline-flex items-center -space-x-px",
            showIcon: "inline-flex",
            previous: {
              base: "ml-0 min-w-22 rounded-l-lg border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700",
              icon: "h-5 w-5",
            },
            next: {
              base: "min-w-22 rounded-r-lg border border-gray-300 bg-white px-2 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700",
              icon: "h-5 w-5",
            },
            selector: {
              base: "border border-gray-300 bg-white px-2 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700",
              active:
                "z-10 border-blue-300 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700",
              disabled: "cursor-not-allowed opacity-50",
            },
          },
        }}
      />
    </div>
  );
};
export default Pagination;
