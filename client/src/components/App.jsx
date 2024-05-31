import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";
import { initialCssContent, initialHtmlContent, initialJsContent } from "../constants";
import { imageSources } from "../assets/images";
import ImagePreloader from "../utilities/ImagePreloader";
import Login from "./login";
import Signup from "./signup";
import HomePage from "./HomePage";
import AdminDashboard from './AdminDashboard';
import AdminLoginPage from './AdminLoginPage';
import Header from './Header';
import CircularLoader from "./CircularLoader";

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [html, setHtml] = useLocalStorage("html", initialHtmlContent);
    const [css, setCss] = useLocalStorage("css", initialCssContent);
    const [js, setJs] = useLocalStorage("js", initialJsContent);
    const [srcDoc, setSrcDoc] = useState("");
    const [showIframe, setShowIframe] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // State to manage loading status
    const timerRef = useRef(null);
    const iframeRef = useRef(null);

    const handleIframeLoad = () => {
        const iframe = iframeRef.current;
        if (iframe) {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            iframeDocument.body.style.height = "100vh";
        }
    };

    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setSrcDoc(`
                <html>
                    <body>${html}</body>
                    <style>${css}</style>
                    <script>${js}</script>
                </html>
            `);
        }, 250);

        return () => clearTimeout(timerRef.current);
    }, [html, css, js]);

    const handleTopPaneAnimationEnd = () => setShowIframe(true);

    const addChatbotScript = (addScript) => {
        const existingScript1 = document.querySelector('script[chatbotId="RRyso6AYQSTTe2EBMuIac"]');
        const existingScript2 = document.querySelector('script[src="https://www.chatbase.co/embed.min.js"]');

        if (addScript) {
            if (!existingScript1 || !existingScript2) {
                const script1 = document.createElement("script");
                script1.innerHTML = `
                    window.embeddedChatbotConfig = {
                        chatbotId: "RRyso6AYQSTTe2EBMuIac",
                        domain: "www.chatbase.co"
                    };
                `;
                document.head.appendChild(script1);

                const script2 = document.createElement("script");
                script2.src = "https://www.chatbase.co/embed.min.js";
                script2.setAttribute("chatbotId", "RRyso6AYQSTTe2EBMuIac");
                script2.setAttribute("domain", "www.chatbase.co");
                script2.defer = true;

                script2.onload = () => {
                    console.log('Chatbot script loaded successfully');
                };

                script2.onerror = () => {
                    console.error('Error loading chatbot script');
                };

                document.head.appendChild(script2);

                return () => {
                    if (script1.parentNode) {
                        script1.parentNode.removeChild(script1);
                    }
                    if (script2.parentNode) {
                        script2.parentNode.removeChild(script2);
                    }
                };
            }
        } else {
            if (existingScript1 && existingScript1.parentNode) {
                existingScript1.parentNode.removeChild(existingScript1);
            }
            if (existingScript2 && existingScript2.parentNode) {
                existingScript2.parentNode.removeChild(existingScript2);
            }
        }
    };

    useEffect(() => {
        if (authenticated && window.location.pathname === '/editor') {
            addChatbotScript(true);
        } else {
            addChatbotScript(false);
        }
    }, [authenticated]);

    // Simulate initial setup/loading process
    useEffect(() => {
        const simulateLoading = async () => {
            // Simulate a network request or other async operation
            await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
            setIsLoading(false);
        };
        simulateLoading();
    }, []);

    if (isLoading) {
        return <CircularLoader />;
    }

    return (
        <Router>
            <CssBaseline />
            
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login setIsAuthenticated={setAuthenticated} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/adminlogin" element={<AdminLoginPage onAdminLogin={() => setAuthenticated(true)} />} />
                <Route path="/editor" element={
                    authenticated ? (
                        <>
                        <Header authenticated={authenticated} setAuthenticated={setAuthenticated} />
                            <ImagePreloader images={imageSources}>
                                <div className="container primary-container" onAnimationEnd={handleTopPaneAnimationEnd}>
                                    <Editor language="html" displayName="HTML" value={html} onChange={setHtml} animationQueue={0.6} />
                                    <Editor language="css" displayName="CSS" value={css} onChange={setCss} animationQueue={0.55} />
                                    <Editor language="javascript" displayName="JS" value={js} onChange={setJs} animationQueue={0.5} />
                                </div>
                                {showIframe && (
                                    <div className="container iframe-container">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            srcDoc={srcDoc}
                                            title="sandbox output"
                                            sandbox="allow-same-origin allow-scripts"
                                            ref={iframeRef}
                                            onLoad={handleIframeLoad}
                                        />
                                    </div>
                                )}
                            </ImagePreloader>
                        </>
                    ) : (
                        <Navigate to="/login" />
                    )
                } />
            </Routes>
        </Router>
    );
}

export default App;
