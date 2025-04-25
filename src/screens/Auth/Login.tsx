import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const { colors, theme } = useTheme();
    const { login, error } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
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
            // Call the login function and wait for it to complete
            const success = await login(formData.email, formData.password);

            if (success) {
                navigate("/");
            } else {
                setFormError("Login failed. Please check your credentials.");
            }
        } catch (err) {
            setFormError("An error occurred during login.");
            console.error(err);
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
                    <p className="text-muted-foreground">Welcome back to your health journey</p>
                </div>

                <Card className="border border-primary/10">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {(formError || error) && (
                                <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-center gap-2 text-sm">
                                    <AlertCircle className="h-4 w-4" />
                                    <span>{formError || error}</span>
                                </div>
                            )}
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
                                        autoComplete="current-password"
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
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-border accent-primary"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <a href="#" className="text-primary hover:underline">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span>Sign in</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-primary hover:underline font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-xs text-muted-foreground">
                        By signing in, you agree to our{" "}
                        <a href="#" className="hover:underline">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="hover:underline">
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};
