import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "./lib/session";
import { createAuthenticatedTeamCowboy } from "./lib/teamcowboy/api";

const getData = async (userToken: string) => {
  const tc = createAuthenticatedTeamCowboy(userToken);
  const { body } = await tc.User.get();
  return body;
};

const Home = async () => {
  const { session, payload } = await getSession();

  if (!session || !payload) {
    return redirect("/api/auth/signin");
  }

  const tUser = await getData(payload.tcToken);

  return (
    <>
      <span>Welcome, {tUser.firstName}</span>
      <Link href="/logout">Logout</Link>
    </>
  );
};

export default Home;
