import { TeamCowboy } from "teamcowboy.js";

const privateApiKey = process.env.TC_PRIVATE_API_KEY!;
const publicApiKey = process.env.TC_PUBLIC_API_KEY!;

export const teamCowboy = new TeamCowboy({
  privateApiKey,
  publicApiKey,
  verbose: true,
});

export const createAuthenticatedTeamCowboy = (authToken: string) =>
  new TeamCowboy({
    privateApiKey,
    publicApiKey,
    authToken,
  });
