import React, { useState, useRef } from "react";
import "./chatbot.css";

const API_KEY = "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";

function ChatBot() {
    const [messages, setMessages] = useState([
        { type: "incoming", text: "Hey! How can I assist you today?" },
    ]);
    const [userMessage, setUserMessage] = useState("");
    const chatboxRef = useRef(null);
    const [visible, setVisible] = useState(false); // Initially hidden

    const createMessage = (text, type) => ({ text, type });

    const scrollToBottom = () => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    };

    const generateResponse = async (prompt) => {
        const API_URL = "https://api.openai.com/v1/chat/completions";
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
            }),
        };

        try {
            const res = await fetch(API_URL, requestOptions);
            if (!res.ok) throw new Error("Network error");
            const data = await res.json();
            const reply = data.choices[0].message.content;
            setMessages((prev) => [...prev, createMessage(reply, "incoming")]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                createMessage("Oops! Something went wrong. Please try again!", "error"),
            ]);
        } finally {
            scrollToBottom();
        }
    };

    const handleSend = () => {
        const trimmed = userMessage.trim();
        if (!trimmed) return;

        setMessages((prev) => [...prev, createMessage(trimmed, "outgoing")]);
        setUserMessage("");
        scrollToBottom();

        setTimeout(() => {
            setMessages((prev) => [...prev, createMessage("Thinking...", "incoming")]);
            generateResponse(trimmed);
        }, 600);
    };

    const toggleVisibility = () => {
        setVisible((prev) => !prev);
    };

    return (
        <>
            {/* Floating Chat Icon */}
            {!visible && (
                <button
                    onClick={toggleVisibility}
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        border: "none",
                        fontSize: "30px",
                        cursor: "pointer",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                        zIndex: 9999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    title="Chat with us"
                >
                    💬
                </button>
            )}

            {/* Chatbot Overlay */}
            {visible && (
                <div
                    style={{
                        position: "fixed",
                        bottom: "80px",
                        right: "20px",
                        width: "350px",
                        maxHeight: "80vh",
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                        zIndex: 9999,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden"
                    }}
                >
                    <div className="chatBot">
                        <header>
                            <h2>ChatBot</h2>
                            <span id="cross" onClick={toggleVisibility}>✖</span>
                        </header>

                        <ul className="chatbox" ref={chatboxRef}>
                            {messages.map((msg, index) => (
                                <li key={index} className={`chat ${msg.type === "outgoing" ? "chat-outgoing" : "chat-incoming"}`}>
                                    <p className={msg.type === "error" ? "error" : ""}>{msg.text}</p>
                                </li>
                            ))}
                        </ul>

                        <div className="chat-input">
                            <textarea
                                rows="1"
                                cols="17"
                                placeholder="Enter a message..."
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                            />
                            <button id="sendBTN" onClick={handleSend}>Send</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatBot;