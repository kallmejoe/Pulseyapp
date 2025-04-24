import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Plus, Edit, Trash } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as RadixDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useMeals, Meal } from "../../context/MealContext";
import { motion, AnimatePresence } from "framer-motion";

const mealSchema = z.object({
    name: z.string().min(1, "Meal name is required"),
    time: z.string().min(1, "Time is required"),
    foods: z.string().min(1, "Foods are required"),
    calories: z.number().min(0, "Calories must be 0 or greater"),
});

type MealFormData = z.infer<typeof mealSchema>;

export const MealLogger = (): JSX.Element => {
    const navigate = useNavigate();
    const [selectedDate] = useState(new Date());
    const { meals, addMeal, updateMeal, deleteMeal } = useMeals();
    const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<MealFormData>({
        resolver: zodResolver(mealSchema),
    });

    const onSubmit = (data: MealFormData) => {
        const mealData = {
            name: data.name,
            time: data.time,
            foods: data.foods.split(",").map(food => food.trim()),
            calories: data.calories,
        };

        if (editingMeal) {
            updateMeal(editingMeal.id, mealData);
        } else {
            addMeal(mealData);
        }

        setIsDialogOpen(false);
        setEditingMeal(null);
        reset();
    };

    const handleEdit = (meal: Meal) => {
        setEditingMeal(meal);
        reset({
            name: meal.name,
            time: meal.time,
            foods: meal.foods.join(", "),
            calories: meal.calories,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        deleteMeal(id);
    };

    const handleAddNew = () => {
        setEditingMeal(null);
        reset({
            name: "",
            time: format(new Date(), "h:mm a"),
            foods: "",
            calories: 0,
        });
        setIsDialogOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <motion.header
                className="bg-white shadow-sm"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="px-4 py-6 flex items-center justify-between">
                    <div className="flex items-center">
                        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                        <h1 className="text-xl font-semibold ml-2">Meal Logger</h1>
                    </div>
                    <Button onClick={handleAddNew}>
                        <Plus className="h-5 w-5 mr-2" />
                        Add Meal
                    </Button>
                </div>
            </motion.header>

            <main className="p-4 space-y-4">
                <div className="text-center">
                    <h2 className="text-lg font-medium">
                        {format(selectedDate, "EEEE, MMMM d")}
                    </h2>
                </div>

                <AnimatePresence>
                    {meals.map((meal) => (
                        <motion.div
                            key={meal.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            layout
                        >
                            <Card className="hover:bg-gray-50">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold">{meal.name}</h3>
                                            <p className="text-sm text-gray-500">{meal.time}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium">{meal.calories} cal</p>
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(meal)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(meal.id)}>
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-600">
                                            {meal.foods.join(", ")}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>

                <RadixDialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <RadixDialog.Portal>
                        <RadixDialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
                        <RadixDialog.Content className="fixed z-50 top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-xl">
                            <RadixDialog.Title className="text-lg font-semibold mb-4">
                                {editingMeal ? "Edit Meal" : "Add New Meal"}
                            </RadixDialog.Title>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name</label>
                                    <input
                                        {...register("name")}
                                        className="w-full p-2 border rounded"
                                        placeholder="Meal name"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Time</label>
                                    <input
                                        {...register("time")}
                                        className="w-full p-2 border rounded"
                                        placeholder="Time"
                                    />
                                    {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Foods (comma-separated)</label>
                                    <input
                                        {...register("foods")}
                                        className="w-full p-2 border rounded"
                                        placeholder="Foods"
                                    />
                                    {errors.foods && <p className="text-red-500 text-sm">{errors.foods.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Calories</label>
                                    <input
                                        type="number"
                                        {...register("calories", { valueAsNumber: true })}
                                        className="w-full p-2 border rounded"
                                        placeholder="Calories"
                                    />
                                    {errors.calories && <p className="text-red-500 text-sm">{errors.calories.message}</p>}
                                </div>

                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsDialogOpen(false)}
                                        className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        {editingMeal ? "Save Changes" : "Add Meal"}
                                    </button>
                                </div>
                            </form>

                            <RadixDialog.Close asChild>
                                <button
                                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                                    aria-label="Close"
                                >
                                    <Cross2Icon className="w-4 h-4" />
                                </button>
                            </RadixDialog.Close>
                        </RadixDialog.Content>
                    </RadixDialog.Portal>
                </RadixDialog.Root>

                <motion.div
                    className="fixed bottom-24 right-6 z-10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Button
                        className="h-14 w-14 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600"
                        onClick={handleAddNew}
                    >
                        <Plus className="h-6 w-6" />
                    </Button>
                </motion.div>
            </main>
        </div>
    );
};
