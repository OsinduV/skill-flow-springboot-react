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
        className="bg-gradient-to-br from-purple-500 to-blue-600 dark:from-purple-900 dark:to-blue-1000 text-white px-6 md:px-20 py-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left max-w-xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Share Your Skills. Learn New Ones.
            </h1>
            <p className="text-md sm:text-lg mb-6">
              Welcome to the ultimate Skill Sharing & Learning Platform
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
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
              className="w-full h-auto max-h-96 object-cover rounded-xl drop-shadow-lg backdrop-blur-sm"
            />
          </div>
        </div>
      </motion.section>

      {/* Feature Highlights */}
      <section className="py-16 px-4 md:px-20 bg-gray-100 dark:bg-[rgb(16,23,42)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
            What You Can Do
          </h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
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
                <Card className="rounded-xl overflow-hidden shadow-lg">
                  <img src={img} className="w-full h-44 sm:h-48 object-cover" />
                  <div className="p-4">
                    <h5 className="text-xl font-bold mb-2">
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

      {/* Call to Action */}
      <motion.section
        className="py-20 px-6 bg-blue-600 text-white text-center"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Ready to share your skill?</h2>
        <Link to="/sign-up" className="inline-block">
          <Button gradientDuoTone="purpleToBlue" size="lg">Create an Account</Button>
        </Link>
      </motion.section>
    </div>
  );
}
