import Link from "next/link";
import { getSession } from "./(website)/_actions/auth";

export default async function PageHeader() {
  const session = await getSession();

  const routes = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    {
      href: session.isLoggedIn ? "/logout" : "/login",
      label: session.isLoggedIn ? "Logout" : "Login",
    },
  ];
  if (!session.isLoggedIn) {
    routes.push({
      href: "/signup",
      label: "Sign Up",
    });
  }
  const menuItems = routes.map(({ href, label }, i) => (
    <li key={i}>
      <Link
        href={href}
        className="text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white align-middle"
      >
        {label}
      </Link>
    </li>
  ));

  return (
    <header className="py-4 dark:bg-gray-950/20 shadow-sm">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
          <Link href="/">My App</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">{menuItems}</ul>
        </nav>
      </div>
    </header>
  );
}
