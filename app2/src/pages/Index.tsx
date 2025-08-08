import {useState} from "react";
import {MoodSelector} from "@/components/MoodSelector";
import {EmotionalHistory} from "@/components/EmotionalHistory";
import {MoodCalendar} from "@/components/MoodCalendar";
import {Profile} from "@/components/Profile";
import {Navigation} from "@/components/Navigation";
import "@fontsource/raleway/300.css";
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/500.css";
import "@fontsource/raleway/600.css";
import {Relief} from "@/components/Relief.tsx";

const Index = () => {
  const [currentView, setCurrentView] = useState("home");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    // Here you would typically save the mood to a database
    console.log("Mood selected:", mood);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return <MoodSelector onMoodSelect={handleMoodSelect} selectedMood={selectedMood}/>;
      case "history":
        return <EmotionalHistory/>;
      case "calendar":
        return <MoodCalendar/>;
      case "profile":
        return <Profile onDesahogoClick={() => setCurrentView("relief")} />;
      case "relief":
        return <Relief onBack={() => setCurrentView("profile")} />;
      default:
        return <MoodSelector onMoodSelect={handleMoodSelect} selectedMood={selectedMood}/>;
    }
  };

  return (
      <div className="cosmic-bg min-h-screen pt-16 pb-24 px-6">
        <div className="relative" style={{fontFamily: 'Raleway', fontWeight: 300}}>
          {renderCurrentView()}
          <Navigation currentView={currentView} onViewChange={setCurrentView}/>
        </div>
      </div>
  );
};

export default Index;
