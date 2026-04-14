import { FloatingNavbar } from "@/components/floating-navbar"

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-black">
      <FloatingNavbar />
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-white text-4xl">Features</h1>
      </div>
    </main>
  )
}
