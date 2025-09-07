import React, { useState } from "react";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Timetable from "./components/Timetable";
import OdCalculator from "./components/OdCalculator";

// Constants
export const TOTAL_OD_HOURS = 40;
export const TOTAL_OD_MINUTES = TOTAL_OD_HOURS * 60;
export const SLOT_MINUTES = 50;
export const TOTAL_SLOTS = Math.floor(TOTAL_OD_MINUTES / SLOT_MINUTES);

export default function App() {
  const [stage, setStage] = useState("welcome");
  const [welcomeDone, setWelcomeDone] = useState(false);

  const [register, setRegister] = useState("");
  const [password, setPassword] = useState("");

  const [timetable, setTimetable] = useState([]);
  const [history, setHistory] = useState([]);

  const [remainingMinutes, setRemainingMinutes] = useState(TOTAL_OD_MINUTES);
  const [remainingSlots, setRemainingSlots] = useState(TOTAL_SLOTS);

  // Handle stage change after welcome
  React.useEffect(() => {
    if (welcomeDone) {
      setTimeout(() => setStage("login"), 500);
    }
  }, [welcomeDone]);

  // Toggle between timetable and OD calculator
  const [activeTab, setActiveTab] = useState("timetable");

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-violet-900 to-indigo-900 text-white p-6 flex items-start justify-center">
      <div className="w-full max-w-6xl">
        {stage === "welcome" && <Welcome onComplete={() => setWelcomeDone(true)} />}
        {stage === "login" && (
          <Login
            register={register}
            setRegister={setRegister}
            password={password}
            setPassword={setPassword}
            onLogin={() => setStage("main")}
          />
        )}
        {stage === "main" && (
          <div>
            <div className="flex gap-4 mb-4">
              <button
                className={`px-4 py-2 rounded font-bold ${
                  activeTab === "timetable" ? "bg-purple-600" : "bg-neutral-700"
                }`}
                onClick={() => setActiveTab("timetable")}
              >
                Timetable
              </button>
              <button
                className={`px-4 py-2 rounded font-bold ${
                  activeTab === "od" ? "bg-purple-600" : "bg-neutral-700"
                }`}
                onClick={() => setActiveTab("od")}
              >
                OD Calculator
              </button>
            </div>

            {activeTab === "timetable" && (
              <Timetable timetable={timetable} setTimetable={setTimetable} />
            )}
            {activeTab === "od" && (
              <OdCalculator
                timetable={timetable}
                history={history}
                setHistory={setHistory}
                remainingMinutes={remainingMinutes}
                setRemainingMinutes={setRemainingMinutes}
                remainingSlots={remainingSlots}
                setRemainingSlots={setRemainingSlots}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
