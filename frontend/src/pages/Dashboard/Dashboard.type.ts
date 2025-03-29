import { Dispatch, ElementType, SetStateAction } from "react";

export interface DashboardProps {
  greeting: string;
  greetingIcon: ElementType<keyof React.JSX.IntrinsicElements> | string;
  showAddGoalDialog: boolean;
  goalProgress: number;
  handleMoodSelect: (mood: string) => void;
  handleGoalToggle: (id: number) => void;
  handleAddGoal: () => void;
  handleDeleteGoal: (id: number) => void;
  setShowAddGoalDialog: Dispatch<SetStateAction<boolean>>;
  newGoalText: string;
  setNewGoalText: Dispatch<SetStateAction<string>>;
  completedGoals: number;
  goals: Goal[];
  
}

export interface MindfulnessSession {
  id: number;
  title: string;
  duration: string;
  icon: React.ElementType;
  image?: string;
  color: string;
}

export interface Goal {
  id: number;
  text: string;
  completed: boolean;
}
