import { currentUser } from '@clerk/nextjs/server'

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) return <p>ログインしてね</p>

  return (
    <main>
      <h1>ようこそ！</h1>
      <p>あなたの名前: {user.firstName}（ID: {user.id}）</p>
    </main>
  )
}