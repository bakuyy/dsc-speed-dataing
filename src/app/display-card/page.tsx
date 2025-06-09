import DisplayCard from "./MatchDisplay";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MatchPage() {
  return (
    <main className="min-h-screen bg-[#A6C3EA]">
      <Navbar />
      <DisplayCard />
      <Footer />
    </main>
  )
}