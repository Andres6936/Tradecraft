"use server"

import {login as withLogin} from "@trader/api"

const login = async (previosState: any, actionPayload: any) => {
  const result = await withLogin({
    email: actionPayload.email,
    password: actionPayload.password
  }, {
    headers: {
      "User-Agent": process.env.USER_AGENT || "",
    }
  })

  if (result.statusCode === 200) {
    return {
      email: actionPayload.email,
      password: actionPayload.password,
      token: result.body.token,
      message: result.body.message,
    }
  }

  return {
    email: actionPayload.email,
    password: actionPayload.password,
    token: "",
    message: "Not authorized",
  }
}

export {login}
