// プロフィールを更新するサーバー処理

// src/app/profile/actions.ts
'use server'
import { currentUser, clerkClient } from '@clerk/nextjs/server'

// 名前を更新するサーバー処理
export async function updateUserName(firstName: string, lastName: string) {
  const user = await currentUser()
  if (!user) throw new Error('ログインしていないよ！')

  const client = await clerkClient()
  await client.users.updateUser(user.id, { firstName, lastName })
}