import { TeamCowboy } from "teamcowboy.js";
export const teamCowboy = new TeamCowboy({
  privateApiKey: process.env.TC_PRIVATE_API_KEY as string,
  publicApiKey: process.env.TC_PUBLIC_API_KEY as string,
  verbose: true
});

export const createAuthenticatedTeamCowboy = (authToken: string) =>
  new TeamCowboy({
    privateApiKey: process.env.TC_PRIVATE_API_KEY as string,
    publicApiKey: process.env.TC_PUBLIC_API_KEY as string,
    authToken,
  });
