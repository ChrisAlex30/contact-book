"use client";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2 rounded-xl border bg-white p-3 shadow-sm sm:flex-nowrap sm:justify-between sm:gap-0 sm:p-4">

      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
        className="rounded-md border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-2 sm:text-base"
      >
        <span className="sm:hidden">←</span>
        <span className="hidden sm:inline">← Previous</span>
      </button>

      <span className="text-sm font-medium text-gray-600">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
        className="rounded-md border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-2 sm:text-base"
      >
        <span className="sm:hidden">→</span>
        <span className="hidden sm:inline">Next →</span>
      </button>

    </div>
  );
}