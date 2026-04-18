"use server"

import {login as withLogin, toSuccess} from "@trader/api"

const login = async (args: {
  email: string;
  password: string;
}) => {
  const result = await withLogin({
    email: args.email,
    password: args.password
  }, {
    headers: {
      "User-Agent": process.env.USER_AGENT || "",
    }
  })

  if (result.statusCode === 401) {
    return result;
  }

  if (result.statusCode === 200) {
    return toSuccess({
      token: result.body.token,
      message: result.body.message,
    })
  }

  return result;
}

export {login}
