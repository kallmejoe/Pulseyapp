import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  ArrowLeft,
  Users,
  BarChart,
  Settings,
  Shield,
  FileText,
  Bell
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useMeals } from "../../context/MealContext";
import { useTheme } from "../../context/ThemeContext";

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { colors, theme, font } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Admin Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold ml-2" style={{ fontFamily: font.heading }}>
                Admin Dashboard
              </h1>
              <div className="ml-3 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                Admin Access
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  3
                </span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={user?.avatar || "https://randomuser.me/api/portraits/men/41.jpg"}
                  alt="Admin"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user?.name || "Admin User"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email || "admin@pulse.com"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Navigation */}
          <nav className="flex space-x-1 mt-4 border-b border-border">
            {[
              { id: "overview", label: "Overview", icon: <BarChart className="h-4 w-4" /> },
              { id: "users", label: "Users", icon: <Users className="h-4 w-4" /> },
              { id: "content", label: "Content", icon: <FileText className="h-4 w-4" /> },
              { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 flex items-center gap-2 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Card className="border border-border">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h2>
              <p className="mb-6">You're logged in as an admin user: {user?.email}</p>
              <div className="flex justify-center gap-4">
                <Button onClick={() => setActiveTab("users")}>Manage Users</Button>
                <Button variant="outline" onClick={() => navigate("/profile")}>Back to Profile</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
