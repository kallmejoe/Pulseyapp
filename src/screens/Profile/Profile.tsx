import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
    ArrowLeft, Settings, User, Shield, LogOut, ChevronRight,
    Dumbbell, Moon, Sun, Heart, Activity
} from "lucide-react";
import { motion } from "framer-motion";
import { useMeals } from "../../context/MealContext";
import { useTheme } from "../../context/ThemeContext";
import { FadeIn, SlideUp, ScaleIn } from "../../lib/animations";
import { useAuth } from "../../context/AuthContext";

export const Profile = (): JSX.Element => {
    const navigate = useNavigate();
    const { meals, totalCalories, totalProtein, waterIntake, workouts } = useMeals();
    const { theme, toggleTheme, colors, font } = useTheme();
    const { logout, user, isAuthenticated } = useAuth();

    // If there's no user data, redirect to login
    React.useEffect(() => {
        if (!isAuthenticated || !user) {
            navigate('/login');
        }
    }, [isAuthenticated, user, navigate]);

    // If user data is not loaded yet, show loading
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                <span className="ml-2">Loading profile...</span>
            </div>
        );
    }

    // Calculate workout stats
    const completedWorkouts = workouts.reduce((sum, w) => sum + w.completedCount, 0);
    const enrolledWorkouts = workouts.filter(workout => workout.enrolled).length;

    // Check for admin user
    const isAdmin = user.isAdmin === true;

    // Create the menu items
    const menuItems = [
        {
            icon: <User className="h-5 w-5" />,
            label: "Personal Information",
            description: "Update your profile details",
            path: "/profile/personal",
            color: `bg-primary/10 text-primary`
        },
        {
            icon: <Heart className="h-5 w-5" />,
            label: "Health Data",
            description: "Manage your health metrics",
            path: "/progress",
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

    // Add admin dashboard link for admin users
    if (isAdmin) {
        menuItems.push({
            icon: <Shield className="h-5 w-5" />,
            label: "Admin Dashboard",
            description: "Manage users and content",
            path: "/admin",
            color: `bg-destructive/10 text-destructive`
        });
    }

    const stats = [
        {
            label: "Calories",
            value: totalCalories.toLocaleString(),
            path: "/meal-logger",
            icon: <Heart className="h-4 w-4" />
        },
        {
            label: "Protein",
            value: `${totalProtein}g`,
            path: "/progress",
            icon: <Activity className="h-4 w-4" />
        },
        {
            label: "Workouts",
            value: completedWorkouts,
            path: "/workouts",
            icon: <Dumbbell className="h-4 w-4" />
        }
    ];

    return (
        <div
            className="min-h-screen bg-background text-foreground transition-colors duration-300"
            style={{ fontFamily: font.body }}
        >
            <header
                className="bg-card shadow-md border-b border-border transition-colors duration-300"
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
            </header>

            <main className="p-4 space-y-6 max-w-lg mx-auto">
                {/* Profile Header */}
                <Card className="border border-primary/10 overflow-hidden">
                    <div className="h-20 bg-gradient-to-r from-primary/80 to-accent/80 relative overflow-hidden">
                    </div>
                    <CardContent className="pt-0 relative">
                        <div className="flex flex-col items-center -mt-10">
                            <div className="relative">
                                <div
                                    className="absolute -inset-1 rounded-full bg-background"
                                />
                                <img
                                    src={user.avatar}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-md relative z-10"
                                />
                                <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground p-2 rounded-full shadow-lg z-10">
                                    <Settings className="h-4 w-4" />
                                </div>
                            </div>
                            <h2
                                className="mt-4 text-xl font-semibold"
                                style={{ fontFamily: font.heading }}
                            >
                                {user.name}
                            </h2>
                            <p className="text-muted-foreground">{user.email}</p>
                            <p className="text-sm text-muted-foreground mt-1">{user.bio}</p>

                            <div className="flex gap-4 mt-3">
                                <div className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Heart className="h-4 w-4 text-primary" />
                                    <span className="font-semibold text-foreground">{totalCalories.toLocaleString()} Cal</span>
                                </div>
                            </div>

                            <div
                                className="mt-3 px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                            >
                                {user.membershipType} Member
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Theme Toggle */}
                <Card className="overflow-hidden border border-primary/10">
                    <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                            <h3
                                className="font-medium flex items-center gap-2"
                                style={{ fontFamily: font.heading }}
                            >
                                {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                                Theme Mode
                            </h3>
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
                    </CardContent>
                </Card>

                {/* Stats */}
                <Card className="border border-primary/10">
                    <CardContent className="p-4">
                        <h3
                            className="text-lg font-semibold mb-3"
                            style={{ fontFamily: font.heading }}
                        >
                            Health Stats
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="text-center cursor-pointer hover:bg-muted/30 p-2 rounded-lg transition-colors"
                                    onClick={() => navigate(stat.path)}
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
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Menu Items */}
                <Card className="overflow-hidden border border-primary/10">
                    <CardContent className="p-0">
                        <div className="divide-y divide-border">
                            {menuItems.map((item, index) => (
                                <Button
                                    key={index}
                                    variant="ghost"
                                    className="w-full flex items-center justify-between py-4 px-5 hover:bg-muted/20 rounded-none h-auto"
                                    onClick={() => navigate(item.path)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-full ${item.color}`}>
                                            {item.icon}
                                        </div>
                                        <div className="text-left">
                                            <p
                                                className="font-medium text-base"
                                                style={{ fontFamily: font.heading }}
                                            >
                                                {item.label}
                                            </p>
                                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-muted-foreground opacity-60" />
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Logout Button */}
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
            </main>
        </div>
    );
};
