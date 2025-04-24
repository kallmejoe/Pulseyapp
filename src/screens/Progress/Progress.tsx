import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
    ArrowLeft,
    TrendingUp,
    Trophy,
    Award,
    Flame,
    Activity,
    Apple,
    Droplets,
    Calendar,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import { useMeals } from "../../context/MealContext";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

// Generate sample date for a date (for demo purposes)
const generateDataForDate = (date: Date, baseValue: number = 2000) => {
    // Use the date components to generate a consistent random number
    const day = date.getDate();
    const month = date.getMonth();

    // Generate somewhat random but consistent data based on the date
    const multiplier = 0.5 + (Math.sin(day + month) + 1) / 4;

    return {
        calories: Math.round(baseValue * multiplier),
        protein: Math.round(120 * multiplier),
        carbs: Math.round(250 * multiplier),
        fat: Math.round(65 * multiplier),
        water: Math.round(25 * multiplier) / 10,
        steps: Math.round(10000 * multiplier),
        workoutMinutes: Math.round(60 * multiplier)
    };
};

interface StatsCardProps {
    title: string;
    value: string | number;
    target: string | number;
    icon: React.ReactNode;
    color: string;
    progress: number;
    trend?: string;
    unit?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
    title,
    value,
    target,
    icon,
    color,
    progress,
    trend,
    unit
}) => {
    const { colors } = useTheme();

    return (
        <Card className="overflow-hidden">
            <div
                className="h-1"
                style={{
                    background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`
                }}
            ></div>
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${color}`}>
                            {icon}
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold">{value}</span>
                                {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
                            </div>
                        </div>
                    </div>
                    {trend && (
                        <div className={`text-sm font-medium px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                            {trend}
                        </div>
                    )}
                </div>

                <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{Math.round(progress)}% of {target}{unit}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export const Progress = (): JSX.Element => {
    const navigate = useNavigate();
    const { totalCalories, totalProtein, waterIntake, meals } = useMeals();
    const { colors, theme, visualsMode } = useTheme();

    // State variables for dynamic analytics
    const [timeFrame, setTimeFrame] = useState<'day' | 'week' | 'month'>('week');
    const [weeklyData, setWeeklyData] = useState<any[]>([]);
    const [achievements, setAchievements] = useState<any[]>([]);
    const [showDetails, setShowDetails] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Get data for the current date range
    useEffect(() => {
        setIsLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            const today = new Date();
            let daysToGenerate = timeFrame === 'day' ? 1 : timeFrame === 'week' ? 7 : 30;
            const data = [];

            // Generate data for the selected time frame
            for (let i = 0; i < daysToGenerate; i++) {
                const date = new Date();
                date.setDate(today.getDate() - i);

                const dayStats = generateDataForDate(date);
                data.push({
                    date: date,
                    day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                    fullDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    ...dayStats,
                    target: 2000
                });
            }

            // Reverse so most recent is last (for charts)
            setWeeklyData(data.reverse());
            setIsLoading(false);

            // Generate achievements based on the data
            const waterStreak = Math.floor(Math.random() * 10) + 1;
            const workoutStreak = Math.floor(Math.random() * 7) + 1;

            setAchievements([
                {
                    title: "Water Intake Champion",
                    description: `Drink 2.5L of water daily for ${waterStreak} consecutive days`,
                    icon: <Droplets className="h-5 w-5" />,
                    progress: waterStreak,
                    total: 10,
                    completed: waterStreak >= 10,
                    color: "bg-blue-100 text-blue-600"
                },
                {
                    title: "Workout Warrior",
                    description: `Complete workouts for ${workoutStreak} days in a row`,
                    icon: <Activity className="h-5 w-5" />,
                    progress: workoutStreak,
                    total: 7,
                    completed: workoutStreak >= 7,
                    color: "bg-purple-100 text-purple-600"
                },
                {
                    title: "Nutrition Master",
                    description: "Stay within your calorie target for 14 days",
                    icon: <Apple className="h-5 w-5" />,
                    progress: 8,
                    total: 14,
                    completed: false,
                    color: "bg-green-100 text-green-600"
                },
                {
                    title: "30-Day Challenge",
                    description: "Log your meals consistently for a month",
                    icon: <Calendar className="h-5 w-5" />,
                    progress: 22,
                    total: 30,
                    completed: false,
                    color: "bg-orange-100 text-orange-600"
                }
            ]);
        }, 600);
    }, [timeFrame]);

    // Calculate day-over-day trends for the stats
    const calculateTrend = (current: number, previous: number) => {
        const diff = current - previous;
        const percentage = (diff / previous) * 100;
        return `${diff > 0 ? '+' : ''}${percentage.toFixed(1)}%`;
    };

    // Get data for today and yesterday
    const todayData = weeklyData.length > 0 ? weeklyData[weeklyData.length - 1] : { calories: 0, protein: 0, carbs: 0, fat: 0, water: 0 };
    const yesterdayData = weeklyData.length > 1 ? weeklyData[weeklyData.length - 2] : { calories: 0, protein: 0, carbs: 0, fat: 0, water: 0 };

    // Calculate trends
    const caloriesTrend = calculateTrend(todayData.calories, yesterdayData.calories);
    const proteinTrend = calculateTrend(todayData.protein, yesterdayData.protein);
    const waterTrend = calculateTrend(todayData.water, yesterdayData.water);
    const stepsTrend = calculateTrend(todayData.steps, yesterdayData.steps);

    return (
        <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
            <motion.header
                className="bg-card border-b border-border"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="px-4 py-6 flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center">
                        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="md:hidden">
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                        <h1 className="text-xl font-semibold ml-2">Health Analytics</h1>
                    </div>
                    <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
                        <Trophy className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">
                            {totalCalories.toLocaleString()} calories today
                        </span>
                    </div>
                </div>

                {/* Time frame selector */}
                <div className="flex justify-center border-t border-border bg-muted/20">
                    <div className="flex divide-x divide-border">
                        {['day', 'week', 'month'].map((frame) => (
                            <button
                                key={frame}
                                className={`px-6 py-3 text-sm font-medium transition-colors ${timeFrame === frame
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                onClick={() => setTimeFrame(frame as any)}
                            >
                                {frame.charAt(0).toUpperCase() + frame.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.header>

            <main className="p-4 space-y-8 max-w-7xl mx-auto">
                {/* Today's Progress */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Flame className="h-5 w-5 text-primary" />
                        Today's Progress
                    </h2>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <Card key={i} className="overflow-hidden">
                                    <CardContent className="p-4">
                                        <div className="animate-pulse space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-muted"></div>
                                                <div className="space-y-2">
                                                    <div className="h-4 w-20 bg-muted rounded"></div>
                                                    <div className="h-6 w-16 bg-muted rounded"></div>
                                                </div>
                                            </div>
                                            <div className="h-2 bg-muted rounded-full"></div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatsCard
                                title="Calories"
                                value={totalCalories.toLocaleString()}
                                target={2000}
                                icon={<Flame className="h-5 w-5 text-red-600" />}
                                color="bg-red-100"
                                progress={(totalCalories / 2000) * 100}
                                trend={caloriesTrend}
                                unit="kcal"
                            />

                            <StatsCard
                                title="Protein"
                                value={totalProtein}
                                target={120}
                                icon={<TrendingUp className="h-5 w-5 text-purple-600" />}
                                color="bg-purple-100"
                                progress={(totalProtein / 120) * 100}
                                trend={proteinTrend}
                                unit="g"
                            />

                            <StatsCard
                                title="Water"
                                value={waterIntake}
                                target={2.5}
                                icon={<Droplets className="h-5 w-5 text-blue-600" />}
                                color="bg-blue-100"
                                progress={(waterIntake / 2.5) * 100}
                                trend={waterTrend}
                                unit="L"
                            />

                            <StatsCard
                                title="Steps"
                                value={todayData.steps.toLocaleString()}
                                target={10000}
                                icon={<Activity className="h-5 w-5 text-green-600" />}
                                color="bg-green-100"
                                progress={(todayData.steps / 10000) * 100}
                                trend={stepsTrend}
                            />
                        </div>
                    )}

                    {/* Show Details Toggle */}
                    <div className="flex justify-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1 text-sm text-muted-foreground"
                            onClick={() => setShowDetails(!showDetails)}
                        >
                            {showDetails ? 'Hide details' : 'Show more details'}
                            {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                        {showDetails && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="space-y-4">
                                            <h3 className="font-medium">Nutrition Breakdown</h3>

                                            <div className="space-y-3">
                                                {/* Macronutrients */}
                                                <div>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span>Carbs</span>
                                                        <span>{todayData.carbs}g / 250g</span>
                                                    </div>
                                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full bg-amber-500"
                                                            style={{ width: `${Math.min((todayData.carbs / 250) * 100, 100)}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span>Protein</span>
                                                        <span>{todayData.protein}g / 120g</span>
                                                    </div>
                                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full bg-purple-500"
                                                            style={{ width: `${Math.min((todayData.protein / 120) * 100, 100)}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span>Fat</span>
                                                        <span>{todayData.fat}g / 65g</span>
                                                    </div>
                                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full bg-blue-500"
                                                            style={{ width: `${Math.min((todayData.fat / 65) * 100, 100)}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border">
                                                <div className="text-center">
                                                    <p className="text-xs text-muted-foreground">Carbs</p>
                                                    <p className="text-xl font-bold">{Math.round((todayData.carbs / (todayData.carbs + todayData.protein + todayData.fat)) * 100)}%</p>
                                                </div>

                                                <div className="text-center">
                                                    <p className="text-xs text-muted-foreground">Protein</p>
                                                    <p className="text-xl font-bold">{Math.round((todayData.protein / (todayData.carbs + todayData.protein + todayData.fat)) * 100)}%</p>
                                                </div>

                                                <div className="text-center">
                                                    <p className="text-xs text-muted-foreground">Fat</p>
                                                    <p className="text-xl font-bold">{Math.round((todayData.fat / (todayData.carbs + todayData.protein + todayData.fat)) * 100)}%</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                {/* Weekly/Monthly Overview */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}ly Overview
                    </h2>

                    {isLoading ? (
                        <Card>
                            <CardContent className="p-6">
                                <div className="animate-pulse">
                                    <div className="h-48 bg-muted rounded"></div>
                                    <div className="mt-4 flex justify-center gap-4">
                                        <div className="h-4 w-24 bg-muted rounded"></div>
                                        <div className="h-4 w-24 bg-muted rounded"></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex justify-between items-end h-48 relative">
                                    {/* Add a vertical grid */}
                                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                        <div className="border-b border-dashed border-border"></div>
                                        <div className="border-b border-dashed border-border"></div>
                                        <div className="border-b border-dashed border-border"></div>
                                        <div className="border-b border-dashed border-border"></div>
                                        <div className="border-b border-dashed border-border"></div>
                                    </div>

                                    {/* Bars for each day */}
                                    {weeklyData.map((stat, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex flex-col items-center relative z-10"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <div className="relative h-36 w-full flex items-end">
                                                <motion.div
                                                    className={`mx-1 w-10 ${stat.calories > stat.target
                                                            ? 'bg-gradient-to-t from-red-400 to-red-500'
                                                            : 'bg-gradient-to-t from-primary/60 to-primary'
                                                        } rounded-t-md`}
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${Math.min((stat.calories / 2500) * 100, 100)}%` }}
                                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                                    style={{
                                                        boxShadow: visualsMode === 'on'
                                                            ? '0 0 10px rgba(var(--primary), 0.5)'
                                                            : 'none'
                                                    }}
                                                />

                                                {/* Target line */}
                                                <div className="absolute left-0 right-0 border-t-2 border-dashed border-muted-foreground" style={{ bottom: `${(stat.target / 2500) * 100}%` }}></div>
                                            </div>

                                            <div className="mt-1 text-center">
                                                <span className="text-xs font-medium">{stat.day}</span>
                                                <span className="text-xs text-muted-foreground block">{stat.calories}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-6 flex items-center justify-center gap-8 border-t border-border pt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                                        <span className="text-xs text-muted-foreground">Under Target</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <span className="text-xs text-muted-foreground">Over Target</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 border-t-2 border-dashed border-muted-foreground"></div>
                                        <span className="text-xs text-muted-foreground">Target ({todayData.target} kcal)</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </section>

                {/* Achievements */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-primary" />
                        Achievements
                    </h2>
                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="space-y-4">
                                {[1, 2].map((i) => (
                                    <Card key={i}>
                                        <CardContent className="p-4">
                                            <div className="animate-pulse flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-muted"></div>
                                                <div className="space-y-2 flex-1">
                                                    <div className="h-4 w-32 bg-muted rounded"></div>
                                                    <div className="h-2 w-full bg-muted rounded"></div>
                                                    <div className="h-2 w-full bg-muted rounded"></div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            achievements.map((achievement, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className={achievement.completed ? "border-l-4 border-l-green-500" : ""}>
                                        <CardContent className="p-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`${achievement.color} p-3 rounded-full`}>
                                                    {achievement.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between">
                                                        <h3 className="font-medium">
                                                            {achievement.title}
                                                            {achievement.completed && (
                                                                <span className="ml-2 text-green-500 text-xs font-bold bg-green-100 px-2 py-0.5 rounded-full">COMPLETED!</span>
                                                            )}
                                                        </h3>
                                                        <span className="text-sm font-medium">
                                                            {achievement.progress}/{achievement.total}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                                                    <div className="flex gap-1 mt-2">
                                                        <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                                                            <motion.div
                                                                className={`h-full ${achievement.completed ? "bg-green-500" : "bg-primary"}`}
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                                                                transition={{ duration: 0.8 }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )))}
                    </div>
                </section>
            </main>
        </div>
    );
};
