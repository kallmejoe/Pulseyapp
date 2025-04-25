import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type AnimationLevel = 'minimal' | 'moderate' | 'full';
type VisualsMode = 'on' | 'off';
type ColorTheme = 'rhythm' | 'energy' | 'chill' | 'focus';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    animationLevel: AnimationLevel;
    setAnimationLevel: (level: AnimationLevel) => void;
    visualsMode: VisualsMode;
    toggleVisualsMode: () => void;
    colorTheme: ColorTheme;
    setColorTheme: (theme: ColorTheme) => void;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        highlight: string;
        background: string;
        cardBackground: string;
        text: string;
        secondaryText: string;
    };
    font: {
        heading: string;
        body: string;
    };
    borderRadius: string;
    getThemeStyles: () => React.CSSProperties;
}

// Music-health themed color palettes
const colorThemes = {
    rhythm: {
        light: {
            primary: '#8429F5', // Electric purple - representing rhythm
            secondary: '#10C9A8', // Vibrant teal - freshness
            accent: '#F83D88', // Energetic pink - vitality
            highlight: '#FF8A47', // Orange - energy
            background: '#F8F8FB', // Light background
            cardBackground: '#ffffff', // White
            text: '#1E1A2A', // Dark text
            secondaryText: '#64637F', // Secondary text
        },
        dark: {
            primary: '#A15CFF', // Brighter purple
            secondary: '#21F0C7', // Brighter teal
            accent: '#FF5DA9', // Brighter pink
            highlight: '#FF9A57', // Brighter orange
            background: '#0C0C14', // Dark background
            cardBackground: '#13131F', // Dark card
            text: '#F2F2F5', // Light text
            secondaryText: '#A2A2B5', // Secondary text light
        }
    },
    energy: {
        light: {
            primary: '#FF3D3D', // Vibrant red - energy
            secondary: '#FFB800', // Yellow - sunshine, health
            accent: '#00C6FF', // Blue - hydration
            highlight: '#FF7D54', // Coral - activity
            background: '#F9F9F9', // Light background
            cardBackground: '#ffffff', // White
            text: '#1A1A2E', // Dark text
            secondaryText: '#5F5F7A', // Secondary text
        },
        dark: {
            primary: '#FF5252', // Brighter red
            secondary: '#FFCC33', // Brighter yellow
            accent: '#33D6FF', // Brighter blue
            highlight: '#FF8F69', // Brighter coral
            background: '#0A0A14', // Dark background
            cardBackground: '#14141D', // Dark card
            text: '#F5F5FA', // Light text
            secondaryText: '#A5A5B8', // Secondary text light
        }
    },
    chill: {
        light: {
            primary: '#2D82B7', // Calming blue - relaxation
            secondary: '#42E2B8', // Mint - refreshing
            accent: '#796EFF', // Soft purple - comfort
            highlight: '#9BE3AF', // Soft green - nature
            background: '#F8FBFA', // Light background
            cardBackground: '#ffffff', // White
            text: '#293241', // Dark text
            secondaryText: '#5D6B7A', // Secondary text
        },
        dark: {
            primary: '#3D9AD2', // Brighter calming blue
            secondary: '#53F5CA', // Brighter mint
            accent: '#8A80FF', // Brighter soft purple
            highlight: '#A5F0BB', // Brighter soft green
            background: '#0C1015', // Dark background
            cardBackground: '#151F28', // Dark card
            text: '#E5EBF1', // Light text
            secondaryText: '#97A7B8', // Secondary text light
        }
    },
    focus: {
        light: {
            primary: '#3A86FF', // Focus blue
            secondary: '#8338EC', // Deep purple - concentration
            accent: '#FF006E', // Attention pink
            highlight: '#FB5607', // Alert orange
            background: '#F8F9FA', // Light background
            cardBackground: '#ffffff', // White
            text: '#212529', // Dark text
            secondaryText: '#6C757D', // Secondary text
        },
        dark: {
            primary: '#4D95FF', // Brighter focus blue
            secondary: '#9355F1', // Brighter deep purple
            accent: '#FF3385', // Brighter attention pink
            highlight: '#FC7234', // Brighter alert orange
            background: '#0E1012', // Dark background
            cardBackground: '#181A1E', // Dark card
            text: '#E9ECEF', // Light text
            secondaryText: '#ADB5BD', // Secondary text light
        }
    }
};

const defaultFonts = {
    heading: "'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif"
};

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => { },
    animationLevel: 'moderate',
    setAnimationLevel: () => { },
    visualsMode: 'off',
    toggleVisualsMode: () => { },
    colorTheme: 'rhythm',
    setColorTheme: () => { },
    colors: colorThemes.rhythm.light,
    font: defaultFonts,
    borderRadius: '0.75rem',
    getThemeStyles: () => ({}),
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    // Initialize from localStorage if available
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme');
        return (savedTheme as Theme) || 'light';
    });

    const [animationLevel, setAnimationLevel] = useState<AnimationLevel>(() => {
        const savedLevel = localStorage.getItem('animationLevel');
        return (savedLevel as AnimationLevel) || 'moderate';
    });

    const [visualsMode, setVisualsMode] = useState<VisualsMode>(() => {
        const savedMode = localStorage.getItem('visualsMode');
        return (savedMode as VisualsMode) || 'off';
    });

    const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
        const savedColorTheme = localStorage.getItem('colorTheme');
        return (savedColorTheme as ColorTheme) || 'rhythm';
    });

    // Apply theme to document
    useEffect(() => {
        const root = window.document.documentElement;
        const html = window.document.documentElement;
        const body = window.document.body;

        // Remove old theme class from both html and body
        root.classList.remove('light', 'dark');
        html.classList.remove('light', 'dark');
        body.classList.remove('light', 'dark');

        // Add new theme class to both html and body
        root.classList.add(theme);
        html.classList.add(theme);
        body.classList.add(theme);

        // Set the color-scheme property to help native elements like scrollbars
        document.documentElement.style.colorScheme = theme;

        // Save to localStorage
        localStorage.setItem('theme', theme);

        // Set CSS variables for the current theme colors
        const currentColors = colorThemes[colorTheme][theme];
        Object.entries(currentColors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });
    }, [theme, colorTheme]);

    // Save animation preference to localStorage
    useEffect(() => {
        localStorage.setItem('animationLevel', animationLevel);
    }, [animationLevel]);

    // Save visuals mode preference to localStorage
    useEffect(() => {
        localStorage.setItem('visualsMode', visualsMode);
    }, [visualsMode]);

    // Save color theme preference to localStorage
    useEffect(() => {
        localStorage.setItem('colorTheme', colorTheme);
    }, [colorTheme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const toggleVisualsMode = () => {
        setVisualsMode(prev => prev === 'on' ? 'off' : 'on');
    };

    const colors = colorThemes[colorTheme][theme];
    const font = defaultFonts;
    const borderRadius = '0.75rem';

    // Helper function to get theme styles for components
    const getThemeStyles = (): React.CSSProperties => {
        const baseStyles: React.CSSProperties = {
            colorScheme: theme,
            borderRadius,
        };

        // Add music-inspired motion effects if visuals mode is on
        if (visualsMode === 'on') {
            return {
                ...baseStyles,
                transition: 'all 0.3s ease',
                boxShadow: `0 0 10px ${colors.primary}40`,
            };
        }

        return baseStyles;
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
                animationLevel,
                setAnimationLevel,
                visualsMode,
                toggleVisualsMode,
                colorTheme,
                setColorTheme,
                colors,
                font,
                borderRadius,
                getThemeStyles
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
