import Image from "next/image";

interface Props {
  name: string;
  imageUrl?: string;
  size?: number;
}

const avatarColors = [
  "bg-blue-600",
  "bg-green-600",
  "bg-purple-600",
  "bg-pink-600",
  "bg-orange-600",
  "bg-indigo-600",
  "bg-cyan-600",
  "bg-emerald-600",
];

function getAvatarColor(name: string) {
  const index =
    name.charCodeAt(0) % avatarColors.length;

  return avatarColors[index];
}

export default function Avatar({
  name,
  imageUrl,
  size = 64,
}: Props) {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={name}
        fill
        className="object-cover"
        sizes="(max-width:768px) 100vw, 33vw"
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full font-bold text-white ${getAvatarColor(
        name
      )}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.45,
      }}
    >
      {name.trim().charAt(0).toUpperCase()}
    </div>
  );
}