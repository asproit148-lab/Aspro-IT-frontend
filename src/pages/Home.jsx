// src/pages/Home.jsx
import Companies from "../components/Companies";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import LearningExperience from "../components/LearningExperience";
import LiveLearning from "../components/LiveLearning";
import QualitiesSection from "../components/QualitiesSection";
import SubtleScroll from "../components/SubtleScroll";

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <Hero />
      <LearningExperience />
      <LiveLearning />
      <Companies />
      <SubtleScroll />
      <QualitiesSection />
      <Footer />
    </div>
  );
}
