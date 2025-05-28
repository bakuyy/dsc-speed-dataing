"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { login } from "@/store/loginTokenSlice";
import { sendSignInInfo } from "@/utils/apiCalls";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    console.log(`[Login Attempt] Email: ${email}`);

    try {
      const { data } = await sendSignInInfo({ email, password, secretKey });
      console.log(`[Login Success] User: ${data.name}, Role: ${data.role}`);
      
      dispatch(
        login({
          name: data.name,
          token: data.accessToken,
          role: data.role,
        })
      );
      router.push('/home');
    } catch (e: any) {
      console.error(`[Login Failed] Email: ${email}, Error: ${e.message}`);
      setError("Invalid email or password");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs">
        <input
          type="email"
          required
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Secret key"
          className="border p-2 rounded"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-black text-white rounded p-2 hover:bg-gray-800 flex items-center gap-2 justify-center"
        >
          <FaArrowRight/>
          
        </button>
      </form>
    </main>
  );
}