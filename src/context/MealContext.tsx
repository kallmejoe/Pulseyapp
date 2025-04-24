import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define meal type
export interface Meal {
  id: string;
  time: string;
  name: string;
  foods: string[];
  calories: number;
}

export interface Workout {
  id: string;
  title: string;
  duration: string;
  difficulty: string;
  calories: string;
  exercises: string[];
  image: string;
  enrolled: boolean;
  completedCount: number;
}

export interface Community {
  id: string;
  name: string;
  members: number;
  description: string;
  challenges: Challenge[];
  joined: boolean;
  image: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  rewards: string;
  participants: number;
  endDate: string;
  progress: number;
  enrolled: boolean;
}

// Define weekly data type for analytics
export interface DailyStats {
  day: string;
  calories: number;
  target: number;
  date: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  completed: boolean;
}

// Define context type
interface AppContextType {
  meals: Meal[];
  addMeal: (meal: Omit<Meal, 'id'>) => void;
  updateMeal: (id: string, meal: Omit<Meal, 'id'>) => void;
  deleteMeal: (id: string) => void;
  totalCalories: number;
  totalProtein: number;
  waterIntake: number;
  updateWaterIntake: (amount: number) => void;
  weeklyStats: DailyStats[];
  achievements: Achievement[];
  workouts: Workout[];
  toggleWorkoutEnrollment: (id: string) => void;
  completeWorkout: (id: string) => void;
  communities: Community[];
  joinCommunity: (id: string) => void;
  leaveCommunity: (id: string) => void;
  enrollInChallenge: (communityId: string, challengeId: string) => void;
  updateChallengeProgress: (communityId: string, challengeId: string, progress: number) => void;
}

// Create context with default values
const AppContext = createContext<AppContextType>({
  meals: [],
  addMeal: () => {},
  updateMeal: () => {},
  deleteMeal: () => {},
  totalCalories: 0,
  totalProtein: 0,
  waterIntake: 0,
  updateWaterIntake: () => {},
  weeklyStats: [],
  achievements: [],
  workouts: [],
  toggleWorkoutEnrollment: () => {},
  completeWorkout: () => {},
  communities: [],
  joinCommunity: () => {},
  leaveCommunity: () => {},
  enrollInChallenge: () => {},
  updateChallengeProgress: () => {},
});

export const useAppContext = () => useContext(AppContext);

// Add a useMeals alias for backward compatibility
export const useMeals = useAppContext;

interface AppProviderProps {
  children: ReactNode;
}

