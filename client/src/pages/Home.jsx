import React from "react";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import sfimg1 from "../assets/sfimg1.png";
import skillPostsImg from "../assets/skill-posts.png";
import learningPlansImg from "../assets/learning-plans.png";
import progressUpdatesImg from "../assets/progress-updates.png";

export default function Home() {
  return (
    
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="px-6 py-8 text-white bg-gradient-to-br from-purple-500 to-blue-600 dark:from-purple-900 dark:to-blue-1000 md:px-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex flex-col-reverse items-center justify-between gap-12 mx-auto max-w-7xl md:flex-row">
          <div className="max-w-xl text-center md:text-left">
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Share Your Skills. Learn New Ones.
            </h1>
            <p className="mb-6 text-md sm:text-lg">
              Welcome to the ultimate Skill Sharing & Learning Platform
            </p>
            
            <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              
              <Link to="/home">
                <Button gradientDuoTone="purpleToBlue" className="w-full sm:w-auto">
                  Browse Skills
                </Button>
              </Link>
              
              <Link to="/sign-in">
                <Button color="light" className="w-full sm:w-auto">Join Now</Button>
              </Link>
              
            </div>
          </div>

          <div className="w-full md:w-1/2">
          
            <img
              src={sfimg1}
              alt="Skill sharing illustration"
              className="object-cover w-full h-auto max-h-96 rounded-xl drop-shadow-lg backdrop-blur-sm"
            />
            
          </div>
        </div>
      </motion.section>

      {/* Feature Highlights */}
      <section className="py-16 px-4 md:px-20 bg-gray-100 dark:bg-[rgb(16,23,42)]">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-3xl font-bold text-center text-gray-800 dark:text-white">
            What You Can Do
          </h2>
          <motion.div
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {[skillPostsImg, learningPlansImg, progressUpdatesImg].map((img, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="overflow-hidden shadow-lg rounded-xl">
                  <img src={img} className="object-cover w-full h-44 sm:h-48" />
                  <div className="p-4">
                    <h5 className="mb-2 text-xl font-bold">
                      {i === 0 && "📸 Skill Sharing Posts"}
                      {i === 1 && "📚 Learning Plans"}
                      {i === 2 && "🚀 Progress Updates"}
                    </h5>
                    
                    <p>
                      {i === 0 && "Upload up to 3 photos or short videos per post and inspire others."}
                      {i === 1 && "Create structured learning plans with deadlines and resources."}
                      {i === 2 && "Document your learning journey using templates and posts."}
                    </p>
                    
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trending Section */}
      <motion.section
        className="py-16 px-4 md:px-20 bg-gray-100 dark:bg-[rgb(16,23,42)]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-3xl font-semibold text-center text-gray-800 dark:text-white">
            Trending Posts
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <Card imgSrc="/images/sample1.jpg">
              <h5 className="text-lg font-bold">Cooking Basics</h5>
              <p>Mastered knife skills in my first workshop!</p>
            </Card>
            <Card imgSrc="/images/sample2.jpg">
              <h5 className="text-lg font-bold">React Crash Course</h5>
              <p>Completed my first dynamic web app.</p>
            </Card>
            <Card imgSrc="/images/sample3.jpg">
              <h5 className="text-lg font-bold">Portrait Photography</h5>
              <p>Experimenting with lighting and mood.</p>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="px-6 py-20 text-center text-white bg-blue-600"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        
        <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Ready to share your skill?</h2>
        <Link to="/sign-up" className="inline-block">
          <Button gradientDuoTone="purpleToBlue" size="lg">Create an Account</Button>
        </Link>
      </motion.section>
    </div>
  );
}
