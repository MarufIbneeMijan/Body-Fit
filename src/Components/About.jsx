import React from "react";
import SectionTitle from "./SectionTitle";
import * as motion from "motion/react-client";
const About = () => {
  return (
    <div className="text-center">
      <SectionTitle heading="About" coloredHeading="OurSelf"></SectionTitle>
      <motion.div
        initial={{ opacity: 0, x: -100 }} // Start from left side, invisible
        animate={{ opacity: 1, x: 0 }} // Fade in and move to original position
        transition={{ duration: 1 }} // Duration of the animation
      >
        <h2 className="text-2xl font-bold text-left">About Us</h2>
        <p>
          At [Gym Name], we believe that fitness is a journey, not a
          destination. Our mission is to create a vibrant, green, and welcoming
          environment where everyone can feel empowered to reach their full
          potential. With a passion for health and wellness, we’ve designed a
          space that not only helps you achieve your fitness goals but also
          nurtures your overall well-being. We offer cutting-edge cardio and
          strength training equipment, dynamic group fitness classes, and
          personalized training services to support you on your unique fitness
          journey. Our green-themed facility reflects our commitment to
          sustainability and a healthy, balanced lifestyle. Whether you're here
          to build muscle, improve endurance, or simply feel better every day,
          we’re here to help. Join us today, and let’s grow stronger together in
          a community that supports your health goals with every step!
        </p>
        <div className="divider"></div>
        <h1 className="text-2xl font-bold text-left">Our Mission</h1>
        <p>At [Gym Name], our goal is simple: to inspire you to live a healthier, more active lifestyle in a clean, green, and motivating environment. We offer a range of fitness services—from expert-led group classes to personal training sessions, all tailored to meet your specific needs. Our gym is designed with your success in mind, combining the best of fitness technology with a commitment to sustainability.

Our space is vibrant and refreshing, just like the results we aim to help you achieve. Whether you're here for a high-energy class, a personalized workout, or simply to unwind and recover, we offer the resources and support to help you grow stronger every day. Let us guide you toward a healthier, more balanced life, all while being part of a community that cares about your progress.</p>
      </motion.div>
    </div>
  );
};

export default About;
