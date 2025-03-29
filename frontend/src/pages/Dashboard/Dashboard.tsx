import { useState, useEffect } from "react";
import { initialGoals } from "./Dashboard.data";
import { Goal } from "./Dashboard.type";
import DashboardView from "./Dashboard.view";
import { CheckUserResponse, User } from "@/components/Header/Header.type";
import { AxiosError } from "axios";
import { client } from "@/config/axiosClient";
import { toast } from "sonner";

export default function Dashboard() {
  const [greeting, setGreeting] = useState("Selamat Datang");
  const [user, setUser] = useState<User | null>(null);
  const [greetingIcon, setGreetingIcon] = useState<
    "sunrise" | "sun" | "sunset"
  >("sun");
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [completedGoals, setCompletedGoals] = useState(
    goals.filter((g) => g.completed).length
  );
  const [newGoalText, setNewGoalText] = useState("");
  const [showAddGoalDialog, setShowAddGoalDialog] = useState(false);

  const goalProgress =
    goals.length > 0 ? Math.round((completedGoals / goals.length) * 100) : 0;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Selamat Pagi");
      setGreetingIcon("sunrise");
    } else if (hour < 18) {
      setGreeting("Selamat Siang");
      setGreetingIcon("sun");
    } else {
      setGreeting("Selamat Malam");
      setGreetingIcon("sunset");
    }
  }, []);

  const handleMoodSelect = (mood: string) => {
    console.log("Mood selected:", mood);
  };

  const handleGoalToggle = (id: number) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updatedGoals);
    setCompletedGoals(updatedGoals.filter((g) => g.completed).length);
  };

  const handleAddGoal = () => {
    if (!newGoalText.trim()) return;
    const newGoal: Goal = {
      id: Date.now(),
      text: newGoalText,
      completed: false,
    };
    setGoals((prev) => [...prev, newGoal]);
    setNewGoalText("");
    setShowAddGoalDialog(false);
  };

  const fetchUser = async () => {
    try {
      const data: CheckUserResponse = (await client().get("/auth/check")).data;
      setUser(data.user);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status == 401 || error.status == 403) {
          setUser(null);
          return;
        }
        console.log(error.message);
        toast(error.message);
      }
    }
  };

  const handleDeleteGoal = (id: number) => {
    const updatedGoals = goals.filter((goal) => goal.id !== id);
    setGoals(updatedGoals);
    setCompletedGoals(updatedGoals.filter((g) => g.completed).length);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  document.title = "Dashboard - Mental Health App";

  return (
    <DashboardView
      greeting={greeting}
      greetingIcon={greetingIcon}
      showAddGoalDialog={showAddGoalDialog}
      goalProgress={goalProgress}
      handleMoodSelect={handleMoodSelect}
      handleGoalToggle={handleGoalToggle}
      handleAddGoal={handleAddGoal}
      handleDeleteGoal={handleDeleteGoal}
      setShowAddGoalDialog={setShowAddGoalDialog}
      newGoalText={newGoalText}
      setNewGoalText={setNewGoalText}
      completedGoals={completedGoals}
      goals={goals}
      user={user}
    />
  );
}
