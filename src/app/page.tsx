// import { getSessionData } from "@/lib/session";
// import { createAuthenticatedTeamCowboy } from "@/lib/teamcowboy/api";
// import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

// const getData = async (userToken: string) => {
//   const tc = createAuthenticatedTeamCowboy(userToken);
//   const { body } = await tc.User.get();
//   return body;
// };

const Home = async () => {
  // const session = await auth();
  // const { user } = await getSessionData(cookies());

  // if (!session) {
  //   return redirect("/api/auth/signin");
  // }

  

  // const tUser = await getData(user.token);

  return (
    <>
      {/* <span>Welcome, {tUser.firstName}</span> */}
      <Link href="/logout">Logout</Link>
    </>
  );
};

export default Home;
