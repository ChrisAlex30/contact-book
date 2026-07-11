export default function LoadingState() {
  return (
    <div className="flex justify-center py-20">
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />

        <span className="text-gray-600">
          Loading contacts...
        </span>
      </div>
    </div>
  );
}