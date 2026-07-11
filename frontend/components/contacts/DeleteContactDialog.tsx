interface Props {
  open: boolean;
  loading?: boolean;
  contactName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteContactDialog({
  open,
  loading,
  contactName,
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">

        <h2 className="text-xl font-semibold">
          Delete Contact
        </h2>

        <p className="mt-3 text-gray-600">
          Are you sure you want to delete{" "}
          <strong>{contactName}</strong>?
        </p>

        <p className="mt-2 text-sm text-red-600">
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-md border px-4 py-2"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-md bg-red-600 px-4 py-2 text-white"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
}