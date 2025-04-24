import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Activity, Utensils, Users, MessageSquare, Volume2, VolumeX, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export const BottomNavigation: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, colors, visualsMode, toggleVisualsMode, font } = useTheme();

    const navItems = [
        { icon: <Home className="h-6 w-6" />, label: "Home", path: "/" },
        { icon: <Utensils className="h-6 w-6" />, label: "Nutrition", path: "/meal-logger" },
        { icon: <Activity className="h-6 w-6" />, label: "Workouts", path: "/workouts" },
        { icon: <BarChart className="h-6 w-6" />, label: "Progress", path: "/progress" },
        { icon: <Users className="h-6 w-6" />, label: "Community", path: "/community" }
    ];

    // Equalizer animation for the active item
    const EqualizerAnimation = () => (
        <div className="equalizer absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
        </div>
    );

    return (
        <motion.nav
            className="fixed bottom-0 left-0 right-0 z-50 transition-colors duration-300 mobile-nav"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderTop: `1px solid ${theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
                boxShadow: `0 -5px 20px ${theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.3)'}`,
                background: theme === 'light'
                    ? 'rgba(255, 255, 255, 0.8)'
                    : 'rgba(19, 19, 31, 0.8)',
            }}
        >
            <div className="max-w-lg mx-auto flex justify-around items-center">
                {/* Visual Effects Toggle Button */}
                <motion.button
                    className="absolute -top-6 right-4 bg-primary text-primary-foreground p-2 rounded-full shadow-lg pulse-glow"
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleVisualsMode}
                    aria-label={visualsMode === 'on' ? "Turn off visual effects" : "Turn on visual effects"}
                >
                    {visualsMode === 'on' ? (
                        <Volume2 className="h-4 w-4" />
                    ) : (
                        <VolumeX className="h-4 w-4" />
                    )}
                </motion.button>

                {/* Navigation Items */}
                {navItems.map((item, index) => {
                    const isActive = location.pathname === item.path ||
                        (item.path === "/community" && location.pathname.startsWith("/community/")) ||
                        (item.path === "/workouts" && location.pathname.startsWith("/workouts/")) ||
                        (item.path === "/meal-logger" && location.pathname.startsWith("/meal-logger/"));

                    return (
                        <motion.button
                            key={index}
                            className="flex flex-col items-center py-3 px-3 relative"
                            onClick={() => navigate(item.path)}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isActive && (
                                <>
                                    <motion.div
                                        className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 h-1 rounded-full bg-primary"
                                        layoutId="navigation-indicator"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                    {visualsMode === 'on' && <EqualizerAnimation />}
                                </>
                            )}

                            <motion.div
                                animate={{
                                    scale: isActive ? 1.1 : 1,
                                    color: isActive ? colors.primary : theme === 'light' ? colors.secondaryText : '#94a3b8',
                                    y: isActive ? -2 : 0
                                }}
                                className={isActive ? "relative z-10" : ""}
                            >
                                {item.icon}
                                {isActive && visualsMode === 'on' && (
                                    <motion.div
                                        className="absolute -inset-2 rounded-full"
                                        animate={{
                                            boxShadow: ['0 0 0px transparent', `0 0 20px ${colors.primary}80`]
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                            duration: 1.5
                                        }}
                                    />
                                )}
                            </motion.div>

                            <motion.span
                                className="text-xs mt-1 font-medium"
                                animate={{
                                    color: isActive ? colors.primary : theme === 'light' ? colors.secondaryText : '#94a3b8',
                                    fontWeight: isActive ? 600 : 500
                                }}
                                style={{
                                    fontFamily: font.heading
                                }}
                            >
                                {item.label}
                            </motion.span>
                        </motion.button>
                    );
                })}
            </div>
        </motion.nav>
    );
};

// Desktop sidebar navigation component
export const DesktopNavigation: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, colors, font } = useTheme();

    const navItems = [
        { icon: <Home className="h-5 w-5" />, label: "Dashboard", path: "/" },
        { icon: <Utensils className="h-5 w-5" />, label: "Nutrition Tracker", path: "/meal-logger" },
        { icon: <Activity className="h-5 w-5" />, label: "Workout Programs", path: "/workouts" },
        { icon: <BarChart className="h-5 w-5" />, label: "Health Analytics", path: "/progress" },
        { icon: <Users className="h-5 w-5" />, label: "Community", path: "/community" },
        { icon: <MessageSquare className="h-5 w-5" />, label: "AI Health Coach", path: "/ai-assistant" }
    ];

    return (
        <div className="sidebar bg-card text-card-foreground transition-colors duration-300">
            <div className="mb-8 p-4">
                <h1
                    className="text-2xl font-bold tracking-tight gradient-text"
                    style={{ fontFamily: font.heading }}
                >
                    FitSync
                </h1>
                <p className="text-xs text-muted-foreground">Health & Fitness</p>
            </div>

            <nav className="space-y-1">
                {navItems.map((item, index) => {
                    const isActive = location.pathname === item.path ||
                        (item.path === "/community" && location.pathname.startsWith("/community/")) ||
                        (item.path === "/workouts" && location.pathname.startsWith("/workouts/")) ||
                        (item.path === "/meal-logger" && location.pathname.startsWith("/meal-logger/"));

                    return (
                        <motion.button
                            key={index}
                            className={`w-full flex items-center gap-3 py-3 px-4 rounded-lg text-left transition-all ${isActive
                                    ? 'bg-primary/10 text-primary font-medium'
                                    : 'hover:bg-muted/50 text-muted-foreground'
                                }`}
                            onClick={() => navigate(item.path)}
                            whileHover={{ x: 4 }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <span className={isActive ? 'text-primary' : 'text-muted-foreground'}>
                                {item.icon}
                            </span>
                            <span style={{ fontFamily: font.heading }}>
                                {item.label}
                            </span>
                            {isActive && (
                                <motion.div
                                    className="ml-auto w-1 h-6 bg-primary rounded-full"
                                    layoutId="sidebar-indicator"
                                />
                            )}
                        </motion.button>
                    );
                })}
            </nav>

            <div className="mt-auto pt-6 px-4 border-t border-border mt-8">
                <div className="bg-muted/30 rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2">Your Health Score</h3>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl font-bold text-primary">87</span>
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">+3</span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-value" style={{
                            width: '87%',
                            background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`
                        }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Keep up the good work!</p>
                </div>
            </div>
        </div>
    );
};
