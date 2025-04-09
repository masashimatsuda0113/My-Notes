import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import "./globals.css";
import { jaJP } from '@clerk/localizations'

export const metadata = {
  title: "みんなのメモ帳",
  description: "みんなで共有するメモアプリ",
  openGraph: {
    title: "みんなのメモ帳 - みんなで共有するメモアプリ",
    description: "メモを共有して、みんなの知識を深めましょう！",
    url: "https://my-notes-nu-nine.vercel.app/",
    siteName: "みんなのメモ帳",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: "みんなのメモ帳のOGP画像",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "みんなのメモ帳 - みんなで共有するメモアプリ",
    description: "メモを共有して、みんなの知識を深めましょう！",
    images: ["/ogp.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={jaJP}>
      <html lang="ja">
        <body>
          <header className="px-4 py-3 flex justify-between items-center bg-white border-b">
            {/* 左側：ロゴ or サイト名 */}
            <h1 className="text-lg font-bold text-purple-600">
              <Link href="/">みんなのメモ帳</Link>
            </h1>

            {/* 中央：メニュー */}
            <SignedIn>
              <nav className="fixed bottom-6 right-6 flex flex-col gap-2 bg-white p-2 rounded-lg shadow-lg border border-gray-100">
                <Link 
                  href="/memo" 
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                >
                  <span>📝</span>
                  メモ
                </Link>
                <Link 
                  href="/profile" 
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                >
                  <span>👤</span>
                  プロフィール
                </Link>
              </nav>
            </SignedIn>

            {/* 右側：ログイン系 */}
            <div className="flex items-center gap-3">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                    ログイン
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-4 py-2 text-sm border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition-colors">
                    新規登録
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
