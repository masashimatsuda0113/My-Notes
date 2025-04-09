import { SignInButton } from "@clerk/nextjs";

export default function LoginPrompt() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <h1 className="text-4xl font-bold text-purple-600">My Notes 📝</h1>
        <p className="text-xl text-gray-600">
          メモを共有して、みんなで知識を深めましょう！
        </p>
        <div className="space-y-4">
          <p className="text-gray-500">
            ✨ ログインすると以下のことができます：
          </p>
          <ul className="text-left space-y-2 text-gray-600">
            <li className="flex items-center">
              <span className="mr-2">📝</span>
              メモの作成と編集
            </li>
            <li className="flex items-center">
              <span className="mr-2">👥</span>
              みんなのメモを閲覧
            </li>
            <li className="flex items-center">
              <span className="mr-2">💡</span>
              アイデアの共有
            </li>
          </ul>
        </div>
        <SignInButton mode="modal">
          <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            ログインして始める
          </button>
        </SignInButton>
      </div>
    </div>
  );
} 