interface Props {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

export default function AuthCard({
    title,
    subtitle,
    children,
}: Props) {
    return (
        <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-lg transition-all duration-300">
            <h1 className="text-3xl font-bold">
                {title}
            </h1>

            <p className="mt-2 text-gray-500">
                {subtitle}
            </p>

            <div className="mt-8">
                {children}
            </div>
        </div>
    );
}