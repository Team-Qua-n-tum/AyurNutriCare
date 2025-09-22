import React, { useState } from "react";
import "./Home.css";
import { Header } from './Header';
import Chatbot from '../components/chatbot';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <Header />
            <section className="section">
                <div className="box-main">
                    <div className="firstHalf">
                        <h1 className="text-big">
                            Welcome to AyurNutriCare
                        </h1>
                        <p className="text-small">
                            Balance your mind, body, and nutrition with the timeless wisdom of Ayurveda, made simple and modern. Discover your unique dosha type and get personalized diet, lifestyle, and wellness plans designed to restore natural harmony.
                        </p>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="box-main">
                    <div className="secondHalf">
                        <h1 className="text-big" id="program">
                            ✨ What We Offer
                        </h1>
                        <ul>
                            {/* <li>🧩 Dosha Quiz – Find out your Ayurvedic body type (Vata, Pitta, Kapha).</li> */}
                            <li>🥗 Personalized Nutrition – Food charts, diet plans, and herbal guidance based on your dosha balance.</li>
                            <li>🌸 Lifestyle Guidance – Daily routines, yoga, meditation, and sleep tips for your constitution.</li>
                            <li>📊 Progress Tracking – Monitor your wellness journey and track improvements.</li>
                            <li>🤖 Smart AI Integration – Get instant food suggestions from our Ayurveda + Nutrition database.</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="box-main">
                    <div className="secondHalf">
                        <h1 className="text-big" id="program">
                            🌱 Why Choose AyurNutriCare?
                        </h1>
                        <ul>
                            <li>Holistic Approach – Goes beyond diet to address lifestyle, emotions, and environment.</li>
                            <li>Personalized Care – No one-size-fits-all, only tailor-made plans for you.</li>
                            <li> Ancient Wisdom + Modern Science – Authentic Ayurvedic principles blended with nutrition science.</li>
                            <li>Easy to Use – Simple quizzes, practical tips, and clear recommendations.</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="box-main">
                    <div className="secondHalf">
                        <h1 className="text-big" id="program">
                            🌿 Take the First Step
                        </h1>
                        <p className="text-small"><Link to="/signup">Sign Up</Link> for free and start your dosha quiz today. Discover the power of Ayurveda to transform your health and well-being. Your journey to balance and vitality begins here!</p>
                        <p className="text-small">Have questions? Chat with our AI-powered bot for instant answers and support.</p>
                    </div>
                </div>
            </section>

            {/* Chatbot Toggle Icon */}
            <div id="chatbot-section">
                <Chatbot />
            </div>

            {/* Footer */}
            <footer className="footer">
                <p className="text-footer">
                    Copyright © 2025 Team Quantum - All rights are reserved
                </p>
            </footer>
        </div>
    );
}

export default Home;