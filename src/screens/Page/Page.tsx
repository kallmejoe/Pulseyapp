import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
    Activity,
    Headphones,
    Gamepad,
    Calendar,
    ChevronRight,
    Timer,
    Music,
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
    const { meals, totalCalories, totalProtein, waterIntake, updateWaterIntake } = useMeals();
    const { theme, musicMode, colors, font } = useTheme();
    const [upcomingMeals, setUpcomingMeals] = useState<any[]>([]);
    const [showEqualizer, setShowEqualizer] = useState(false);

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

    // Get upcoming tracks by filtering
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
            .slice(0, 3) // Take only the next 3 upcoming tracks
            .map(meal => ({
                time: meal.time,
                name: meal.name,
                description: meal.foods.join(", "),
                duration: Math.floor(Math.random() * 4) + 2 + ":" + (Math.floor(Math.random() * 60)).toString().padStart(2, '0')
            }));

        setUpcomingMeals(upcoming);

        // If no upcoming tracks, show recommendations
        if (upcoming.length === 0) {
            setUpcomingMeals([
                { time: "12:30 PM", name: "Synthwave Workout", description: "Intense cardio session", duration: "4:25" },
                { time: "4:00 PM", name: "Chill Recovery", description: "Post-workout relaxation", duration: "3:18" },
                { time: "7:30 PM", name: "Evening Beats", description: "Strength training mix", duration: "5:42" }
            ]);
        }
    }, [meals]);

    // Toggle equalizer effect when music mode changes
    useEffect(() => {
        setShowEqualizer(musicMode === 'on');
    }, [musicMode]);

    const quickActions = [
        { icon: <Headphones className="h-6 w-6" />, label: "Tracks", path: "/meal-logger" },
        { icon: <Activity className="h-6 w-6" />, label: "Stats", path: "/progress" },
        { icon: <Gamepad className="h-6 w-6" />, label: "Games", path: "/ai-assistant" },
        { icon: <Share2 className="h-6 w-6" />, label: "Social", path: "/community" }
    ];

    const playerStats = [
        {
            label: "Score",
            value: totalCalories.toLocaleString(),
            target: "5,000",
            color: "bg-primary/10",
            progress: Math.min(totalCalories / 5000, 1) * 100,
            icon: <Trophy className="h-5 w-5 text-primary" />
        },
        {
            label: "Skill Points",
            value: `${totalProtein}`,
            target: "120",
            color: "bg-secondary/10",
            progress: Math.min(totalProtein / 120, 1) * 100,
            icon: <Gamepad className="h-5 w-5 text-secondary" />
        },
        {
            label: "Energy",
            value: `${waterIntake * 40}%`,
            target: "100%",
            color: "bg-accent/10",
            progress: Math.min(waterIntake / 2.5, 1) * 100,
            onClick: () => {
                // Increment water intake by 0.25L when clicked
                updateWaterIntake(Math.min(waterIntake + 0.25, 2.5));
            },
            icon: <Droplets className="h-5 w-5 text-accent" />
        }
    ];

    // Equalizer animation component
    const EqualizerAnimation = () => (
        <div className="equalizer inline-flex items-end h-3 gap-[2px] ml-2 mb-1">
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
        </div>
    );

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
                                    rotate: musicMode === 'on' ? [0, 5, 0, -5, 0] : 0
                                }}
                                transition={{
                                    repeat: musicMode === 'on' ? Infinity : 0,
                                    repeatDelay: 5,
                                    duration: 0.5
                                }}
                            >
                                <Music className="h-7 w-7 text-primary" />
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
                                    {showEqualizer && <EqualizerAnimation />}
                                </h1>
                                <p className="text-xs text-muted-foreground">Fitness & Gaming</p>
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

            <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
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

                {/* Player Stats */}
                <section>
                    <h2
                        className="text-lg font-semibold mb-3 flex items-center gap-2"
                        style={{ fontFamily: font.heading }}
                    >
                        <Trophy className="h-5 w-5 text-primary" />
                        Player Stats
                    </h2>
                    <div className="grid gap-4">
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
                                        <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full rounded-full"
                                                style={{
                                                    background: `linear-gradient(90deg, ${stat.label === "Score" ? colors.primary :
                                                        stat.label === "Skill Points" ? colors.secondary :
                                                            colors.accent
                                                        }, ${stat.label === "Score" ? colors.accent :
                                                            stat.label === "Skill Points" ? colors.primary :
                                                                colors.secondary
                                                        })`
                                                }}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${stat.progress}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                            />
                                        </div>

                                        {/* Add energy button */}
                                        {stat.label === "Energy" && (
                                            <motion.button
                                                className="mt-2 w-full bg-background rounded-full py-1 flex items-center justify-center gap-2 text-xs font-medium text-accent"
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Droplets className="h-3 w-3" />
                                                <span>Tap to boost energy</span>
                                            </motion.button>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Playlist - Upcoming Tracks */}
                <section>
                    <div className="flex justify-between items-center mb-3">
                        <h2
                            className="text-lg font-semibold flex items-center gap-2"
                            style={{ fontFamily: font.heading }}
                        >
                            <Music className="h-5 w-5 text-primary" />
                            Playlist
                        </h2>
                        <Button variant="ghost" size="sm" onClick={() => navigate("/meal-logger")}>
                            View all <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                    <div className="space-y-3">
                        <AnimatePresence>
                            {upcomingMeals.map((track, index) => (
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
                                                <PlayCircle className={`h-6 w-6 ${index === 0 ? 'text-primary' :
                                                    index === 1 ? 'text-secondary' :
                                                        'text-accent'
                                                    }`} />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p
                                                            className="font-medium"
                                                            style={{ fontFamily: font.heading }}
                                                        >
                                                            {track.name}
                                                            {index === 0 && showEqualizer && <EqualizerAnimation />}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">{track.description}</p>
                                                    </div>
                                                    <div className="text-right flex flex-col items-end">
                                                        <span className="text-xs text-muted-foreground">{track.time}</span>
                                                        <span className="text-xs font-semibold">{track.duration}</span>
                                                    </div>
                                                </div>

                                                {index === 0 && (
                                                    <div className="mt-2 h-1 bg-muted/50 rounded-full overflow-hidden">
                                                        <motion.div
                                                            className={`h-full ${index === 0 ? 'bg-primary' : index === 1 ? 'bg-secondary' : 'bg-accent'}`}
                                                            initial={{ width: "0%" }}
                                                            animate={{ width: "45%" }}
                                                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>

                {/* Featured Mixes - NEW SECTION */}
                <SlideUp delay={0.3}>
                    <section>
                        <div className="flex justify-between items-center mb-3">
                            <h2
                                className="text-lg font-semibold flex items-center gap-2"
                                style={{ fontFamily: font.heading }}
                            >
                                <Headphones className="h-5 w-5 text-primary" />
                                Featured Mixes
                            </h2>
                            <Button variant="ghost" size="sm" onClick={() => navigate("/diet-plans")}>
                                See all <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {[
                                {
                                    title: "Morning Energy",
                                    description: "Breakfast & workout plan",
                                    duration: "45 min",
                                    path: "/diet-plans",
                                    color: "primary",
                                    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                                },
                                {
                                    title: "Weekend Vibes",
                                    description: "Balanced nutrition & relaxation",
                                    duration: "60 min",
                                    path: "/diet-plans",
                                    color: "secondary",
                                    image: "https://images.unsplash.com/photo-1515023115689-589c33041d3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                                },
                                {
                                    title: "Power Hour",
                                    description: "High-intensity & protein focus",
                                    duration: "65 min",
                                    path: "/workouts",
                                    color: "accent",
                                    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                                },
                                {
                                    title: "Mindful Mix",
                                    description: "Stress reduction & nutrition",
                                    duration: "30 min",
                                    path: "/ai-assistant",
                                    color: "primary",
                                    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                                }
                            ].map((mix, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card
                                        className="cursor-pointer card-hover overflow-hidden border-primary/10"
                                        onClick={() => navigate(mix.path)}
                                    >
                                        <div className="relative h-24 overflow-hidden">
                                            <img
                                                src={mix.image}
                                                alt={mix.title}
                                                className="w-full h-full object-cover transition-transform hover:scale-110"
                                            />
                                            <div className="absolute bottom-0 right-0 px-2 py-1 bg-background/80 backdrop-blur-sm text-xs font-medium">
                                                {mix.duration}
                                            </div>
                                        </div>
                                        <CardContent className="p-3">
                                            <p
                                                className="font-semibold text-sm line-clamp-1"
                                                style={{ fontFamily: font.heading }}
                                            >
                                                {mix.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground line-clamp-1">
                                                {mix.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </SlideUp>

                {/* Daily Challenge - NEW SECTION */}
                <SlideUp delay={0.5}>
                    <section>
                        <Card className="bg-secondary/10 border-secondary/20 overflow-hidden">
                            <CardContent className="p-0">
                                <div className="flex items-center">
                                    <div className="p-4 flex-grow">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Trophy className="h-4 w-4 text-secondary" />
                                            <p className="text-xs text-secondary font-semibold">DAILY CHALLENGE</p>
                                        </div>
                                        <h3
                                            className="text-base font-bold mb-1"
                                            style={{ fontFamily: font.heading }}
                                        >
                                            Complete Your Rhythm
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Log 3 meals today to unlock XP bonus
                                        </p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <div className="h-2 bg-muted rounded-full overflow-hidden flex-grow">
                                                <motion.div
                                                    className="h-full bg-secondary"
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: "66%" }}
                                                    transition={{ duration: 1 }}
                                                />
                                            </div>
                                            <span className="text-xs font-medium">2/3</span>
                                        </div>
                                        <Button
                                            className="mt-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                                            size="sm"
                                            onClick={() => navigate('/meal-logger')}
                                        >
                                            Log Meal
                                        </Button>
                                    </div>
                                    <div className="hidden sm:block w-24 h-full bg-gradient-to-r from-transparent to-secondary/20 p-4">
                                        <div className="flex items-center justify-center h-full">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                            >
                                                <Timer className="h-12 w-12 text-secondary/60" />
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </SlideUp>

                {/* Add Track Button */}
                <motion.div
                    className="fixed bottom-24 right-6 z-10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Button
                        className="h-14 w-14 rounded-full shadow-lg pulse-glow"
                        onClick={() => navigate('/meal-logger')}
                        style={{
                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                        }}
                    >
                        <Plus className="h-6 w-6 text-white" />
                    </Button>
                </motion.div>
            </main>
        </div>
    );
};
