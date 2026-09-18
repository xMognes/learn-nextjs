import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="max-w-xs flex-1 px-3 bg-white">
      <h1 className="text-gray-950 font-bold text-2xl my-5">
        <Link href="/dashboard">Ömer Uysal</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link className="text-gray-900" href="/dashboard/site/home">
              Home
            </Link>
          </li>
          <li>
            <Link className="text-gray-900" href="/dashboard/site/about">
              About
            </Link>
          </li>
          <li>
            <Link className="text-gray-900" href="/dashboard/site/blog">
              Blog
            </Link>
          </li>
          <li>
            <Link className="text-gray-900" href="/dashboard/site/projects">
              Projects
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
