import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
    Activity,
    Dumbbell,
    Heart,
    Calendar,
    ChevronRight,
    Timer,
    Play,
    Plus,
    Droplets,
    Trophy,
    PlayCircle,
    Share2
} from "lucide-react";
import { useMeals } from "../../context/MealContext";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, SlideUp } from "../../lib/animations";

export const Page = (): JSX.Element => {
    const navigate = useNavigate();
    const { meals, totalCalories, totalProtein, waterIntake, updateWaterIntake, workouts } = useMeals();
    const { theme, colors, font } = useTheme();
    const [upcomingMeals, setUpcomingMeals] = useState<any[]>([]);

    // Get the current time and format as a number (e.g., 14:30 -> 14.5)
    const getCurrentTimeNumber = () => {
        const now = new Date();
        return now.getHours() + now.getMinutes() / 60;
    };

    // Function to convert time string to number (e.g., "2:30 PM" -> 14.5)
    const timeToNumber = (timeStr: string) => {
        const [time, period] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);

        if (period === 'PM' && hours !== 12) {
            hours += 12;
        } else if (period === 'AM' && hours === 12) {
            hours = 0;
        }

        return hours + minutes / 60;
    };

    // Get upcoming meals by filtering
    useEffect(() => {
        const currentTime = getCurrentTimeNumber();

        // Filter meals that are later in the day
        const upcoming = meals
            .filter(meal => {
                try {
                    return timeToNumber(meal.time) > currentTime;
                } catch (e) {
                    return false;
                }
            })
            .sort((a, b) => {
                try {
                    return timeToNumber(a.time) - timeToNumber(b.time);
                } catch (e) {
                    return 0;
                }
            })
            .slice(0, 3) // Take only the next 3 upcoming meals
            .map(meal => ({
                time: meal.time,
                name: meal.name,
                description: meal.foods.join(", "),
                calories: meal.calories
            }));

        setUpcomingMeals(upcoming);

        // If no upcoming meals, show recommendations
        if (upcoming.length === 0) {
            setUpcomingMeals([
                { time: "12:30 PM", name: "Lunch", description: "Grilled chicken and vegetables", calories: 450 },
                { time: "4:00 PM", name: "Snack", description: "Greek yogurt with berries", calories: 200 },
                { time: "7:30 PM", name: "Dinner", description: "Salmon with quinoa", calories: 550 }
            ]);
        }
    }, [meals]);

    // Get enrolled workouts
    const enrolledWorkouts = workouts.filter(workout => workout.enrolled);

    // Use top workouts if none enrolled
    const activeWorkouts = enrolledWorkouts.length > 0
        ? enrolledWorkouts
        : workouts.slice(0, 3);

    const quickActions = [
        { icon: <Heart className="h-6 w-6" />, label: "Nutrition", path: "/meal-logger" },
        { icon: <Activity className="h-6 w-6" />, label: "Progress", path: "/progress" },
        { icon: <Dumbbell className="h-6 w-6" />, label: "Workouts", path: "/workouts" },
        { icon: <Share2 className="h-6 w-6" />, label: "Community", path: "/community" }
    ];

    const playerStats = [
        {
            label: "Calories",
            value: totalCalories.toLocaleString(),
            target: "2,000",
            color: "bg-primary/10",
            progress: Math.min(totalCalories / 2000, 1) * 100,
            icon: <Heart className="h-5 w-5 text-primary" />
        },
        {
            label: "Protein",
            value: `${totalProtein}g`,
            target: "120g",
            color: "bg-secondary/10",
            progress: Math.min(totalProtein / 120, 1) * 100,
            icon: <Dumbbell className="h-5 w-5 text-secondary" />
        },
        {
            label: "Hydration",
            value: `${waterIntake}L`,
            target: "2.5L",
            color: "bg-accent/10",
            progress: Math.min(waterIntake / 2.5, 1) * 100,
            onClick: () => {
                // Increment water intake by 0.25L when clicked
                updateWaterIntake(Math.min(waterIntake + 0.25, 2.5));
            },
            icon: <Droplets className="h-5 w-5 text-accent" />
        }
    ];

    return (
        <div
            className="min-h-screen bg-background text-foreground pb-24 transition-colors duration-300"
            style={{ fontFamily: font.body }}
        >
            {/* Header */}
            <motion.header
                className="bg-card shadow-md border-b border-border"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="max-w-lg mx-auto">
                    <div className="px-4 py-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{
                                    rotate: [0, 5, 0, -5, 0]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    repeatDelay: 5,
                                    duration: 0.5
                                }}
                            >
                                <Activity className="h-7 w-7 text-primary" />
                            </motion.div>
                            <div>
                                <h1
                                    className="text-2xl font-bold tracking-tight text-gradient"
                                    style={{
                                        fontFamily: font.heading,
                                        background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                >
                                    PULSE
                                </h1>
                                <p className="text-xs text-muted-foreground">Health & Fitness</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate("/profile")}
                            className="relative"
                        >
                            <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
                            <img
                                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                                alt="Profile"
                                className="w-9 h-9 rounded-full object-cover border-2 border-background"
                            />
                        </Button>
                    </div>
                </div>
            </motion.header>

            <main className="w-full px-4 py-6 md:px-6 space-y-6">
                {/* Quick Actions */}
                <FadeIn>
                    <div className="grid grid-cols-4 gap-4">
                        {quickActions.map((action, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant="outline"
                                    className="flex flex-col items-center gap-2 h-auto py-4 w-full bg-card hover:bg-primary/5 border border-primary/10"
                                    onClick={() => navigate(action.path)}
                                >
                                    <motion.div
                                        animate={{ y: [0, -3, 0] }}
                                        transition={{
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                            duration: 1.5,
                                            delay: index * 0.2
                                        }}
                                    >
                                        {action.icon}
                                    </motion.div>
                                    <span
                                        className="text-xs"
                                        style={{ fontFamily: font.heading }}
                                    >
                                        {action.label}
                                    </span>
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </FadeIn>

                {/* Nutrition Stats */}
                <section>
                    <h2
                        className="text-lg font-semibold mb-3 flex items-center gap-2"
                        style={{ fontFamily: font.heading }}
                    >
                        <Trophy className="h-5 w-5 text-primary" />
                        Nutrition Stats
                    </h2>
                    <div className="dashboard-grid">
                        {playerStats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card
                                    className={`card-hover cursor-pointer ${stat.color} border border-primary/10`}
                                    onClick={stat.onClick || (() => navigate('/progress'))}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-full bg-background">
                                                    {stat.icon}
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                                    <p
                                                        className="text-2xl font-semibold"
                                                        style={{ fontFamily: font.heading }}
                                                    >
                                                        {stat.value}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-muted-foreground">Target</p>
                                                <p className="text-lg">{stat.target}</p>
                                            </div>
                                        </div>

                                        {/* Progress bar */}
                                        <div className="mt-4 h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full"
                                                style={{
                                                    background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
                                                    width: `${stat.progress}%`
                                                }}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${stat.progress}%` }}
                                                transition={{ duration: 1 }}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Current Workout Plan */}
                <SlideUp>
                    <section>
                        <div className="flex items-center justify-between mb-3">
                            <h2
                                className="text-lg font-semibold flex items-center gap-2"
                                style={{ fontFamily: font.heading }}
                            >
                                <Dumbbell className="h-5 w-5 text-primary" />
                                Your Workout Plan
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate('/workouts')}
                                className="text-xs"
                            >
                                View All
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>

                        <div className="dashboard-grid">
                            {activeWorkouts.map((workout, index) => (
                                <motion.div
                                    key={workout.id}
                                    whileHover={{ y: -5 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card
                                        className="overflow-hidden border-primary/10 h-full cursor-pointer"
                                        onClick={() => navigate('/workouts')}
                                    >
                                        <div className="relative h-32 overflow-hidden">
                                            <img
                                                src={workout.image}
                                                alt={workout.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                                                <p className="text-white font-medium">
                                                    {workout.title}
                                                </p>
                                            </div>
                                            <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm py-1 px-2 rounded-full text-xs font-medium">
                                                {workout.duration}
                                            </div>
                                        </div>
                                        <CardContent className="p-3">
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-muted-foreground">
                                                    {workout.difficulty} • {workout.calories} cal
                                                </div>
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    className="h-8 w-8 rounded-full p-0"
                                                >
                                                    <Play className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </SlideUp>

                {/* Upcoming Meals */}
                <SlideUp delay={0.3}>
                    <section>
                        <div className="flex items-center justify-between mb-3">
                            <h2
                                className="text-lg font-semibold flex items-center gap-2"
                                style={{ fontFamily: font.heading }}
                            >
                                <Calendar className="h-5 w-5 text-primary" />
                                Upcoming Meals
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate('/meal-logger')}
                                className="text-xs"
                            >
                                View All
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {upcomingMeals.map((meal, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card
                                        className="cursor-pointer hover:bg-muted/20 transition-colors card-hover border border-primary/10"
                                        onClick={() => navigate('/meal-logger')}
                                    >
                                        <CardContent className="p-4 flex items-center gap-4">
                                            <div className={`p-3 rounded-full flex-shrink-0 ${index === 0 ? 'bg-primary/20' :
                                                index === 1 ? 'bg-secondary/20' :
                                                    'bg-accent/20'
                                                }`}>
                                                <Heart className={`h-6 w-6 ${index === 0 ? 'text-primary' :
                                                    index === 1 ? 'text-secondary' :
                                                        'text-accent'
                                                    }`} />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between">
                                                    <p
                                                        className="font-semibold"
                                                        style={{ fontFamily: font.heading }}
                                                    >
                                                        {meal.name}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">{meal.time}</p>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">{meal.description}</p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {meal.calories} calories
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}

                            {upcomingMeals.length === 0 && (
                                <Card className="border-dashed border-border">
                                    <CardContent className="p-6 flex flex-col items-center justify-center">
                                        <p className="text-muted-foreground text-center mb-4">No upcoming meals scheduled</p>
                                        <Button onClick={() => navigate('/meal-logger')}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Meal
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </section>
                </SlideUp>
            </main>
        </div>
    );
};
