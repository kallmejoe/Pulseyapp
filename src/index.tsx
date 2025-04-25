import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Page } from "./screens/Page/Page";
import { DietPlans } from "./screens/DietPlans/DietPlans";
import { MealLogger } from "./screens/MealLogger/MealLogger";
import { AiAssistant } from "./screens/AiAssistant/AiAssistant";
import { Progress } from "./screens/Progress/Progress";
import { Workouts } from "./screens/Workouts/Workouts";
import { Profile } from "./screens/Profile/Profile";
import { AppProvider } from "./context/MealContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { Community } from "./screens/Community/Community";
import { CommunityDetails } from "./screens/Community/CommunityDetails";
import { AppLayout } from "./components/layout/AppLayout";
import { FadeIn } from "./lib/animations";
import { AdminDashboard } from "./screens/Admin/AdminDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Auth pages
import { Login } from "./screens/Auth/Login";
import { Signup } from "./screens/Auth/Signup";

// Import global styles
import "./styles.css";

const App = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <AppProvider>
                    <AppLayout>
                        <Routes>
                            {/* Public routes */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />

                            {/* Protected routes - require authentication */}
                            <Route path="/" element={
                                <ProtectedRoute>
                                    <Page />
                                </ProtectedRoute>
                            } />
                            <Route path="/diet-plans" element={
                                <ProtectedRoute>
                                    <DietPlans />
                                </ProtectedRoute>
                            } />
                            <Route path="/meal-logger" element={
                                <ProtectedRoute>
                                    <MealLogger />
                                </ProtectedRoute>
                            } />
                            <Route path="/workouts" element={
                                <ProtectedRoute>
                                    <Workouts />
                                </ProtectedRoute>
                            } />
                            <Route path="/ai-assistant" element={
                                <ProtectedRoute>
                                    <AiAssistant />
                                </ProtectedRoute>
                            } />
                            <Route path="/progress" element={
                                <ProtectedRoute>
                                    <Progress />
                                </ProtectedRoute>
                            } />
                            <Route path="/profile" element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            } />
                            <Route path="/community" element={
                                <ProtectedRoute>
                                    <Community />
                                </ProtectedRoute>
                            } />
                            <Route path="/community/:id" element={
                                <ProtectedRoute>
                                    <CommunityDetails />
                                </ProtectedRoute>
                            } />
                            <Route path="/admin" element={
                                <ProtectedRoute requireAdmin>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            } />
                        </Routes>
                    </AppLayout>
                </AppProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

// Make sure the app element exists before rendering
const rootElement = document.getElementById("app");
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <Router>
                <App />
            </Router>
        </StrictMode>
    );
} else {
    console.error("Failed to find the app element");
}
