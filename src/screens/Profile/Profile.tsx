import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
    ArrowLeft, Settings, User, Bell, Shield, LogOut, ChevronRight,
    Award, Gamepad, Moon, Sun, Wind, Volume2, VolumeX, Headphones, Music
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMeals } from "../../context/MealContext";
import { useTheme } from "../../context/ThemeContext";
import { FadeIn, SlideUp, ScaleIn } from "../../lib/animations";
import { useAuth } from "../../context/AuthContext";

export const Profile = (): JSX.Element => {
    const navigate = useNavigate();
    const { meals, totalCalories } = useMeals();
    const {
        theme,
        toggleTheme,
        animationLevel,
        setAnimationLevel,
        musicMode,
        toggleMusicMode,
        colors,
        font
    } = useTheme();
    const { logout } = useAuth();

    // User profile data (in a real app, this would come from a database or API)
    const [userData] = useState({
        name: "John Doe",
        bio: "Music & Gaming Enthusiast",
        avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
        level: "23",
        xp: "7,430",
        followers: "328"
    });

    const menuItems = [
        {
            icon: <User className="h-5 w-5" />,
            label: "Personal Information",
            description: "Update your profile details",
            path: "/profile/personal",
            color: `bg-primary/10 text-primary`
        },
        {
            icon: <Headphones className="h-5 w-5" />,
            label: "My Playlists",
            description: "Manage your workout music",
            path: "/profile/notifications",
            color: `bg-secondary/10 text-secondary`
        },
        {
            icon: <Shield className="h-5 w-5" />,
            label: "Privacy",
            description: "Control your privacy settings",
            path: "/profile/privacy",
            color: `bg-accent/10 text-accent`
        },
        {
            icon: <Settings className="h-5 w-5" />,
            label: "Settings",
            description: "App preferences and settings",
            path: "/profile/settings",
            color: `bg-muted/80 text-muted-foreground`
        }
    ];

    const stats = [
        {
            label: "Level",
            value: userData.level,
            path: "/workouts",
            icon: <Gamepad className="h-4 w-4" />
        },
        {
            label: "XP",
            value: userData.xp,
            path: "/progress",
            icon: <Award className="h-4 w-4" />
        },
        {
            label: "Fans",
            value: userData.followers,
            path: "/community",
            icon: <Music className="h-4 w-4" />
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    // Musical notes animation component
    const MusicalNotes = () => {
        return (
            <div className="absolute -top-2 -right-2 h-10 w-10 overflow-hidden pointer-events-none">
                <AnimatePresence>
                    {musicMode === 'on' && (
                        <>
                            <motion.div
                                className="absolute text-accent text-xl"
                                initial={{ y: 0, x: 0, opacity: 0 }}
                                animate={{ y: -30, x: -10, opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                            >
                                ♪
                            </motion.div>
                            <motion.div
                                className="absolute text-primary text-xl"
                                initial={{ y: 0, x: 0, opacity: 0 }}
                                animate={{ y: -30, x: 10, opacity: [0, 1, 0] }}
                                transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 1 }}
                            >
                                ♫
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <div
            className="min-h-screen bg-background text-foreground transition-colors duration-300"
            style={{ fontFamily: font.body }}
        >
            <motion.header
                className="bg-card shadow-md border-b border-border transition-colors duration-300"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="px-4 py-6 flex items-center justify-between max-w-lg mx-auto">
                    <div className="flex items-center">
                        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                        <h1
                            className="text-xl font-semibold ml-2"
                            style={{ fontFamily: font.heading }}
                        >
                            Profile
                        </h1>
                    </div>
                </div>
            </motion.header>

            <main className="p-4 space-y-6 max-w-lg mx-auto">
                {/* Profile Header */}
                <FadeIn delay={100}>
                    <Card className="border border-primary/10 overflow-hidden card-hover">
                        <div className="h-20 bg-gradient-to-r from-primary/80 to-accent/80 relative overflow-hidden">
                            <motion.div
                                className="absolute inset-0"
                                initial={{ backgroundPosition: '0% 0%' }}
                                animate={{ backgroundPosition: '100% 0%' }}
                                transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
                                style={{
                                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff10" fill-rule="evenodd"/%3E%3C/svg%3E")',
                                    backgroundSize: '80px 80px'
                                }}
                            />
                        </div>
                        <CardContent className="pt-0 relative">
                            <div className="flex flex-col items-center -mt-10">
                                <div className="relative">
                                    <motion.div
                                        className="absolute -inset-1 rounded-full bg-background"
                                        animate={{
                                            boxShadow: musicMode === 'on'
                                                ? ['0 0 0 rgba(0,0,0,0)', `0 0 20px ${colors.primary}`]
                                                : '0 0 0 rgba(0,0,0,0)'
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                            duration: 2
                                        }}
                                    />
                                    <motion.img
                                        src={userData.avatar}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-md relative z-10"
                                        whileHover={{ scale: 1.05 }}
                                    />
                                    <MusicalNotes />
                                    <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground p-2 rounded-full shadow-lg z-10">
                                        <motion.div
                                            whileHover={{ rotate: 180 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Settings className="h-4 w-4" />
                                        </motion.div>
                                    </div>
                                </div>
                                <h2
                                    className="mt-4 text-xl font-semibold"
                                    style={{ fontFamily: font.heading }}
                                >
                                    {userData.name}
                                </h2>
                                <p className="text-muted-foreground">{userData.bio}</p>

                                <div className="flex gap-4 mt-3">
                                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                                        <span className="font-semibold text-foreground">Lv.{userData.level}</span>
                                        <span className="w-1 h-1 rounded-full bg-accent"></span>
                                        <span>{userData.xp} XP</span>
                                    </div>
                                </div>

                                <motion.div
                                    className="mt-3 px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                                    animate={{ scale: [1, 1.03, 1] }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "loop"
                                    }}
                                >
                                    Premium Player
                                </motion.div>
                            </div>
                        </CardContent>
                    </Card>
                </FadeIn>

                {/* Theme & Animation Controls */}
                <SlideUp delay={200}>
                    <Card className="overflow-hidden card-hover border border-primary/10">
                        <CardContent className="p-0">
                            <div className="p-4 border-b border-border">
                                <h3
                                    className="font-medium flex items-center gap-2"
                                    style={{ fontFamily: font.heading }}
                                >
                                    {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                                    Interface Settings
                                </h3>
                            </div>

                            <div className="p-4 flex flex-col gap-5">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium">Theme</span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={toggleTheme}
                                            className="flex items-center gap-2"
                                        >
                                            {theme === 'light' ?
                                                <><Sun className="h-4 w-4" /> Light</> :
                                                <><Moon className="h-4 w-4" /> Dark</>
                                            }
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium flex items-center gap-2">
                                            <Wind className="h-4 w-4" /> Animations
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant={animationLevel === 'minimal' ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setAnimationLevel('minimal')}
                                            className="flex-1"
                                        >
                                            Low
                                        </Button>
                                        <Button
                                            variant={animationLevel === 'moderate' ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setAnimationLevel('moderate')}
                                            className="flex-1"
                                        >
                                            Medium
                                        </Button>
                                        <Button
                                            variant={animationLevel === 'full' ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setAnimationLevel('full')}
                                            className="flex-1"
                                        >
                                            High
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium flex items-center gap-2">
                                            <Volume2 className="h-4 w-4" /> Sound
                                        </span>
                                        <Button
                                            variant={musicMode === 'on' ? "default" : "outline"}
                                            size="sm"
                                            onClick={toggleMusicMode}
                                            className="flex items-center gap-2"
                                        >
                                            {musicMode === 'on' ?
                                                <><Volume2 className="h-4 w-4" /> On</> :
                                                <><VolumeX className="h-4 w-4" /> Off</>
                                            }
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </SlideUp>

                {/* Stats */}
                <ScaleIn delay={300}>
                    <Card className="card-hover border border-primary/10">
                        <CardContent className="p-4">
                            <h3
                                className="text-lg font-semibold mb-3"
                                style={{ fontFamily: font.heading }}
                            >
                                Player Stats
                            </h3>
                            <motion.div
                                className="grid grid-cols-3 gap-4"
                                variants={container}
                                initial="hidden"
                                animate="show"
                            >
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        className="text-center cursor-pointer hover:bg-muted/30 p-2 rounded-lg transition-colors"
                                        onClick={() => navigate(stat.path)}
                                        variants={item}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <div className="flex justify-center mb-2">
                                            <div className="p-2 rounded-full bg-primary/10">
                                                {stat.icon}
                                            </div>
                                        </div>
                                        <p
                                            className="text-2xl font-semibold"
                                            style={{ fontFamily: font.heading }}
                                        >
                                            {stat.value}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </CardContent>
                    </Card>
                </ScaleIn>

                {/* Menu Items */}
                <SlideUp delay={400}>
                    <Card className="overflow-hidden card-hover border border-primary/10">
                        <CardContent className="p-0">
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={item}
                                    className="border-b last:border-0 border-border"
                                >
                                    <Button
                                        variant="ghost"
                                        className="w-full flex items-center justify-between p-4 hover:bg-muted/20"
                                        onClick={() => navigate(item.path)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${item.color}`}>
                                                {item.icon}
                                            </div>
                                            <div className="text-left">
                                                <p
                                                    className="font-medium"
                                                    style={{ fontFamily: font.heading }}
                                                >
                                                    {item.label}
                                                </p>
                                                <p className="text-sm text-muted-foreground">{item.description}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                    </Button>
                                </motion.div>
                            ))}
                        </CardContent>
                    </Card>
                </SlideUp>

                {/* Logout Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => {
                            logout();
                            navigate("/login");
                        }}
                    >
                        <LogOut className="h-5 w-5 mr-2" />
                        Logout
                    </Button>
                </motion.div>
            </main>
        </div>
    );
};
