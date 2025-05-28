"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { login } from "@/store/loginTokenSlice";
import { sendSignInInfo } from "@/utils/apiCalls";
import { useRouter, useSearchParams } from "next/navigation";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useSearchParams();
  const returnTo = params?.get("return") ?? "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await sendSignInInfo({ email, password, secretKey });
      dispatch(
        login({
          name: data.name,
          token: data.accessToken,
          role: data.role,
        })
      );
      router.replace(returnTo);
    } catch (e: any) {
      setError("Invalid email or password");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <AuthForm/>
    </main>
  );
}