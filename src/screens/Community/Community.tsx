import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Users, Trophy, Award, ChevronRight, Search, Filter } from "lucide-react";
import { useAppContext } from "../../context/MealContext";
import { motion, AnimatePresence } from "framer-motion";

export const Community = (): JSX.Element => {
  const navigate = useNavigate();
  const { communities, joinCommunity } = useAppContext();
  
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
            <h1 className="text-xl font-semibold ml-2">Community</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.header>

      <main className="p-4 space-y-6">
        {/* Featured Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-2">Join Our Community</h2>
              <p className="mb-4">Connect with others, join challenges, and achieve your goals together!</p>
              <Button variant="default" className="bg-white text-blue-700 hover:bg-gray-100">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* My Communities Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">My Communities</h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          
          {communities.filter(c => c.joined).length > 0 ? (
            <div className="space-y-4">
              <AnimatePresence>
                {communities.filter(c => c.joined).map((community, index) => (
                  <motion.div
                    key={community.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => navigate(`/community/${community.id}`)}
                  >
                    <Card className="cursor-pointer hover:bg-gray-50">
                      <CardContent className="p-4 flex items-center gap-4">
                        <img 
                          src={community.image} 
                          alt={community.name} 
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{community.name}</h3>
                              <p className="text-sm text-gray-600">{community.members.toLocaleString()} members</p>
                              <div className="mt-1 flex items-center">
                                <Trophy className="h-3 w-3 text-amber-500 mr-1" />
                                <span className="text-xs text-gray-600">
                                  {community.challenges.length} active challenges
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <Card className="bg-gray-50">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Users className="h-12 w-12 text-gray-400 mb-2" />
                <h3 className="font-medium text-gray-700">No communities joined yet</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4">
                  Join a community to connect with others and participate in challenges
                </p>
                <Button variant="outline" onClick={() => document.getElementById('discover-communities')?.scrollIntoView({ behavior: 'smooth' })}>
                  Discover Communities
                </Button>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Discover Communities */}
        <section id="discover-communities">
          <h2 className="text-lg font-semibold mb-4">Discover Communities</h2>
          <div className="space-y-4">
            <AnimatePresence>
              {communities.filter(c => !c.joined).map((community, index) => (
                <motion.div
                  key={community.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <div className="relative h-32">
                      <img 
                        src={community.image} 
                        alt={community.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="font-bold text-lg">{community.name}</h3>
                        <p className="text-sm opacity-90">{community.members.toLocaleString()} members</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-600 mb-4">{community.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {community.challenges.slice(0, 2).map((challenge, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center">
                            <Trophy className="h-3 w-3 mr-1" />
                            {challenge.title}
                          </span>
                        ))}
                        {community.challenges.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            +{community.challenges.length - 2} more
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="default" 
                          className="flex-1"
                          onClick={() => {
                            joinCommunity(community.id);
                            navigate(`/community/${community.id}`);
                          }}
                        >
                          Join Community
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => navigate(`/community/${community.id}`)}
                        >
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
};