"use client"

import { useActionState, useState, startTransition, useEffect } from "react"
import { useRouter } from 'waku'

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { Spinner } from "~/components/ui/spinner"

// Context
import { useLoginContext } from "~/features/login/context/use-login"

// Server Action
import { login as loginAction } from "~/features/login/server/actions/login"

const Login = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()
  const { setToken } = useLoginContext()

  const [state, dispatchAction, isPending] = useActionState(loginAction, {
    email,
    password,
    token: '',
  });

  useEffect(() => {
    if (state.token && state.token.length > 0) {
      setToken(state.token)
      startTransition(() => {
        router.push('/')
      })
    }
  }, [state]);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    startTransition(() => {
      dispatchAction({ email, password, token: '' })
    })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full min-w-xs max-w-xs">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </Field>
              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending && <Spinner data-icon="inline-start" />}
                  Login
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export {Login}