// Renamed from MealProvider to AppProvider for broader scope
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Initialize meals from localStorage if available
  const [meals, setMeals] = useState<Meal[]>(() => {
    const savedMeals = localStorage.getItem('meals');
    return savedMeals ? JSON.parse(savedMeals) : [
      {
        id: "1",
        time: "8:00 AM",
        name: "Breakfast",
        foods: ["Oatmeal", "Banana", "Coffee"],
        calories: 350,
      },
      {
        id: "2",
        time: "1:00 PM",
        name: "Lunch",
        foods: ["Grilled Chicken Salad", "Apple"],
        calories: 450,
      },
    ];
  });

  // Initialize workouts
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    const savedWorkouts = localStorage.getItem('workouts');
    return savedWorkouts ? JSON.parse(savedWorkouts) : [
      {
        id: "1",
        title: "Full Body Strength",
        duration: "45 min",
        difficulty: "Intermediate",
        calories: "400-500",
        exercises: ["Squats", "Push-ups", "Deadlifts", "Planks"],
        image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg",
        enrolled: false,
        completedCount: 0
      },
      {
        id: "2",
        title: "HIIT Cardio",
        duration: "30 min",
        difficulty: "Advanced",
        calories: "300-400",
        exercises: ["Burpees", "Mountain Climbers", "Jump Rope", "High Knees"],
        image: "https://images.pexels.com/photos/999309/pexels-photo-999309.jpeg",
        enrolled: false,
        completedCount: 0
      },
      {
        id: "3",
        title: "Yoga Flow",
        duration: "60 min",
        difficulty: "Beginner",
        calories: "200-250",
        exercises: ["Downward Dog", "Warrior Pose", "Child's Pose", "Sun Salutation"],
        image: "https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg",
        enrolled: false,
        completedCount: 0
      }
    ];
  });

  // Initialize communities
  const [communities, setCommunities] = useState<Community[]>(() => {
    const savedCommunities = localStorage.getItem('communities');
    return savedCommunities ? JSON.parse(savedCommunities) : [
      {
        id: "1",
        name: "Weight Loss Warriors",
        members: 1243,
        description: "Community focused on healthy and sustainable weight loss",
        image: "https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg",
        joined: false,
        challenges: [
          {
            id: "101",
            title: "10k Steps Challenge",
            description: "Complete 10,000 steps every day for a week",
            rewards: "50 Fitness Points",
            participants: 387,
            endDate: "2025-05-15",
            progress: 0,
            enrolled: false
          },
          {
            id: "102",
            title: "Calorie Deficit Month",
            description: "Maintain a 500 calorie deficit daily for 30 days",
            rewards: "100 Fitness Points + Badge",
            participants: 215,
            endDate: "2025-05-30",
            progress: 0,
            enrolled: false
          }
        ]
      },
      {
        id: "2",
        name: "Muscle Builders",
        members: 876,
        description: "For those looking to gain muscle and strength",
        image: "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg",
        joined: false,
        challenges: [
          {
            id: "201",
            title: "100 Push-up Challenge",
            description: "Work up to 100 push-ups in a single session",
            rewards: "75 Fitness Points + Protein Sample",
            participants: 156,
            endDate: "2025-05-20",
            progress: 0,
            enrolled: false
          }
        ]
      },
      {
        id: "3",
        name: "Mindful Eaters",
        members: 654,
        description: "Focus on mindful eating and healthy nutrition habits",
        image: "https://images.pexels.com/photos/5749148/pexels-photo-5749148.jpeg",
        joined: false,
        challenges: [
          {
            id: "301",
            title: "Meal Prep Master",
            description: "Prepare all meals for 5 days straight",
            rewards: "Digital Cookbook",
            participants: 98,
            endDate: "2025-05-25",
            progress: 0,
            enrolled: false
          }
        ]
      }
    ];
  });

  // Track nutritional stats
  const [waterIntake, setWaterIntake] = useState<number>(() => {
    const savedWaterIntake = localStorage.getItem('waterIntake');
    return savedWaterIntake ? parseFloat(savedWaterIntake) : 1.5;
  });

  // Calculate total calories
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  // Simulate protein calculation (in real app, this would be more sophisticated)
  const totalProtein = Math.round(totalCalories * 0.15 / 4); // Estimating protein as 15% of calories

  // Generate weekly stats based on meals and current date
  const [weeklyStats, setWeeklyStats] = useState<DailyStats[]>(() => {
    const savedWeeklyStats = localStorage.getItem('weeklyStats');

    if (savedWeeklyStats) {
      return JSON.parse(savedWeeklyStats);
    }

    // Generate last 7 days of data
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const stats: DailyStats[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayName = days[date.getDay()];
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

      // Random calories between 1500-2300 (would be actual data in real app)
      const randomCalories = Math.floor(Math.random() * 800) + 1500;

      stats.push({
        day: dayName,
        date: dateStr,
        calories: randomCalories,
        target: 2000
      });
    }

    return stats;
  });

  // Define achievements
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const savedAchievements = localStorage.getItem('achievements');
    return savedAchievements ? JSON.parse(savedAchievements) : [
      {
        id: "1",
        title: "7-Day Streak",
        description: "Logged meals for 7 days straight",
        progress: 5,
        total: 7,
        completed: false
      },
      {
        id: "2",
        title: "Protein Champion",
        description: "Hit protein goals 5 days in a row",
        progress: 3,
        total: 5,
        completed: false
      },
      {
        id: "3",
        title: "Water Warrior",
        description: "Met daily water intake goal",
        progress: 4,
        total: 5,
        completed: false
      },
      {
        id: "4",
        title: "Workout Warrior",
        description: "Complete 10 workouts",
        progress: 0,
        total: 10,
        completed: false
      },
      {
        id: "5",
        title: "Community Leader",
        description: "Join 3 community challenges",
        progress: 0,
        total: 3,
        completed: false
      }
    ];
  });

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem('waterIntake', waterIntake.toString());
  }, [waterIntake]);

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem('communities', JSON.stringify(communities));
  }, [communities]);

  useEffect(() => {
    localStorage.setItem('weeklyStats', JSON.stringify(weeklyStats));
  }, [weeklyStats]);

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  // Update weekly stats whenever meals change
  useEffect(() => {
    // In a real application, this would correctly map meals to their dates
    // For demo purposes, we'll just update today's calories based on totalCalories
    setWeeklyStats(prev => {
      const newStats = [...prev];
      // Find today's index
      const today = new Date();
      const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      const todayIndex = newStats.findIndex(stat => stat.date === dateStr);

      if (todayIndex !== -1) {
        newStats[todayIndex] = {
          ...newStats[todayIndex],
          calories: totalCalories
        };
      }

      return newStats;
    });
  }, [totalCalories]);

  // Meal functions
  const addMeal = (meal: Omit<Meal, 'id'>) => {
    const newMeal = {
      id: Date.now().toString(),
      ...meal,
    };
    setMeals([...meals, newMeal]);
  };

  const updateMeal = (id: string, updatedMeal: Omit<Meal, 'id'>) => {
    setMeals(
      meals.map((meal) =>
        meal.id === id
          ? { ...meal, ...updatedMeal }
          : meal
      )
    );
  };

  const deleteMeal = (id: string) => {
    setMeals(meals.filter((meal) => meal.id !== id));
  };

  const updateWaterIntake = (amount: number) => {
    setWaterIntake(amount);
  };

  // Workout functions
  const toggleWorkoutEnrollment = (id: string) => {
    setWorkouts(prev =>
      prev.map(workout =>
        workout.id === id ? { ...workout, enrolled: !workout.enrolled } : workout
      )
    );

    // Update achievement progress for enrolling in workouts
    updateAchievementProgress("4", workouts.filter(w => w.enrolled).length + (workouts.find(w => w.id === id)?.enrolled ? -1 : 1));
  };

  const completeWorkout = (id: string) => {
    setWorkouts(prev =>
      prev.map(workout =>
        workout.id === id ? { ...workout, completedCount: workout.completedCount + 1 } : workout
      )
    );

    // Update workout warrior achievement
    const totalCompleted = workouts.reduce((sum, w) => sum + w.completedCount, 0) + 1;
    updateAchievementProgress("4", totalCompleted);
  };

  // Community functions
  const joinCommunity = (id: string) => {
    setCommunities(prev =>
      prev.map(community =>
        community.id === id ? { ...community, joined: true } : community
      )
    );
  };

  const leaveCommunity = (id: string) => {
    setCommunities(prev =>
      prev.map(community =>
        community.id === id ? { ...community, joined: false } : community
      )
    );
  };

  const enrollInChallenge = (communityId: string, challengeId: string) => {
    setCommunities(prev =>
      prev.map(community =>
        community.id === communityId ? {
          ...community,
          challenges: community.challenges.map(challenge =>
            challenge.id === challengeId ? { ...challenge, enrolled: true } : challenge
          )
        } : community
      )
    );

    // Update community leader achievement
    const totalEnrolled = communities.flatMap(c => c.challenges).filter(ch => ch.enrolled).length + 1;
    updateAchievementProgress("5", totalEnrolled);
  };

  const updateChallengeProgress = (communityId: string, challengeId: string, progress: number) => {
    setCommunities(prev =>
      prev.map(community =>
        community.id === communityId ? {
          ...community,
          challenges: community.challenges.map(challenge =>
            challenge.id === challengeId ? { ...challenge, progress } : challenge
          )
        } : community
      )
    );
  };

  // Helper function to update achievement progress
  const updateAchievementProgress = (id: string, progress: number) => {
    setAchievements(prev =>
      prev.map(achievement => {
        if (achievement.id === id) {
          const updatedProgress = Math.min(progress, achievement.total);
          const completed = updatedProgress >= achievement.total;
          return {
            ...achievement,
            progress: updatedProgress,
            completed
          };
        }
        return achievement;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        meals,
        addMeal,
        updateMeal,
        deleteMeal,
        totalCalories,
        totalProtein,
        waterIntake,
        updateWaterIntake,
        weeklyStats,
        achievements,
        workouts,
        toggleWorkoutEnrollment,
        completeWorkout,
        communities,
        joinCommunity,
        leaveCommunity,
        enrollInChallenge,
        updateChallengeProgress
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
