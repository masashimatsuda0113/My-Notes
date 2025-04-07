// src/app/memo/actions.ts
'use server'

import { supabase } from '@/lib/supabaseClient'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function createMemo(formData: FormData) {
  const user = await currentUser()
  if (!user) throw new Error('ログインしてないよ')

  const title = formData.get('title') as string
  const content = formData.get('content') as string

  const { error } = await supabase.from('memos').insert({
    user_id: user.id,
    title,
    content,
  })

  if (error) throw new Error(error.message)

  revalidatePath('/memo') // 投稿後にページ再読み込み
}
