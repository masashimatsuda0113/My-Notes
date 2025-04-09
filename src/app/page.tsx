// src/app/page.tsx
import { supabase } from '@/lib/supabaseClient'
import { currentUser } from "@clerk/nextjs/server";
import LoginPrompt from '@/components/LoginPrompt'

type Memo = {
  id: string
  title: string
  content: string
  created_at: string
  is_public: boolean
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const user = await currentUser()
  if (!user) return <LoginPrompt />

  const page = Number(searchParams.page) || 1
  const pageSize = 10
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data: memos, error, count } = await supabase
    .from('memos')
    .select('id, title, content, created_at, is_public', { count: 'exact' })
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('エラー:', error)
    return <p className="text-red-500 p-4">メモの取得に失敗しました</p>
  }

  const totalPages = Math.ceil((count || 0) / pageSize)

  return (
    <main className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-2xl font-bold text-purple-600">みんなのメモ一覧 📝</h1>

      {memos.length === 0 ? (
        <p className="text-gray-500">まだメモがありません</p>
      ) : (
        <>
          <ul className="space-y-4">
            {memos.map((memo: Memo) => (
              <li key={memo.id} className="border p-4 rounded shadow bg-white">
                <p>{user.firstName} {user.lastName}</p>
                <h2 className="text-lg font-bold">{memo.title}</h2>
                <p className="text-gray-700">{memo.content}</p>
                <p className="text-sm text-gray-400 mt-2">
                  投稿日: {new Date(memo.created_at).toLocaleString('ja-JP')}
                </p>
              </li>
            ))}
          </ul>
          
          <div className="flex justify-center gap-2 mt-4">
            {page > 1 && (
              <a
                href={`/?page=${page - 1}`}
                className="px-4 py-2 bg-purple-100 text-purple-600 rounded hover:bg-purple-200"
              >
                前へ
              </a>
            )}
            {page < totalPages && (
              <a
                href={`/?page=${page + 1}`}
                className="px-4 py-2 bg-purple-100 text-purple-600 rounded hover:bg-purple-200"
              >
                次へ
              </a>
            )}
          </div>
        </>
      )}
    </main>
  )
}
