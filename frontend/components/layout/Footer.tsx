export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto max-w-6xl px-8 py-6 text-center text-sm text-gray-500">

        © {new Date().getFullYear()} Contact Book

        <span className="mx-2">•</span>

        Built with Next.js, AWS Lambda & MongoDB

      </div>
    </footer>
  );
}