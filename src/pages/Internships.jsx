import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom"; 
import { getInternships } from "../api/job"; 
import Footer from '../components/Footer';

const MOBILE_BREAKPOINT = 768;

const colors = {
    primary: "#2B6EF0",
    background: "black",
    cardBackground: "#101010", 
    cardBorder: "#FFFFFF33",
    textWhite: "white",
    textFaded: "rgba(255, 255, 255, 0.9)",
};

const ensureProtocol = (url) => {
    if (!url || typeof url !== 'string') return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `https://${url}`;
};

const useResponsiveScreen = (breakpoint) => {
    const [screenWidth, setScreenWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : breakpoint + 1
    );

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleResize);
        }
        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("resize", handleResize);
            }
        };
    }, []);

    return screenWidth < breakpoint;
};

const styles = (isMobile) => ({
    container: { 
        width: "100%", 
        minHeight: "100vh", 
        background: colors.background,
        overflowX: "hidden", 
        fontFamily: "Poppins, sans-serif",
    },
    contentWrapper: {
        width: "100%", 
        maxWidth: "1300px", 
        margin: "0 auto", 
        marginTop: isMobile ? "70px" : "105px", 
        color: colors.textWhite,
        padding: isMobile ? "40px 20px" : "50px 40px",
        boxSizing: 'border-box',
    },
    title: {
        fontWeight: 600,
        fontSize: isMobile ? "28px" : "36px",
        marginBottom: "10px",
    },
    subtitle: {
        fontWeight: 400,
        fontSize: "16px",
        color: colors.textFaded,
        marginBottom: "40px",
    },
    grid: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
        gap: isMobile ? "20px" : "30px",
        margin: "50px 0 100px 0", 
    },
    card: {
        width: "100%", 
        height: "210px",
        borderRadius: "12px",
        border: `1px solid ${colors.cardBorder}`,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: `radial-gradient(196.17% 302.03% at 6.35% 24.96%, #101010 0%, #595959 100%)`,
        boxSizing: 'border-box',
    },
    roleTitle: {
        fontWeight: 700,
        fontSize: isMobile ? "18px" : "20px",
        marginBottom: "10px",
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    applyButton: {
        width: isMobile ? "100%" : "97px", 
        height: "34px",
        background: colors.primary,
        borderRadius: "10px",
        border: "none",
        color: colors.textWhite,
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    divider: {
        width: "100%",
        borderBottom: `1px solid ${colors.cardBorder}`,
        marginTop: "15px",
        marginBottom: "5px",
    }
});

export default function Internships() {
    const isMobile = useResponsiveScreen(MOBILE_BREAKPOINT);
    const ss = styles(isMobile); 

    const [internships, setInternships] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInternships = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getInternships();
                let fetchedInternships = Array.isArray(data) ? data : (data?.internships || []);

                const cleanedInternships = fetchedInternships.map(internship => ({
                    ...internship,
                    companyWebsite: ensureProtocol(internship.companyWebsite) 
                }));
                
                setInternships(cleanedInternships);
            } catch (err) {
                console.error("Failed to fetch internships:", err);
                setError("Failed to load internships. Please check your network.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchInternships();
    }, []);
    
    // Function to render content based on state
    const renderInternshipCards = () => {
        if (isLoading) {
            return <div style={{ color: colors.textWhite, fontSize: '18px', gridColumn: '1 / -1', textAlign: 'center' }}>Loading internship opportunities...</div>;
        }

        if (error) {
            return <div style={{ color: 'red', fontSize: '18px', gridColumn: '1 / -1', textAlign: 'center' }}>🚨 Error: {error}</div>;
        }

        if (internships.length === 0) {
            return (
                <div style={{ color: colors.textFaded, fontSize: '18px', gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                    No internship listings found at this time.
                </div>
            );
        }

        return internships.map((job, index) => (
            <div
                key={job.id || index} 
                style={ss.card}
            >
                <div>
                    {/* Role */}
                    <h2 style={ss.roleTitle}>
                        {job.roleTitle}
                    </h2>

                    {/* Company */}
                    <p style={{ fontWeight: 400, fontSize: "16px", marginBottom: "10px" }}>
                        {job.companyName}
                    </p>

                    {/* Stipend/Package */}
                    <span style={{ fontWeight: 600, fontSize: "16px", color: '#4CAF50' }}> 
                        {job.ctcOrStipend}
                    </span>
                </div>

                <div style={ss.divider}></div>

                {/* Apply Button */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: '5px' }}>
                    <button
                        onClick={() => window.open(job.companyWebsite, "_blank")}
                        style={ss.applyButton}
                    >
                        Apply
                    </button>
                </div>
            </div>
        ));
    };

    return (
        <div style={ss.container}>
            <Header />

            <div style={ss.contentWrapper}>
                {/* Title and Subtitle */}
                <h1 style={ss.title}>Internships</h1>
                <p style={ss.subtitle}>From learning to earning - Start here</p>

                {/* Internship Cards Grid */}
                <div style={ss.grid}>
                    {renderInternshipCards()}
                </div>
            </div>
            
            <Footer />
        </div>
    );
}