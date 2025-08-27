import {useEffect, useState} from "react";
import {MoodSelector} from "@/components/MoodSelector";
import {EmotionalHistory} from "@/components/EmotionalHistory";
import {MoodCalendar} from "@/components/MoodCalendar";
import {Profile} from "@/components/Profile";
import {Navigation} from "@/components/Navigation";
import "@fontsource/raleway/300.css";
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/500.css";
import "@fontsource/raleway/600.css";
import {Relief} from "@/components/relief/Relief.tsx";
import {Login} from "@/components/Login";
import {getAnonId, requestAnonId} from "@/api/InitSession.tsx";
import LoadingPage from "@/pages/LoadingPage.tsx";
import {Home} from "@/components/Home.tsx";

const Index = () => {
  const [currentView, setCurrentView] = useState("login");
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [anonId, setAnonId] = useState<string | null>(null);
  const [moodId, setMoodId] = useState<number>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (user: any) => {
    setUserData(user);
    setIsLoggedIn(true);
    setCurrentView("profile");
  };

  const handleLogout = () => {
    setUserData(null);
    setIsLoggedIn(false);
    setCurrentView("profile");
  }

  useEffect(() => {
    setIsLoading(true)
    setAnonId(getAnonId);
    if (!anonId) {
      requestAnonId().then(setAnonId)
    }
  }, []);

  useEffect(() => {
    if (anonId) {
      setIsLoading(false)
    }
  }, [anonId]);

  useEffect(() => {
    if (moodId) {
      setCurrentView('history')
    }
  }, [moodId]);

  if (!anonId) {
    return <LoadingPage/>
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "history":
        return <EmotionalHistory/>;
      case "calendar":
        return <MoodCalendar/>;
      case "profile":
        if (!isLoggedIn) {
          return <Login onLogin={handleLogin}/>;
        } else {
          return <Profile
              onReliefClick={() => setCurrentView("relief")}
              userData={userData}
              onLogout={handleLogout}
          />
        }
      case "relief":
        return <Relief />;
      case "mood":
        return <MoodSelector setMoodId={setMoodId}/>;
      case "home":
      default:
        return <Home setMoodId={setMoodId}/>;
    }
  };

  return (
      <div className="cosmic-bg min-h-screen pt-6 pb-24 px-6 content-center">
        <div className="relative" style={{fontFamily: 'Raleway', fontWeight: 300}}>
          {renderCurrentView()}
          {currentView == "login" || currentView !== "home" &&
              <Navigation currentView={currentView} onViewChange={setCurrentView}/>
          }
        </div>
      </div>
  );
};

export default Index;
