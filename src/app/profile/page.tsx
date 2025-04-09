// src/app/profile/page.tsx

import { currentUser } from "@clerk/nextjs/server";
import { updateUserName } from "./actions";
import { revalidatePath } from "next/cache";
import LoginPrompt from "@/components/LoginPrompt";

export default async function ProfilePage() {
  const user = await currentUser();
  if (!user) return <LoginPrompt />;

  async function handleUpdate(formData: FormData) {
    "use server";
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    await updateUserName(firstName, lastName);
    revalidatePath("/profile");
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">プロフィール</h1>
      <form action={handleUpdate} className="space-y-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">名前</span>
                <input
                  type="text"
                  name="firstName"
                  defaultValue={user.firstName ?? ""}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="名前を入力"
                />
              </label>
            </div>
            <div className="space-y-2">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">苗字</span>
                <input
                  type="text"
                  name="lastName"
                  defaultValue={user.lastName ?? ""}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="苗字を入力"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
          >
            <span className="mr-2">💾</span>
            保存する
          </button>
        </div>
      </form>

      <div className="mt-6 space-y-2 bg-white shadow p-4 rounded">
        <p>
          <strong>現在の名前：</strong>
          {user.firstName} {user.lastName}
        </p>
        <p>
          <strong>メール：</strong>
          {user.emailAddresses[0]?.emailAddress}
        </p>
      </div>
    </main>
  );
}
