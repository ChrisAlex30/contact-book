import Logo from "@/components/layout/Logo";

interface Props {
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthCard({
  subtitle,
  children,
}: Props) {
  return (
    <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-lg transition-all duration-300">

      <div className="flex flex-col items-center">

        <Logo />

        <p className="text-center text-gray-500">
          {subtitle}
        </p>

      </div>

      <div className="mt-8">
        {children}
      </div>

    </div>
  );
}