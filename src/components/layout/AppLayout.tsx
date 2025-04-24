import React, { ReactNode, useEffect, useState } from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { BottomNavigation, DesktopNavigation } from "../BottomNavigation";
import { User, Bell, Settings, Search, Music, Headphones, Volume2, Moon, Sun, PanelLeft, X, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useMeals } from "../../context/MealContext";
import { useAuth } from "../../context/AuthContext";

interface AppLayoutProps {
    children: ReactNode;
}

// Right panel component for desktop view
const RightPanel = () => {
    const { colors, colorTheme, setColorTheme, visualsMode, toggleVisualsMode } = useTheme();
    const { totalCalories, totalProtein, waterIntake } = useMeals();

    return (
        <motion.div
            className="right-panel bg-background border-l border-border"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <div className="p-4 sticky top-0 bg-background z-10 border-b border-border">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Theme</h3>
                    <Button variant="ghost" size="sm" onClick={toggleVisualsMode}>
                        {visualsMode === 'on' ? (
                            <Volume2 className="h-4 w-4 text-primary" />
                        ) : (
                            <Music className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="ml-2 text-sm">{visualsMode === 'on' ? 'Visuals On' : 'Visuals Off'}</span>
                    </Button>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-2">
                    {(['rhythm', 'energy', 'chill', 'focus'] as const).map((theme) => (
                        <button
                            key={theme}
                            className={`h-8 rounded-md transition-all ${colorTheme === theme ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'opacity-70'
                                }`}
                            style={{
                                background: theme === 'rhythm'
                                    ? 'linear-gradient(to right, #8429F5, #F83D88)'
                                    : theme === 'energy'
                                        ? 'linear-gradient(to right, #FF3D3D, #FFB800)'
                                        : theme === 'chill'
                                            ? 'linear-gradient(to right, #2D82B7, #42E2B8)'
                                            : 'linear-gradient(to right, #3A86FF, #8338EC)'
                            }}
                            onClick={() => setColorTheme(theme)}
                            aria-label={`Set ${theme} theme`}
                        />
                    ))}
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-medium">Recent Activities</h3>
                    <Button variant="ghost" size="sm">View All</Button>
                </div>

                <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${i === 0 ? 'bg-primary/10' : i === 1 ? 'bg-secondary/10' : 'bg-accent/10'
                                }`}>
                                <span className={`text-sm ${i === 0 ? 'text-primary' : i === 1 ? 'text-secondary' : 'text-accent'
                                    }`}>
                                    {i === 0 ? '🏃‍♂️' : i === 1 ? '🥗' : '💧'}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium">
                                    {i === 0 ? 'Completed a workout' : i === 1 ? 'Logged breakfast' : 'Hydration goal met'}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {i === 0 ? '35 minutes ago' : i === 1 ? '2 hours ago' : 'Just now'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 p-4 border-t border-border">
                <h3 className="font-medium mb-4">Today's Progress</h3>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Calories</span>
                            <span>{totalCalories.toLocaleString()} / 2,000</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{
                                    background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
                                    width: `${Math.min((totalCalories / 2000) * 100, 100)}%`
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min((totalCalories / 2000) * 100, 100)}%` }}
                                transition={{ duration: 1 }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Protein</span>
                            <span>{totalProtein}g / 120g</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{
                                    background: `linear-gradient(90deg, ${colors.secondary}, ${colors.primary})`,
                                    width: `${Math.min((totalProtein / 120) * 100, 100)}%`
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min((totalProtein / 120) * 100, 100)}%` }}
                                transition={{ duration: 1 }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Water</span>
                            <span>{waterIntake}L / 2.5L</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{
                                    background: `linear-gradient(90deg, ${colors.highlight}, ${colors.secondary})`,
                                    width: `${Math.min((waterIntake / 2.5) * 100, 100)}%`
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min((waterIntake / 2.5) * 100, 100)}%` }}
                                transition={{ duration: 1 }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 p-4">
                <div className="bg-card border border-border rounded-xl p-4 relative overflow-hidden">
                    {visualsMode === 'on' && (
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full" style={{
                            background: `radial-gradient(circle, ${colors.primary}20 0%, transparent 70%)`,
                            animation: 'pulse 4s infinite'
                        }}></div>
                    )}

                    <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Bell className="h-4 w-4 text-primary" />
                        Upcoming
                    </h3>
                    <div className="text-sm">
                        <p className="font-medium">HIIT Workout</p>
                        <p className="text-muted-foreground text-xs">Today at 6:00 PM</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const location = useLocation();
    const { theme, toggleTheme, colors, visualsMode } = useTheme();
    const { isAuthenticated } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Handle resize events
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initialize

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Check if we should show navigation
    const showNavigation = !["/login", "/signup"].includes(location.pathname);

    // Is this the login or signup page?
    const isAuthPage = ["/login", "/signup"].includes(location.pathname);

    if (!isAuthenticated && !isAuthPage) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            {!isAuthPage && (
                <motion.header
                    className="desktop-header bg-background/95 backdrop-blur-sm z-50 sticky top-0 border-b border-border"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center gap-4 w-full max-w-screen-2xl mx-auto px-4 h-16">
                        {!isMobile && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="mr-2"
                            >
                                {isSidebarOpen ? <PanelLeft className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
                            </Button>
                        )}

                        <Link to="/" className="font-bold text-xl">
                            <span className="flex items-center gap-2">
                                <Zap className="h-6 w-6 text-primary" />
                                <span className="gradient-text" style={{
                                    background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>
                                    FitSync
                                </span>
                            </span>
                        </Link>

                        <div className="relative max-w-md w-full ml-8 hidden md:block">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="search"
                                placeholder="Search for workouts, meals, etc."
                                className="w-full py-2 pl-10 pr-4 rounded-full bg-muted/30 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                            />
                        </div>

                        <div className="ml-auto flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                className="hidden md:flex"
                            >
                                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                            </Button>

                            <Button variant="ghost" size="icon" className="relative hidden md:flex">
                                <Bell className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-[10px] text-white rounded-full flex items-center justify-center">
                                    3
                                </span>
                            </Button>

                            <Button variant="ghost" size="icon" className="hidden md:flex">
                                <Settings className="h-5 w-5" />
                            </Button>

                            <Button variant="ghost" size="icon" asChild>
                                <Link to="/profile">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <User className="h-4 w-4 text-primary" />
                                    </div>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </motion.header>
            )}

            <div className={`${isAuthPage ? "" : "desktop-layout"} ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                {/* Desktop-only sidebar */}
                {showNavigation && !isAuthPage && !isMobile && (
                    <AnimatePresence>
                        {isSidebarOpen && <DesktopNavigation />}
                    </AnimatePresence>
                )}

                <main className={`min-h-screen ${isAuthPage ? "" : "pb-24 md:pb-0 main-content"}`}>
                    {children}
                </main>

                {/* Desktop-only right panel */}
                {showNavigation && !isAuthPage && !isMobile && <RightPanel />}
            </div>

            {/* Mobile-only bottom navigation */}
            {showNavigation && isMobile && <BottomNavigation />}
        </div>
    );
};
