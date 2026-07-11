interface Props {
  loading: boolean;
  children: React.ReactNode;
  loadingText?: string;
}

export default function SubmitButton({
  loading,
  children,
  loadingText = "Loading...",
}: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 p-2 text-white disabled:opacity-50"
    >
      {loading && (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}

      {loading ? loadingText : children}
    </button>
  );
}