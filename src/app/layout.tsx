// src/app/layout.tsx

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import './globals.css'

export const metadata = {
  title: 'My Notes',
  description: 'まさしのメモアプリ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="ja">
        <body>
          <header className="p-4 flex justify-end gap-4 bg-gray-100">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

// このファイルは、Next.jsのページのレイアウトを定義するためのファイルです。
// このファイルでは、Clerkのコンポーネントを使用してヘッダーを作成しています。
// Clerkは、認証システムを提供するサービスです。
// ClerkProviderは、Clerkのコンテキストを提供するコンポーネントです。
