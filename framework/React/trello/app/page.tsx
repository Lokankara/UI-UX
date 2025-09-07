import Image from "next/image";
import styles from "./page.module.css";
import { Navbar } from "@/components/ui/navbar";

export default function Home() {
  return (
<div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
  <Navbar />
</div>
  );
}
