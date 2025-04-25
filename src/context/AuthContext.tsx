import React, { createContext, useState, useContext, useEffect } from 'react';

// Define User interface
interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    bio: string;
    membershipType: string;
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
const validCredentials = [
    { email: "user@example.com", password: "password" },
    { email: "admin@pulse.com", password: "admin123" }
];

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
        // Validate credentials
        const isValid = validCredentials.some(
            cred => cred.email === email && cred.password === password
        );

        if (isValid) {
            // Create user data based on the email that was used
            const userData = {
                ...defaultUser,
                email: email,
                name: email === "admin@pulse.com" ? "Admin User" : "John Doe"
            };

            setIsAuthenticated(true);
            setUser(userData);
            setError(null);

            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('user', JSON.stringify(userData));

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
