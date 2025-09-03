import HeroSection from "../components/HeroSection";
import AvailableDonationsList from "../components/AvailableDonationsList";
import HowItWorksSection from "../components/HowItWorksSection";

export default function Home() {
  return (
    <div className="max-w-2xl md:max-w-3xl mx-auto p-6 font-sans">
      {HeroSection()}

      {AvailableDonationsList()}

      {HowItWorksSection()}
    </div>
  );
}
