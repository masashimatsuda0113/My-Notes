// /src/app/memo/MemoList.tsx
'use client'

import { useState } from 'react'
import { deleteMemo, updateMemo, createMemo } from './actions'

export default function MemoList({ memos }: { memos: any[] }) {
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await createMemo(formData)
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      {/* ★★ 追加フォームは常に表示 ★★ */}
      <form onSubmit={handleCreate} className="border p-4 rounded shadow bg-white space-y-2">
        <input
          name="title"
          placeholder="タイトルを入力"
          className="border rounded p-2 w-full"
          required
        />
        <textarea
          name="content"
          placeholder="内容を入力"
          className="border rounded p-2 w-full h-24"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          メモを追加
        </button>
      </form>

      {/* ★★ メモ一覧（ある場合のみ） ★★ */}
      {memos.length === 0 ? (
        <p className="text-gray-500 text-center mt-4">まだメモがありません 📝</p>
      ) : (
        <ul className="space-y-4">
          {memos.map((memo) =>
            editingId === memo.id ? (
              <form
                key={memo.id}
                onSubmit={async (e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  await updateMemo(formData)
                  setEditingId(null)
                  window.location.reload()
                }}
                className="border p-4 bg-gray-50 rounded space-y-2"
              >
                <input type="hidden" name="id" value={memo.id} />
                <input name="title" defaultValue={memo.title} className="border rounded p-2 w-full" />
                <textarea name="content" defaultValue={memo.content} className="border rounded p-2 w-full h-24" />
                <div className="flex gap-2">
                  <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">保存</button>
                  <button type="button" className="text-gray-500 underline" onClick={() => setEditingId(null)}>キャンセル</button>
                </div>
              </form>
            ) : (
              <li key={memo.id} className="border p-4 rounded shadow bg-white">
                <h2 className="text-lg font-bold">{memo.title}</h2>
                <p className="text-gray-700">{memo.content}</p>
                <div className="flex gap-3 mt-2">
                  <form action={deleteMemo}>
                    <input type="hidden" name="id" value={memo.id} />
                    <button className="text-red-500 text-sm hover:underline">削除</button>
                  </form>
                  <button className="text-blue-500 text-sm hover:underline" onClick={() => setEditingId(memo.id)}>編集</button>
                </div>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  )
}
