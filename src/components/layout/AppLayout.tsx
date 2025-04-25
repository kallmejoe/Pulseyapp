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

// User account section component that works on both mobile and desktop
const UserAccountSection = () => {
    const { user } = useAuth();
    const { theme } = useTheme();

    return (
        <div className="user-account p-4 border-t border-border">
            <div className="flex items-center gap-3">
                <div className="avatar w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{user?.name || 'User'}</h3>
                    <p className="text-xs text-muted-foreground truncate">{user?.email || 'user@example.com'}</p>
                </div>
                <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
};

// Right panel component for desktop view
const RightPanel = () => {
    const { colors, colorTheme, setColorTheme } = useTheme();
    const { totalCalories, totalProtein, waterIntake } = useMeals();

    return (
        <div className="right-panel">
            <div className="p-4 sticky top-0 bg-background z-10 border-b border-border">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Theme</h3>
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

            {/* Rest of the RightPanel content */}
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
                    {/* Rest of progress bars */}
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
        </div>
    );
};

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const location = useLocation();
    const { theme, toggleTheme, colors } = useTheme();
    const { isAuthenticated } = useAuth();
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Handle resize events more reliably
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);

            // Keep sidebar open on desktop, closed on mobile
            if (width < 768) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        // Set initial values
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Check if we should show navigation
    const showNavigation = !["/login", "/signup"].includes(location.pathname);
    const isAuthPage = ["/login", "/signup"].includes(location.pathname);

    return (
        <div className="app-container min-h-screen bg-background text-foreground transition-colors duration-300">
            {/* Top navigation for mobile */}
            {showNavigation && isMobile && (
                <div className="mobile-top-nav fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
                    <div className="flex items-center justify-between p-4">
                        <Link to="/" className="font-bold text-xl">
                            <span className="flex items-center gap-2">
                                <Zap className="h-5 w-5 text-primary" />
                                <span className="gradient-text" style={{
                                    background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>
                                    PULSE
                                </span>
                            </span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={toggleTheme}>
                                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </Button>
                            <Link to="/profile">
                                <Button variant="ghost" size="icon">
                                    <User className="h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Main layout container - conditional rendering for mobile/desktop */}
            <div className={`${isAuthPage ? "" : (isMobile ? "mobile-layout" : "desktop-layout")}`}>
                {/* Desktop sidebar with navigation - always visible on desktop, hidden on mobile */}
                {showNavigation && !isAuthPage && !isMobile && (
                    <div className="sidebar">
                        <div className="p-4 mb-6">
                            <Link to="/" className="font-bold text-xl">
                                <span className="flex items-center gap-2">
                                    <Zap className="h-6 w-6 text-primary" />
                                    <span className="gradient-text" style={{
                                        background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}>
                                        PULSE
                                    </span>
                                </span>
                            </Link>
                        </div>
                        <DesktopNavigation />
                        <UserAccountSection />
                    </div>
                )}

                {/* Main content */}
                <main className={`main-content ${isAuthPage ? "" : "pb-20 md:pb-4"} ${isMobile ? "pt-16" : "pt-4"}`}>
                    {children}
                </main>

                {/* Desktop-only right panel */}
                {showNavigation && !isAuthPage && !isMobile && (
                    <div className="right-panel">
                        <RightPanel />
                    </div>
                )}
            </div>

            {/* Mobile-only bottom navigation */}
            {showNavigation && isMobile && <BottomNavigation />}
        </div>
    );
};
