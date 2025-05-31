"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { login } from "@/store/loginTokenSlice";
import { sendSignInInfo } from "@/utils/apiCalls";
import { useRouter } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";
import Logo from "../../public/images/logo.png";
import Image from "next/image";

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
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 ">
      <Image src={Logo} alt="Logo" className="w-3/4 h-auto"/>
      <div>
      <div className="text-3xl font-plus-jakarta-sans max-w-sm text-center">Log in</div>
      <p className="text-md font-plus-jakarta-sans max-w-xs text-center italic">DSC Account + Event Password</p>
      
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs">
        <input
          type="email"
          required
          placeholder="email"
          className="border p-2 rounded-full pl-6 font-plus-jakarta-sans"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="password"
          className="border p-2 rounded-full pl-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="event key"
          className="border border-2 border-[#374995] p-2 rounded-full pl-6 bg-gradient-to-r from-[#374995] to-[#5989fc] text-white
          focus:outline-none focus:ring-2 focus:ring-[#374995] focus:ring-opacity-50 
          focus:border-[#374995] focus:shadow-[0_0_15px_rgba(55,73,149,0.3)]
          transition-all duration-300 ease-in-out
          hover:shadow-[0_0_10px_rgba(163,192,232,0.3)]"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />
        <div className="text-xs font-plus-jakarta-sans max-w-xs text-center italic">ask organizers for event key</div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="rounded p-1 text-[#374995] transition-all duration-300 ease-in-out flex items-center gap-2 justify-center underline flex hover:text-blue-500 cursor-pointer"
        >
          continue 
          <FaArrowRightLong/>
        </button>

      </form>
    </main>
  );
}