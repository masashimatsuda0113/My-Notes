import { SignInButton } from "@clerk/nextjs";

export default function LoginPrompt() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white p-4">
      <div className="max-w-lg w-full text-center space-y-6 md:space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-600">みんなのメモ帳</h1>
        <p className="text-lg md:text-xl text-gray-600 px-4">
          メモを共有して、<br className="sm:hidden" />みんなで知識を深めましょう！
        </p>
        <div className="space-y-3 md:space-y-4">
          <p className="text-gray-500 text-sm md:text-base">
            ログインすると以下のことができます：
          </p>
          <ul className="text-left space-y-3 text-gray-600 text-sm md:text-base">
            <li className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <span className="mr-3 text-xl">📝</span>
              <div>
                <p className="font-medium">メモの作成と編集</p>
                <p className="text-xs text-gray-400 mt-0.5">自由にメモを書いて管理できます</p>
              </div>
            </li>
            <li className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <span className="mr-3 text-xl">👥</span>
              <div>
                <p className="font-medium">みんなのメモを閲覧</p>
                <p className="text-xs text-gray-400 mt-0.5">他の人のメモから学びましょう</p>
              </div>
            </li>
          </ul>
        </div>
        <SignInButton mode="modal">
          <button className="w-full md:w-auto px-6 md:px-8 py-2 md:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm md:text-base">
            ログインして始める
          </button>
        </SignInButton>
      </div>
    </div>
  );
} 