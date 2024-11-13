import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const Home = async () => {
  const { userId } = await auth()
  if (!userId) {
    redirect('/login')
  }
  return <div className="flex  items-center justify-end px-6 pb-6"></div>
}
export default Home
