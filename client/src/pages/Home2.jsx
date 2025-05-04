import React from 'react';
import { Button, Card, Avatar } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-12 px-4 py-8 max-w-7xl mx-auto">

      {/* Hero Section */}
      <section className="text-center space-y-4">
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
        <h2 className="text-2xl font-semibold mb-4">Recent Skill Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
        <h2 className="text-2xl font-semibold mb-4">Top Learning Plans</h2>
        <div className="space-y-4">
          <Card>
            <h5 className="text-lg font-bold">Web Development Roadmap</h5>
            <p className="text-sm text-gray-600">By @JohnDev – 75% Complete</p>
            <Button size="xs" gradientDuoTone="greenToBlue">View Plan</Button>
          </Card>
        </div>
      </section>

      {/* Post Your Progress Section */}
      <section className="text-center space-y-4">
        <h2 className="text-xl font-semibold">Ready to Share Your Progress?</h2>
        <p className="text-gray-500">Pick a template and tell the world what you’ve accomplished today.</p>
        <Button size="lg" gradientDuoTone="purpleToPink" as={Link} to="/progress/start/select-template">
          Post Your Progress
        </Button>
      </section>

      {/* Featured Creators */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Creators</h2>
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
      <footer className="text-center pt-8 border-t mt-8">
        <p className="text-sm text-gray-500 mb-2">© 2025 SkillShare+ | All Rights Reserved</p>
        <div className="flex justify-center space-x-6 text-sm text-blue-600">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}
