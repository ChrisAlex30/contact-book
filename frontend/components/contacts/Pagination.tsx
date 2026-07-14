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
    <div className="mt-8 flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">

      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-md border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        ← Previous
      </button>

      <span className="text-sm font-medium text-gray-600">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-md border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next →
      </button>

    </div>
  );
}