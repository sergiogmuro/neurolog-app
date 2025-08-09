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

  const renderCurrentView = () => {
    switch (currentView) {
      case "history":
        return <EmotionalHistory/>;
      case "calendar":
        return <MoodCalendar/>;
      case "profile":
        return <Profile onDesahogoClick={() => setCurrentView("relief")}/>;
      case "relief":
        return <Relief onBack={() => setCurrentView("profile")}/>;
      case "home":
      default:
        return <MoodSelector/>;
    }
  };

  return (
      <div className="cosmic-bg min-h-screen pt-6 pb-24 px-6">
        <div className="relative" style={{fontFamily: 'Raleway', fontWeight: 300}}>
          {renderCurrentView()}
          <Navigation currentView={currentView} onViewChange={setCurrentView}/>
        </div>
      </div>
  );
};

export default Index;
