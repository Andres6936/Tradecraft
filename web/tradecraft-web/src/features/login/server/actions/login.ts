"use server"

const login = async (previosState: any, actionPayload: any) => {
  console.log({ previosState }, { actionPayload })
  // Wait for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return {
    username: "",
    password: "",
    token: "AAA",
  }
}

export {login}
