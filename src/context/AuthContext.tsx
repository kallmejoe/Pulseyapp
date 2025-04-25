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
    login: (email: string, password: string) => void;
    logout: () => void;
}

const defaultUser: User = {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    bio: "Fitness Enthusiast",
    membershipType: "Premium"
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

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

    const login = (email: string = "john.doe@example.com", password: string = "password") => {
        setIsAuthenticated(true);
        setUser(defaultUser);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(defaultUser));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
    };

    const value = {
        isAuthenticated,
        user,
        login,
        logout
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
