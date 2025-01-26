import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import showToast from "./toastHelper";
import React from "react";
import useAuth from "../store/useAuth";

export default function OAuthCallback() {
    const location = useLocation();
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    useEffect(() => {
        const handleOauthCallback = async () => {
            const searchParams = new URLSearchParams(location.search);
            const token = searchParams.get("token");
            const error = searchParams.get("error");
            const provider = searchParams.get("provider");

            if (error) {
                const errorMessage = decodeURIComponent(error);
                if (window.opener && !window.opener.closed) {
                    window.opener.postMessage(
                        { 
                            type: `${provider}-oauth-error`, 
                            error: errorMessage 
                        },
                        window.location.origin
                    );
                    window.close();
                } else {
                    showToast(errorMessage, "error");
                    navigate("/auth?mode=signin");
                }
                return;
            }

            if (token) {
                if (window.opener && !window.opener.closed) {
                    window.opener.postMessage(
                        { 
                            type: `${provider}-oauth-success`, 
                            accessToken: token 
                        },
                        window.location.origin
                    );
                    // Set authentication state before closing
                    localStorage.setItem("accessToken", token);
                    setIsAuthenticated(true);
                    window.close();
                } else {
                    // Fallback if opened directly
                    localStorage.setItem("accessToken", token);
                    setIsAuthenticated(true);
                    showToast("Successfully logged in!", "success");
                    navigate("/dashboard");
                }
                return;
            }

            // If we get here, something went wrong
            const errorMessage = "Authentication failed";
            if (window.opener && !window.opener.closed) {
                window.opener.postMessage(
                    { 
                        type: `${provider}-oauth-error`, 
                        error: errorMessage 
                    },
                    window.location.origin
                );
                window.close();
            } else {
                showToast(errorMessage, "error");
                navigate("/auth?mode=signin");
            }
        };

        handleOauthCallback();
    }, [location, navigate, setIsAuthenticated]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Processing authentication...</h2>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
        </div>
    );
}