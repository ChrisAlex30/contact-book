interface Props {
  loading: boolean;
  children: React.ReactNode;
}

export default function SubmitButton({
  loading,
  children,
}: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex w-full items-center justify-center rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? (
        <>
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Signing In...
        </>
      ) : (
        children
      )}
    </button>
  );
}