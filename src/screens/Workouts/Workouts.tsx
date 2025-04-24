import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Play, Clock, Dumbbell, CheckCircle, XCircle, BookOpen, Award } from "lucide-react";
import { useAppContext } from "../../context/MealContext";
import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

export const Workouts = (): JSX.Element => {
    const navigate = useNavigate();
    const { workouts, toggleWorkoutEnrollment, completeWorkout } = useAppContext();
    const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
    const [showEnrolledOnly, setShowEnrolledOnly] = useState(false);
    const [showStartDialog, setShowStartDialog] = useState(false);
    const [activeWorkout, setActiveWorkout] = useState<any>(null);
    const [currentExercise, setCurrentExercise] = useState(0);

    const filteredWorkouts = showEnrolledOnly
        ? workouts.filter(w => w.enrolled)
        : workouts;

    const handleStartWorkout = (workout: any) => {
        setActiveWorkout(workout);
        setCurrentExercise(0);
        setShowStartDialog(true);
    };

    const handleCompleteWorkout = () => {
        if (activeWorkout) {
            completeWorkout(activeWorkout.id);
            setShowStartDialog(false);

            // Show a temporary selection on the completed workout
            setSelectedWorkout(activeWorkout.id);
            setTimeout(() => {
                setSelectedWorkout(null);
            }, 1500);
        }
    };

    const handleToggleEnrollment = (id: string) => {
        toggleWorkoutEnrollment(id);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <motion.header
                className="bg-white shadow-sm"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="px-4 py-6 flex items-center justify-between">
                    <div className="flex items-center">
                        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                        <h1 className="text-xl font-semibold ml-2">Workouts</h1>
                    </div>
                    <Button
                        variant={showEnrolledOnly ? "default" : "outline"}
                        onClick={() => setShowEnrolledOnly(!showEnrolledOnly)}
                    >
                        <BookOpen className="h-5 w-5 mr-2" />
                        {showEnrolledOnly ? "All Workouts" : "My Workouts"}
                    </Button>
                </div>
            </motion.header>

            <main className="p-4 space-y-4">
                <AnimatePresence>
                    {filteredWorkouts.map((workout, index) => (
                        <motion.div
                            key={workout.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: 1, y: 0,
                                scale: selectedWorkout === workout.id ? 1.02 : 1,
                                boxShadow: selectedWorkout === workout.id ? "0 8px 30px rgba(0, 0, 0, 0.12)" : "none"
                            }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.05 }}
                            layout
                        >
                            <Card className={`overflow-hidden ${selectedWorkout === workout.id ? "border-green-400 border-2" : ""}`}>
                                <div className="relative">
                                    <img
                                        src={workout.image}
                                        alt={workout.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    {workout.enrolled && (
                                        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            Enrolled
                                        </div>
                                    )}
                                    {workout.completedCount > 0 && (
                                        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                                            <Award className="h-3 w-3 mr-1" />
                                            Completed {workout.completedCount}x
                                        </div>
                                    )}
                                </div>
                                <CardContent className="p-4">
                                    <h2 className="text-xl font-semibold">{workout.title}</h2>

                                    <div className="flex gap-4 mt-2">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Clock className="h-4 w-4 mr-1" />
                                            {workout.duration}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {workout.difficulty}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {workout.calories} cal
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h3 className="text-sm font-medium mb-2">Exercises:</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {workout.exercises.map((exercise: string, i: number) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                                                >
                                                    {exercise}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-4">
                                        <Button
                                            variant="default"
                                            className="flex-1"
                                            onClick={() => handleStartWorkout(workout)}
                                        >
                                            <Play className="h-4 w-4 mr-2" />
                                            Start Workout
                                        </Button>
                                        <Button
                                            variant={workout.enrolled ? "destructive" : "outline"}
                                            className="w-12"
                                            onClick={() => handleToggleEnrollment(workout.id)}
                                        >
                                            {workout.enrolled ? <XCircle className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredWorkouts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                        <Dumbbell className="h-16 w-16 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-600">No workouts found</h3>
                        <p className="text-gray-500 mt-2">
                            {showEnrolledOnly ? "You haven't enrolled in any workouts yet." : "No workouts available at the moment."}
                        </p>
                        {showEnrolledOnly && (
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => setShowEnrolledOnly(false)}
                            >
                                Browse All Workouts
                            </Button>
                        )}
                    </div>
                )}
            </main>

            {/* Workout Session Dialog */}
            <Dialog.Root open={showStartDialog} onOpenChange={setShowStartDialog}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
                    <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-11/12 max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-2xl">
                        {activeWorkout && (
                            <>
                                <Dialog.Title className="text-xl font-semibold mb-1">
                                    {activeWorkout.title}
                                </Dialog.Title>
                                <Dialog.Description className="text-gray-500 mb-6">
                                    Follow along with the exercises below
                                </Dialog.Description>

                                <div className="space-y-6">
                                    {/* Progress indicator */}
                                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-blue-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${((currentExercise + 1) / activeWorkout.exercises.length) * 100}%` }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>

                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <h3 className="font-medium mb-2 text-blue-700">
                                            Exercise {currentExercise + 1} of {activeWorkout.exercises.length}
                                        </h3>
                                        <div className="text-2xl font-bold mb-4">
                                            {activeWorkout.exercises[currentExercise]}
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Complete the exercise at your own pace, then continue to the next one.
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button
                                            variant="outline"
                                            className="flex-1"
                                            onClick={() => setCurrentExercise(Math.max(0, currentExercise - 1))}
                                            disabled={currentExercise === 0}
                                        >
                                            Previous
                                        </Button>
                                        {currentExercise < activeWorkout.exercises.length - 1 ? (
                                            <Button
                                                variant="default"
                                                className="flex-1"
                                                onClick={() => setCurrentExercise(currentExercise + 1)}
                                            >
                                                Next
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="default"
                                                className="flex-1"
                                                onClick={handleCompleteWorkout}
                                            >
                                                Complete Workout
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                <Dialog.Close asChild>
                                    <button
                                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-800"
                                        aria-label="Close"
                                    >
                                        <Cross2Icon className="h-4 w-4" />
                                    </button>
                                </Dialog.Close>
                            </>
                        )}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};
