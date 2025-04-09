import Faq from "@/components/landing/faq";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import Testimonials from "@/components/landing/testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero/>
      <Features />
      <Testimonials />
      <Faq />
      <Footer />
    </main>
  )
}
