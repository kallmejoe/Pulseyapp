// Animation utilities for React components
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

// Interface for animation props
export interface AnimationProps {
    children: React.ReactNode;
    className?: string;
    delay?: number; // delay in ms
}

// Fade-in animation component
export const FadeIn: React.FC<AnimationProps> = ({ children, className = '', delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const { animationLevel } = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    // If animations are disabled, render children directly
    if (animationLevel === 'minimal') {
        return <div className={className}>{children}</div>;
    }

    return (
        <div
            className={`transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
        >
            {children}
        </div>
    );
};

// Slide-up animation component
export const SlideUp: React.FC<AnimationProps> = ({ children, className = '', delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const { animationLevel } = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    // If animations are disabled, render children directly
    if (animationLevel === 'minimal') {
        return <div className={className}>{children}</div>;
    }

    return (
        <div
            className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
        >
            {children}
        </div>
    );
};

// Scale animation component
export const ScaleIn: React.FC<AnimationProps> = ({ children, className = '', delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const { animationLevel } = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    // If animations are disabled, render children directly
    if (animationLevel === 'minimal') {
        return <div className={className}>{children}</div>;
    }

    return (
        <div
            className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${className}`}
        >
            {children}
        </div>
    );
};

// Staggered animation for lists
export const StaggeredList: React.FC<{
    children: React.ReactNode[];
    className?: string;
    baseDelay?: number; // base delay before starting animations
    staggerDelay?: number; // delay between each item
}> = ({ children, className = '', baseDelay = 0, staggerDelay = 100 }) => {
    const { animationLevel } = useTheme();

    // If animations are disabled, render children directly
    if (animationLevel === 'minimal') {
        return <div className={className}>{children}</div>;
    }

    return (
        <div className={className}>
            {React.Children.map(children, (child, index) => (
                <SlideUp key={index} delay={baseDelay + (index * staggerDelay)}>
                    {child}
                </SlideUp>
            ))}
        </div>
    );
};
