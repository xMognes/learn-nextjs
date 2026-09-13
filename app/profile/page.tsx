import { getSession } from "../actions/auth";

export default async function Profile() {
  const session = await getSession();

  return (
    <div>
      <p>{session.userId}</p>
    </div>
  );
}
