import Link from "next/link";

export default function Button({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="bg-black-500 dark:bg-white text-white dark:text-black px-4 py-2 rounded"
    >
      {children}
    </Link>
  );
}
