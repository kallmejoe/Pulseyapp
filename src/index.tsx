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

// Add login and signup pages (we'll create these soon)
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
                            <Route path="/" element={<Page />} />
                            <Route path="/diet-plans" element={<DietPlans />} />
                            <Route path="/meal-logger" element={<MealLogger />} />
                            <Route path="/workouts" element={<Workouts />} />
                            <Route path="/ai-assistant" element={<AiAssistant />} />
                            <Route path="/progress" element={<Progress />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/community" element={<Community />} />
                            <Route path="/community/:id" element={<CommunityDetails />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
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
