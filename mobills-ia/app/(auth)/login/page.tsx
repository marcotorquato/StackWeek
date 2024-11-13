import { Button } from '@/app/_components/ui/button'
import { SignInButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { LogIn } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const LoginPage = async () => {
  const { userId } = await auth()
  if (userId) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl space-y-8">
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-white pb-3">
            <Image
              src="/Logo.svg"
              alt="Finance AI"
              width={173}
              height={39}
              className="w-32 sm:w-40 md:w-44 lg:w-48 xl:w-52"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center">
            Welcome
          </h1>
          <p className="text-gray-400 text-center text-sm md:text-base lg:text-lg">
            Finance AI is a financial management platform that uses AI to
            monitor your transactions and provide personalized insights, making
            it easier to manage your budget.
          </p>
        </div>
        <SignInButton>
          <Button className="w-full bg-zinc-900 text-white border-zinc-800 hover:bg-zinc-800 hover:text-white p-2 sm:p-3 lg:p-4">
            <LogIn />
            Login with SSO
          </Button>
        </SignInButton>
      </div>
    </div>
  )
}
export default LoginPage
