import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Trophy, Users, Calendar, Clock, Award, ChevronRight, LogOut, CheckCircle } from "lucide-react";
import { useAppContext } from "../../context/MealContext";
import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

export const CommunityDetails = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { communities, joinCommunity, leaveCommunity, enrollInChallenge, updateChallengeProgress } = useAppContext();
  const [community, setCommunity] = useState<any>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const foundCommunity = communities.find(c => c.id === id);
      if (foundCommunity) {
        setCommunity(foundCommunity);
      } else {
        navigate('/community');
      }
    }
  }, [id, communities, navigate]);

  if (!community) {
    return <div className="p-4">Loading...</div>;
  }

  const handleJoinLeave = () => {
    if (community.joined) {
      leaveCommunity(community.id);
    } else {
      joinCommunity(community.id);
    }
  };

  const handleChallengeClick = (challenge: any) => {
    setSelectedChallenge(challenge);
    setIsDialogOpen(true);
  };

  const handleEnrollInChallenge = () => {
    if (selectedChallenge) {
      enrollInChallenge(community.id, selectedChallenge.id);
      setIsDialogOpen(false);
    }
  };

  const handleUpdateProgress = (newProgress: number) => {
    if (selectedChallenge) {
      updateChallengeProgress(community.id, selectedChallenge.id, newProgress);
    }
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
            <Button variant="ghost" size="icon" onClick={() => navigate('/community')}>
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold ml-2">Community Details</h1>
          </div>
          <Button
            variant={community.joined ? "outline" : "default"}
            onClick={handleJoinLeave}
            className={community.joined ? "border-red-500 text-red-500 hover:bg-red-50" : ""}
          >
            {community.joined ? (
              <>
                <LogOut className="h-4 w-4 mr-2" />
                Leave
              </>
            ) : (
              <>
                <Users className="h-4 w-4 mr-2" />
                Join
              </>
            )}
          </Button>
        </div>
      </motion.header>

      <main className="p-4 space-y-6">
        {/* Community Header */}
        <div className="relative rounded-xl overflow-hidden">
          <img 
            src={community.image} 
            alt={community.name} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <motion.h2 
              className="text-2xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {community.name}
            </motion.h2>
            <motion.div 
              className="flex items-center mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Users className="h-4 w-4 mr-1" />
              <span>{community.members.toLocaleString()} members</span>
            </motion.div>
          </div>
        </div>

        {/* Community Description */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">About this community</h3>
            <p className="text-gray-600">{community.description}</p>
          </CardContent>
        </Card>

        {/* Active Challenges */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Active Challenges</h3>
          
          <div className="space-y-4">
            <AnimatePresence>
              {community.challenges.map((challenge: any, index: number) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleChallengeClick(challenge)}
                >
                  <Card className={`overflow-hidden cursor-pointer hover:bg-gray-50 ${challenge.enrolled ? 'border-blue-400 border-2' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                            <Trophy className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-semibold flex items-center">
                              {challenge.title}
                              {challenge.enrolled && (
                                <span className="ml-2 text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                                  Enrolled
                                </span>
                              )}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
                            
                            <div className="flex gap-4 mt-2 text-xs text-gray-500">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>Ends: {new Date(challenge.endDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="h-3 w-3 mr-1" />
                                <span>{challenge.participants} participants</span>
                              </div>
                            </div>
                            
                            {challenge.enrolled && (
                              <div className="mt-3">
                                <div className="flex justify-between items-center mb-1 text-xs">
                                  <span>Your progress</span>
                                  <span>{challenge.progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                  <motion.div 
                                    className={`h-full ${challenge.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${challenge.progress}%` }}
                                    transition={{ duration: 0.8 }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                      
                      {challenge.enrolled && challenge.progress === 100 && (
                        <div className="mt-3 flex items-center justify-center p-2 bg-green-50 rounded-lg text-green-700 text-sm font-medium">
                          <Award className="h-4 w-4 mr-2" />
                          Challenge completed! You've earned {challenge.rewards}
                        </div>
                      )}
                      
                      {!challenge.enrolled && (
                        <div className="mt-3 bg-blue-50 p-2 rounded-lg text-blue-700 text-sm flex items-center">
                          <Award className="h-4 w-4 mr-2" />
                          <span>Complete to earn: {challenge.rewards}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {community.challenges.length === 0 && (
            <Card className="bg-gray-50">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Trophy className="h-12 w-12 text-gray-400 mb-2" />
                <h3 className="font-medium text-gray-700">No active challenges</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Check back later for new challenges
                </p>
              </CardContent>
            </Card>
          )}
        </section>
      </main>

      {/* Challenge Detail Dialog */}
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-11/12 max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-2xl">
            {selectedChallenge && (
              <>
                <Dialog.Title className="text-xl font-semibold mb-1">
                  {selectedChallenge.title}
                </Dialog.Title>
                <Dialog.Description className="text-gray-500 mb-6">
                  {selectedChallenge.description}
                </Dialog.Description>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                      <span>Ends: {new Date(selectedChallenge.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-blue-500" />
                      <span>{selectedChallenge.participants} participants</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-1 text-amber-500" />
                      <span>{selectedChallenge.rewards}</span>
                    </div>
                  </div>
                  
                  {selectedChallenge.enrolled ? (
                    <div className="space-y-3">
                      <h4 className="font-medium">Your Progress</h4>
                      <div>
                        <div className="flex justify-between items-center mb-1 text-sm">
                          <span>Completion</span>
                          <span className="font-medium">{selectedChallenge.progress}%</span>
                        </div>
                        <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${selectedChallenge.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                            style={{ width: `${selectedChallenge.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      {/* Progress update buttons */}
                      <div className="pt-2">
                        <h4 className="font-medium mb-2">Update Progress:</h4>
                        <div className="flex flex-wrap gap-2">
                          {[0, 25, 50, 75, 100].map(progressValue => (
                            <Button 
                              key={progressValue}
                              variant={selectedChallenge.progress === progressValue ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleUpdateProgress(progressValue)}
                              className={selectedChallenge.progress === 100 && progressValue === 100 ? "bg-green-500 hover:bg-green-600" : ""}
                            >
                              {progressValue === 100 && selectedChallenge.progress === 100 && (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              )}
                              {progressValue}%
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      {selectedChallenge.progress === 100 && (
                        <div className="mt-3 flex items-center justify-center p-3 bg-green-50 rounded-lg text-green-700 text-sm font-medium">
                          <Award className="h-5 w-5 mr-2" />
                          Challenge completed! You've earned your reward.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-700 mb-2">Ready to take on this challenge?</h4>
                      <p className="text-sm text-blue-600 mb-4">
                        Join this challenge to track your progress and earn rewards upon completion.
                      </p>
                      <Button 
                        variant="default" 
                        className="w-full"
                        onClick={handleEnrollInChallenge}
                      >
                        Enroll in Challenge
                      </Button>
                    </div>
                  )}
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