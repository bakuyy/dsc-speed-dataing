"use client";
import AuthForm from "@/components/AuthForm";
import Image from "next/image";
import Footer from "../../public/images/login/footer.png"
import Header from "../../public/images/login/header.png"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <Image
      src={Header} alt="Header" 
      className="w-full h-1/5 absolute top-0 opacity-70"/>
      <AuthForm/>
      <Image
      src={Footer} alt="Footer" 
      className="w-full h-1/5 absolute bottom-0 opacity-70"/>
    </main>
  );
}