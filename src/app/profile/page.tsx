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
      <form action={handleUpdate} className="space-y-4">
        <div className="space-y-2 flex gap-4 justify-between items-center">
          <label className="block">
            <span className="text-sm text-gray-600">名前（firstName）</span>
            <input
              type="text"
              name="firstName"
              defaultValue={user.firstName ?? ""}
              className="border rounded p-2 w-full"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-600">苗字（lastName）</span>
            <input
              type="text"
              name="lastName"
              defaultValue={user.lastName ?? ""}
              className="border rounded p-2 w-full"
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          保存する
        </button>
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
