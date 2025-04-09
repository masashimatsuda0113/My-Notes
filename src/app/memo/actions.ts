// /src/app/memo/actions.ts
'use server'

import { supabase } from '@/lib/supabaseClient'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

// メモを作成するサーバー処理
export async function createMemo(formData: FormData) {
  const user = await currentUser()
  if (!user) throw new Error('ログインしてないよ')

  const title = formData.get('title') as string
  const content = formData.get('content') as string

  const { error } = await supabase.from('memos').insert([
    {
      user_id: user.id,
      title,
      content,
    },
  ])

  if (error) throw new Error(error.message)

  revalidatePath('/memo') // 投稿後にページ再読み込み
}

// メモを削除するサーバー処理
export async function deleteMemo(formData: FormData) {
  const id = formData.get('id') as string
  const { error } = await supabase.from('memos').delete().eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/memo')
}

// メモを更新するサーバー処理
export async function updateMemo(formData: FormData) {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const is_public = formData.get('is_public') as string

  const { error } = await supabase.from('memos').update({ title, content, is_public }).eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/memo')
}
