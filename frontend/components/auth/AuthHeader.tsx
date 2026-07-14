import Logo from "@/components/layout/Logo";

interface Props {
  subtitle: string;
}

export default function AuthHeader({
  subtitle,
}: Props) {
  return (
    <div className="mb-8 flex flex-col items-center">

      <Logo size={42} />

      <p className="mt-4 text-center text-gray-600">
        {subtitle}
      </p>

    </div>
  );
}