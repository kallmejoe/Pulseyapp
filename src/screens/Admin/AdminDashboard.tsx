import React, { useState, useEffect } from "react";
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
    Bell,
    UserPlus,
    Trash2,
    Edit,
    CheckCircle,
    XCircle,
    Search,
    Filter,
    Plus,
    Info,
    Save,
    RefreshCw,
    Unlock,
    Lock,
    Moon,
    Sun,
    Calendar,
    Download
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useMeals } from "../../context/MealContext";
import { useTheme } from "../../context/ThemeContext";

export const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { colors, theme, font } = useTheme();
    const [activeTab, setActiveTab] = useState("overview");
    const [loading, setLoading] = useState(false);

    // Mock data for the admin dashboard
    const [users, setUsers] = useState([
        {
            id: "1",
            name: "John Doe",
            email: "user@example.com",
            status: "active",
            membershipType: "Premium",
            joined: "2023-10-15"
        },
        {
            id: "2",
            name: "Admin User",
            email: "admin@pulse.com",
            status: "active",
            membershipType: "Admin",
            joined: "2023-09-01"
        },
        {
            id: "3",
            name: "Sarah Smith",
            email: "sarah@example.com",
            status: "inactive",
            membershipType: "Basic",
            joined: "2023-11-05"
        },
        {
            id: "4",
            name: "Mike Johnson",
            email: "mike@example.com",
            status: "active",
            membershipType: "Premium",
            joined: "2023-10-28"
        },
        {
            id: "5",
            name: "Lisa Brown",
            email: "lisa@example.com",
            status: "blocked",
            membershipType: "Basic",
            joined: "2023-09-18"
        }
    ]);

    // Content management data
    const [contentItems, setContentItems] = useState([
        {
            id: "1",
            title: "Beginner Workout Plan",
            type: "workout",
            status: "published",
            author: "Admin User",
            created: "2023-09-05"
        },
        {
            id: "2",
            title: "Healthy Meal Recipes",
            type: "meal",
            status: "published",
            author: "Admin User",
            created: "2023-09-10"
        },
        {
            id: "3",
            title: "Advanced HIIT Program",
            type: "workout",
            status: "draft",
            author: "Admin User",
            created: "2023-11-01"
        },
        {
            id: "4",
            title: "Nutrition Basics",
            type: "article",
            status: "published",
            author: "John Doe",
            created: "2023-10-15"
        },
        {
            id: "5",
            title: "Mindfulness for Athletes",
            type: "article",
            status: "review",
            author: "Sarah Smith",
            created: "2023-11-12"
        }
    ]);

    // Analytics data
    const [analytics, setAnalytics] = useState({
        totalUsers: 240,
        activeUsers: 185,
        premiumUsers: 78,
        newUsersThisMonth: 42,
        totalWorkouts: 28,
        totalMealPlans: 15,
        totalArticles: 32,
        dailyActiveUsers: [45, 52, 49, 62, 58, 60, 55],
        signupConversion: 24.5,
        userRetention: 68.2,
        contentEngagement: 35.7
    });

    // Settings
    const [settings, setSettings] = useState({
        appName: "PULSE Health & Fitness",
        allowSignups: true,
        requireEmailVerification: true,
        maintenanceMode: false,
        defaultTheme: theme,
        premiumPrice: 9.99,
        notificationEmails: true,
        autoBackup: true
    });

    // Dummy action handlers
    const handleAddUser = () => {
        alert("Add user functionality would be implemented here");
    };

    const handleDeleteUser = (id: string) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const handleToggleUserStatus = (id: string) => {
        setUsers(users.map(user =>
            user.id === id
                ? { ...user, status: user.status === "active" ? "inactive" : "active" }
                : user
        ));
    };

    const handlePublishContent = (id: string) => {
        setContentItems(contentItems.map(item =>
            item.id === id
                ? { ...item, status: "published" }
                : item
        ));
    };

    const handleSaveSettings = () => {
        alert("Settings saved successfully!");
    };

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
                                className={`px-4 py-2 flex items-center gap-2 text-sm font-medium ${activeTab === tab.id
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
                {/* Overview Tab */}
                {activeTab === "overview" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Overview Stats Cards */}
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                                            <h3 className="text-2xl font-bold mt-1">{analytics.totalUsers}</h3>
                                            <p className="text-xs text-green-500 flex items-center mt-1">
                                                <span>+{analytics.newUsersThisMonth} this month</span>
                                            </p>
                                        </div>
                                        <div className="bg-primary/10 p-2 rounded-md">
                                            <Users className="h-5 w-5 text-primary" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                                            <h3 className="text-2xl font-bold mt-1">{analytics.activeUsers}</h3>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {Math.round((analytics.activeUsers / analytics.totalUsers) * 100)}% of total
                                            </p>
                                        </div>
                                        <div className="bg-green-100 p-2 rounded-md">
                                            <CheckCircle className="h-5 w-5 text-green-600" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Premium Subscribers</p>
                                            <h3 className="text-2xl font-bold mt-1">{analytics.premiumUsers}</h3>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {Math.round((analytics.premiumUsers / analytics.totalUsers) * 100)}% conversion
                                            </p>
                                        </div>
                                        <div className="bg-amber-100 p-2 rounded-md">
                                            <Shield className="h-5 w-5 text-amber-600" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Content Items</p>
                                            <h3 className="text-2xl font-bold mt-1">{analytics.totalWorkouts + analytics.totalMealPlans + analytics.totalArticles}</h3>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {analytics.totalWorkouts} workouts, {analytics.totalMealPlans} meal plans
                                            </p>
                                        </div>
                                        <div className="bg-blue-100 p-2 rounded-md">
                                            <FileText className="h-5 w-5 text-blue-600" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Activity Chart */}
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium">User Activity (Last 7 Days)</h3>
                                    <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4 mr-1" />
                                        Export
                                    </Button>
                                </div>

                                <div className="h-64 flex items-end gap-2">
                                    {analytics.dailyActiveUsers.map((value, index) => (
                                        <div key={index} className="flex-1 flex flex-col items-center">
                                            <div
                                                className="w-full bg-primary/20 hover:bg-primary/30 rounded-t transition-all"
                                                style={{ height: `${(value / Math.max(...analytics.dailyActiveUsers)) * 100}%` }}
                                            ></div>
                                            <span className="text-xs mt-1">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                                <CardContent className="p-4">
                                    <h3 className="text-sm font-medium mb-2">Signup Conversion</h3>
                                    <p className="text-2xl font-bold">{analytics.signupConversion}%</p>
                                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-500 rounded-full"
                                            style={{ width: `${analytics.signupConversion}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">Visitor to signup rate</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4">
                                    <h3 className="text-sm font-medium mb-2">User Retention</h3>
                                    <p className="text-2xl font-bold">{analytics.userRetention}%</p>
                                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 rounded-full"
                                            style={{ width: `${analytics.userRetention}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">30-day retention rate</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4">
                                    <h3 className="text-sm font-medium mb-2">Content Engagement</h3>
                                    <p className="text-2xl font-bold">{analytics.contentEngagement}%</p>
                                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-purple-500 rounded-full"
                                            style={{ width: `${analytics.contentEngagement}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">Content interaction rate</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Activity */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                                <div className="space-y-4">
                                    {[
                                        { user: "Sarah Smith", action: "signed up for Premium plan", time: "2 hours ago" },
                                        { user: "Mike Johnson", action: "completed 'Core Workout' program", time: "5 hours ago" },
                                        { user: "Lisa Brown", action: "published a review", time: "1 day ago" },
                                        { user: "John Doe", action: "created new meal plan", time: "2 days ago" },
                                    ].map((activity, index) => (
                                        <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                                            <div className="bg-muted w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium">
                                                {activity.user.split(" ").map(n => n[0]).join("")}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm">
                                                    <span className="font-medium">{activity.user}</span> {activity.action}
                                                </p>
                                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === "users" && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">User Management</h2>
                            <Button onClick={handleAddUser}>
                                <UserPlus className="h-4 w-4 mr-2" />
                                Add User
                            </Button>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background"
                                />
                            </div>
                            <Button variant="outline" className="sm:w-auto">
                                <Filter className="h-4 w-4 mr-2" />
                                Filter
                            </Button>
                        </div>

                        {/* Users Table */}
                        <Card>
                            <div className="rounded-md border">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-muted/50">
                                            <tr>
                                                <th className="py-3 px-4 text-left font-medium">Name</th>
                                                <th className="py-3 px-4 text-left font-medium">Email</th>
                                                <th className="py-3 px-4 text-left font-medium">Status</th>
                                                <th className="py-3 px-4 text-left font-medium">Membership</th>
                                                <th className="py-3 px-4 text-left font-medium">Joined</th>
                                                <th className="py-3 px-4 text-right font-medium">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr key={user.id} className="border-t border-border">
                                                    <td className="py-3 px-4">{user.name}</td>
                                                    <td className="py-3 px-4">{user.email}</td>
                                                    <td className="py-3 px-4">
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${user.status === 'active'
                                                                ? 'bg-green-100 text-green-800'
                                                                : user.status === 'inactive'
                                                                    ? 'bg-gray-100 text-gray-800'
                                                                    : 'bg-red-100 text-red-800'
                                                            }`}>
                                                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${user.membershipType === 'Premium'
                                                                ? 'bg-purple-100 text-purple-800'
                                                                : user.membershipType === 'Admin'
                                                                    ? 'bg-blue-100 text-blue-800'
                                                                    : 'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {user.membershipType}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-muted-foreground">{user.joined}</td>
                                                    <td className="py-3 px-4 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleToggleUserStatus(user.id)}
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                {user.status === 'active' ?
                                                                    <Lock className="h-4 w-4" /> :
                                                                    <Unlock className="h-4 w-4" />
                                                                }
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => handleDeleteUser(user.id)}
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Card>

                        {/* Pagination */}
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-muted-foreground">Showing 1-{users.length} of {users.length}</p>
                            <div className="flex gap-1">
                                <Button variant="outline" size="sm" disabled>Previous</Button>
                                <Button variant="outline" size="sm" disabled>Next</Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Content Tab */}
                {activeTab === "content" && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Content Management</h2>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Create Content
                            </Button>
                        </div>

                        {/* Content Type Filters */}
                        <div className="flex flex-wrap gap-2">
                            <Button variant="default">All Types</Button>
                            <Button variant="outline">Workouts</Button>
                            <Button variant="outline">Meal Plans</Button>
                            <Button variant="outline">Articles</Button>
                        </div>

                        {/* Content Table */}
                        <Card>
                            <div className="rounded-md border">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-muted/50">
                                            <tr>
                                                <th className="py-3 px-4 text-left font-medium">Title</th>
                                                <th className="py-3 px-4 text-left font-medium">Type</th>
                                                <th className="py-3 px-4 text-left font-medium">Status</th>
                                                <th className="py-3 px-4 text-left font-medium">Author</th>
                                                <th className="py-3 px-4 text-left font-medium">Created</th>
                                                <th className="py-3 px-4 text-right font-medium">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contentItems.map((item) => (
                                                <tr key={item.id} className="border-t border-border">
                                                    <td className="py-3 px-4 font-medium">{item.title}</td>
                                                    <td className="py-3 px-4">
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${item.type === 'workout'
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : item.type === 'meal'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-amber-100 text-amber-800'
                                                            }`}>
                                                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${item.status === 'published'
                                                                ? 'bg-green-100 text-green-800'
                                                                : item.status === 'draft'
                                                                    ? 'bg-gray-100 text-gray-800'
                                                                    : 'bg-amber-100 text-amber-800'
                                                            }`}>
                                                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">{item.author}</td>
                                                    <td className="py-3 px-4 text-muted-foreground">{item.created}</td>
                                                    <td className="py-3 px-4 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            {item.status !== 'published' && (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => handlePublishContent(item.id)}
                                                                    className="h-8 w-8 p-0"
                                                                >
                                                                    <CheckCircle className="h-4 w-4" />
                                                                </Button>
                                                            )}
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Application Settings</h2>
                            <Button onClick={handleSaveSettings}>
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                            </Button>
                        </div>

                        {/* System Settings */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-medium mb-4">System Settings</h3>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium mb-1 block">Application Name</label>
                                            <input
                                                type="text"
                                                value={settings.appName}
                                                onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
                                                className="w-full p-2 border border-border rounded-md"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium mb-1 block">Premium Membership Price</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                                                <input
                                                    type="number"
                                                    value={settings.premiumPrice}
                                                    onChange={(e) => setSettings({ ...settings, premiumPrice: parseFloat(e.target.value) })}
                                                    className="w-full pl-8 p-2 border border-border rounded-md"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-3 border border-border rounded-md">
                                        <div>
                                            <h4 className="font-medium">Maintenance Mode</h4>
                                            <p className="text-sm text-muted-foreground">Take the application offline for maintenance</p>
                                        </div>
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.maintenanceMode ? 'bg-primary' : 'bg-muted'}`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`}
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-3 border border-border rounded-md">
                                        <div>
                                            <h4 className="font-medium">Allow New Signups</h4>
                                            <p className="text-sm text-muted-foreground">Enable or disable new user registrations</p>
                                        </div>
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => setSettings({ ...settings, allowSignups: !settings.allowSignups })}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.allowSignups ? 'bg-primary' : 'bg-muted'}`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.allowSignups ? 'translate-x-6' : 'translate-x-1'}`}
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-3 border border-border rounded-md">
                                        <div>
                                            <h4 className="font-medium">Email Verification Required</h4>
                                            <p className="text-sm text-muted-foreground">Require email verification for new accounts</p>
                                        </div>
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => setSettings({ ...settings, requireEmailVerification: !settings.requireEmailVerification })}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.requireEmailVerification ? 'bg-primary' : 'bg-muted'}`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.requireEmailVerification ? 'translate-x-6' : 'translate-x-1'}`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Theme Settings */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-medium mb-4">Theme Settings</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 border border-border rounded-md">
                                        <div>
                                            <h4 className="font-medium">Default Theme</h4>
                                            <p className="text-sm text-muted-foreground">Set the default theme for new users</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant={settings.defaultTheme === 'light' ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => setSettings({ ...settings, defaultTheme: 'light' })}
                                            >
                                                <Sun className="h-4 w-4 mr-2" />
                                                Light
                                            </Button>
                                            <Button
                                                variant={settings.defaultTheme === 'dark' ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => setSettings({ ...settings, defaultTheme: 'dark' })}
                                            >
                                                <Moon className="h-4 w-4 mr-2" />
                                                Dark
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* System Tools */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-medium mb-4">System Tools</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 border border-border rounded-md">
                                        <div>
                                            <h4 className="font-medium">Automatic Backups</h4>
                                            <p className="text-sm text-muted-foreground">Automatically backup system data daily</p>
                                        </div>
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => setSettings({ ...settings, autoBackup: !settings.autoBackup })}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.autoBackup ? 'bg-primary' : 'bg-muted'}`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.autoBackup ? 'translate-x-6' : 'translate-x-1'}`}
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Button variant="outline" className="flex-1">
                                            <Download className="h-4 w-4 mr-2" />
                                            Backup Now
                                        </Button>
                                        <Button variant="outline" className="flex-1">
                                            <RefreshCw className="h-4 w-4 mr-2" />
                                            Sync Data
                                        </Button>
                                        <Button variant="destructive" className="flex-1">
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Clear Cache
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </main>
        </div>
    );
};
