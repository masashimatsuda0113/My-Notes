// src/middleware.ts
// このファイルは、Next.jsのミドルウェアを定義するファイルです。
// ミドルウェアは、リクエストが処理される前に実行される処理を定義します。

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// ダッシュボードページ配下のルートを保護対象として定義
// 例: /dashboard, /dashboard/settings など
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

// Clerkのミドルウェアを設定
// リクエストごとに認証状態をチェックします
export default clerkMiddleware(async (auth, req) => {
  // 保護対象のルートにアクセスがあった場合
  if (isProtectedRoute(req)) {
    // ユーザーが認証されていない場合は、ログインページにリダイレクト
    await auth.protect()
  }
})

// ミドルウェアを適用するパスを設定
export const config = {
  matcher: [
    // 静的ファイル（画像、CSS、JSなど）以外のすべてのパスに適用
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // APIルートにも適用
    '/(api|trpc)(.*)',
  ],
}