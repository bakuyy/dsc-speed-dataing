import LoginPage from "./login/page";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-4">
        <LoginPage/>
      </div>
    </main>
  );
}