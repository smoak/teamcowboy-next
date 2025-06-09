import { redirect } from "next/navigation";
import { getSession } from "./lib/session";
import { createAuthenticatedTeamCowboy } from "./lib/teamcowboy/api";
import { UserNav } from "@/components/UserNav";

const getData = async (userToken: string) => {
  const tc = createAuthenticatedTeamCowboy(userToken);
  const { body: user } = await tc.User.get();
  const { body: events } = await tc.User.getTeamEvents();
  return {
    user: {
      ...user,
      initials: [user.firstName[0], user.lastName[0]].join(""),
    },
    events,
  };
};

const Home = async () => {
  const { session, payload } = await getSession();

  if (!session || !payload) {
    return redirect("/api/auth/signin");
  }

  const { user } = await getData(payload.tcToken);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
        <h1 className="text-lg font-semibold">League Wrangler</h1>
        <div className="ml-auto flex items-center gap-4">
          <UserNav
            displayName={user.displayName}
            email={user.emailAddress1}
            profileImageUrl={user.profilePhoto.thumbUrl}
            userInitials={user.initials}
          />
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[240px_1fr]"></div>
    </div>
  );
};

export default Home;
