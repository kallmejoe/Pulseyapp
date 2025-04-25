import React, { createContext, useState, useContext, useEffect } from 'react';

// Define User interface
interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    bio: string;
    membershipType: string;
    isAdmin?: boolean; // Add isAdmin property
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    error: string | null;
}

const defaultUser: User = {
    id: "1",
    name: "John Doe",
    email: "user@example.com",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    bio: "Fitness Enthusiast",
    membershipType: "Premium"
};

// Define valid credentials
const validCredentials = JSON.parse(localStorage.getItem('validCredentials') || JSON.stringify([
    { email: "user@example.com", password: "password" },
    { email: "admin@pulse.com", password: "admin123" }
]));

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Check if user is authenticated on initial load (from localStorage)
    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        if (authStatus === 'true') {
            setIsAuthenticated(true);

            // Load user data from localStorage or use default
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            } else {
                setUser(defaultUser);
                localStorage.setItem('user', JSON.stringify(defaultUser));
            }
        }
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Get the latest credentials from localStorage
        const storedCredentials = localStorage.getItem('validCredentials');
        const currentValidCredentials = storedCredentials ? JSON.parse(storedCredentials) : validCredentials;

        // Validate credentials
        const isValid = currentValidCredentials.some(
            (cred: any) => cred.email === email && cred.password === password
        );

        if (isValid) {
            // Look for existing user data if this is a registered user
            const existingUserData = localStorage.getItem(`user_${email}`);

            // Create user data based on the email that was used
            const userData = existingUserData ? JSON.parse(existingUserData) : {
                id: Date.now().toString(),
                name: email === "admin@pulse.com" ? "Admin User" : email.split('@')[0],
                email: email,
                avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
                bio: "Fitness Enthusiast",
                membershipType: email === "admin@pulse.com" ? "Admin" : "Free",
                isAdmin: email === "admin@pulse.com" // Set isAdmin flag based on email
            };

            setIsAuthenticated(true);
            setUser(userData);
            setError(null);

            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('user', JSON.stringify(userData));

            // Also store user-specific data with a unique key
            if (!existingUserData) {
                localStorage.setItem(`user_${email}`, JSON.stringify(userData));
            }

            return true;
        } else {
            setError("Invalid email or password");
            return false;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setError(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
    };

    const value = {
        isAuthenticated,
        user,
        login,
        logout,
        error
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
