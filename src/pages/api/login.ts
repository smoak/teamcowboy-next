import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironConfig } from "@/lib/ironConfig";
import teamcowboy from "teamcowboy";

interface LoginFormRequest extends NextApiRequest {
  body: {
    username?: string;
    password?: string;
  };
}

const handler = async (req: LoginFormRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).send("");
  }

  const { body } = req;
  const { username, password } = body;

  if (!username || !password) {
    return res.status(400).send("username and password are both requred");
  }

  const api = teamcowboy({
    privateKey: process.env.TC_PRIVATE_API_KEY as string,
    publicKey: process.env.TC_PUBLIC_API_KEY as string,
  });

  const tokenResponse = await api.auth.getUserToken({ username, password });

  if (!tokenResponse.success) {
    return res
      .status(tokenResponse.body.httpResponse)
      .send(tokenResponse.body.message);
  }

  req.session.user = {
    id: tokenResponse.body.userId,
    token: tokenResponse.body.token,
  };

  await req.session.save();

  res.redirect("/");
};

export default withIronSessionApiRoute(handler, ironConfig);
