import React from 'react';
import { Button, Card, Avatar } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="px-4 py-8 mx-auto space-y-12 max-w-7xl">

      {/* Hero Section */}
      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">Learn, Share, Grow Together</h1>
        <p className="text-lg text-gray-600">
          Join a community of learners sharing their journey and skills.
        </p>
        
        <div className="flex justify-center space-x-4">
          <Button gradientDuoTone="purpleToBlue" as={Link} to="/signup">Join Now</Button>
          <Button outline gradientDuoTone="purpleToBlue" as={Link} to="/progress/start">Start Sharing</Button>
        </div>

        
      </section>

      {/* Skill Sharing Posts Preview */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Recent Skill Posts</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[1, 2, 3].map((id) => (
            
            <Card key={id} imgSrc={`/images/sample${id}.jpg`}>
              <h5 className="text-lg font-bold">Photography Basics</h5>
              <p className="text-sm text-gray-600">Shared by @JaneDoe</p>
              <Button size="xs" gradientDuoTone="cyanToBlue">View Post</Button>
            </Card>

            
          ))}
        </div>
      </section>

      {/* Learning Plans Section */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Top Learning Plans</h2>
        <div className="space-y-4">
          <Card>
            <h5 className="text-lg font-bold">Web Development Roadmap</h5>
            <p className="text-sm text-gray-600">By @JohnDev – 75% Complete</p>
            <Button size="xs" gradientDuoTone="greenToBlue">View Plan</Button>
          </Card>
        </div>
      </section>

      {/* Post Your Progress Section */}
      <section className="space-y-4 text-center">
        <h2 className="text-xl font-semibold">Ready to Share Your Progress?</h2>
        <p className="text-gray-500">Pick a template and tell the world what you’ve accomplished today.</p>
        <Button size="lg" gradientDuoTone="purpleToPink" as={Link} to="/progress/start/select-template">
          Post Your Progress
        </Button>
      </section>

      {/* Featured Creators */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Featured Creators</h2>
        <div className="flex flex-wrap gap-6">
          {[1, 2].map((id) => (
            <Card key={id}>
              <div className="flex items-center space-x-4">
                <Avatar img={`/avatars/user${id}.jpg`} rounded />
                <div>
                  <h5 className="font-bold">@User{id}</h5>
                  <p className="text-sm text-gray-500">#cooking #diy</p>
                </div>
              </div>
              <Button size="xs" gradientDuoTone="cyanToBlue">Follow</Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer Call to Action */}
      <footer className="pt-8 mt-8 text-center border-t">
        <p className="mb-2 text-sm text-gray-500">© 2025 SkillShare+ | All Rights Reserved</p>
        <div className="flex justify-center space-x-6 text-sm text-blue-600">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}
