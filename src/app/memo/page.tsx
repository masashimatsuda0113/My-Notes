// src/app/memo/page.tsx

import { createMemo } from './actions'
import { supabase } from '@/lib/supabaseClient'
import { currentUser } from '@clerk/nextjs/server'

export default async function MemoPage() {
  const user = await currentUser()
  if (!user) return <p>ログインしてね</p>

  const { data: memos } = await supabase
    .from('memos')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">メモを投稿</h1>

      <form action={createMemo} className="space-y-4 mb-8">
        <input
          type="text"
          name="title"
          placeholder="タイトル"
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="content"
          placeholder="内容"
          required
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          投稿する
        </button>
      </form>

      <h2 className="text-xl font-bold mb-2">あなたのメモ</h2>
      <ul className="space-y-4">
        {memos?.map((memo) => (
          <li key={memo.id} className="border p-4 rounded bg-white shadow">
            <h3 className="font-semibold">{memo.title}</h3>
            <p className="text-sm text-gray-700 whitespace-pre-line">{memo.content}</p>
            <p className="text-xs text-gray-400 mt-2">{new Date(memo.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
