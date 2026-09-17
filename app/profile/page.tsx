import { getSession } from "../actions/auth";

export default async function Profile() {
  const session = await getSession();

  return (
    <div className="content">
      <h1 className="page-title">Welcome {session.userId}</h1>
    </div>
  );
}
