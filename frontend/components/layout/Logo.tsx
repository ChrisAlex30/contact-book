import Link from "next/link";

interface Props {
  size?: number;
  href?: string;
}

export default function Logo({
  size = 36,
  href,
}: Props) {
  const content = (
    <div className="flex items-center gap-2.5">
      {/* SVG */}
       <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connection Lines */}
        <path
          d="M20 20 L32 32 L44 20"
          stroke="#2563EB"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Top Left */}
        <circle
          cx="20"
          cy="18"
          r="8"
          fill="#2563EB"
        />

        {/* Top Right */}
        <circle
          cx="44"
          cy="18"
          r="8"
          fill="#2563EB"
        />

        {/* Bottom */}
        <circle
          cx="32"
          cy="42"
          r="8"
          fill="#2563EB"
        />

        {/* Body */}
        <path
          d="M14 56c0-6 5-10 12-10h12c7 0 12 4 12 10"
          stroke="#2563EB"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      <span className="text-[30px] font-extrabold tracking-tight text-blue-700">
        Contact Book
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href}>
        {content}
      </Link>
    );
  }

  return content;
}