import { supabase } from '@/lib/supabaseClient'
import MemoList from './MemoList'

export default async function MemoPage() {
  const { data: memos } = await supabase.from('memos').select('*').order('created_at', { ascending: false })

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">メモ一覧</h1>
      <MemoList memos={memos ?? []} />
    </main>
  )
}