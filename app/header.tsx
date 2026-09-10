import Link from "next/link";

export default function PageHeader() {
  return (
    <header className="mx-auto container flex items-center justify-between p-4">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        <Link href="/">My App</Link>
      </h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
