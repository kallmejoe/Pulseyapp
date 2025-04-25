import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, AlertCircle } from "lucide-react";

export const Signup: React.FC = () => {
    const navigate = useNavigate();
    const { colors } = useTheme();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError(null);

        try {
            // Check if the password meets minimum requirements
            if (formData.password.length < 8) {
                setFormError("Password must be at least 8 characters long");
                setIsSubmitting(false);
                return;
            }

            // In a real app, you would send user data to a server here
            // For now, we'll simply store the user credentials in localStorage

            // First, check if there are any existing stored user credentials
            const existingCredentials = localStorage.getItem("validCredentials");
            let credentials = existingCredentials
                ? JSON.parse(existingCredentials)
                : [
                    { email: "user@example.com", password: "password" },
                    { email: "admin@pulse.com", password: "admin123" }
                ];

            // Check if user with this email already exists
            const emailExists = credentials.some((cred: any) => cred.email === formData.email);
            if (emailExists) {
                setFormError("A user with this email already exists");
                setIsSubmitting(false);
                return;
            }

            // Add new user to credentials
            credentials.push({
                email: formData.email,
                password: formData.password
            });

            // Save updated credentials
            localStorage.setItem("validCredentials", JSON.stringify(credentials));

            // Create user data
            const userData = {
                id: Date.now().toString(),
                name: formData.name,
                email: formData.email,
                avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
                bio: "Fitness Enthusiast",
                membershipType: "Free",
                isAdmin: formData.email === "admin@pulse.com"
            };

            // Log user in
            const success = await login(formData.email, formData.password);

            if (success) {
                // If login is successful, navigate to the home page
                navigate("/");
            } else {
                setFormError("Error creating account. Please try again.");
            }
        } catch (err) {
            console.error("Signup error:", err);
            setFormError("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <h1
                        className="text-3xl font-bold gradient-text mb-2"
                        style={{
                            background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        PULSE
                    </h1>
                    <p className="text-muted-foreground">Start your health journey today</p>
                </div>

                <Card className="border border-primary/10">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {formError && (
                                <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-center gap-2 text-sm">
                                    <AlertCircle className="h-4 w-4" />
                                    <span>{formError}</span>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full border-border rounded-md pl-10 py-2 bg-muted/20 border focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border-border rounded-md pl-10 py-2 bg-muted/20 border focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full border-border rounded-md pl-10 pr-10 py-2 bg-muted/20 border focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-muted-foreground"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Password must be at least 8 characters long
                                </p>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    required
                                    className="h-4 w-4 rounded border-border accent-primary"
                                />
                                <label htmlFor="terms" className="ml-2 block text-sm text-muted-foreground">
                                    I agree to the{" "}
                                    <a href="#" className="text-primary hover:underline">
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className="text-primary hover:underline">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                                        <span>Creating account...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span>Create account</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary hover:underline font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>

                <div className="mt-8 flex justify-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center">
                        <span className="text-lg">🏃‍♂️</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center">
                        <span className="text-lg">🥗</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center">
                        <span className="text-lg">💧</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center">
                        <span className="text-lg">❤️</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
