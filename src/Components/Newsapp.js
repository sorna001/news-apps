import React, { useEffect, useState } from 'react';
import Card from './Card';

const Newsapp = () => {
    const [search, setSearch] = useState("india");
    const [newsData, setNewsData] = useState(null);
    const [subscribed, setSubscribed] = useState(false);
    const API_KEY = "5c5288f5f81c46b492b8a1b469c4a530";

    const getData = async () => {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
        const jsonData = await response.json();
        console.log(jsonData.articles);
        let dt = jsonData.articles.slice(0, 10);
        setNewsData(dt);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleInput = (e) => {
        console.log(e.target.value);
        setSearch(e.target.value);
    };

    const userInput = (event) => {
        setSearch(event.target.value);
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        setSubscribed(true);
        setTimeout(() => setSubscribed(false), 3000); // Reset message after 3 seconds
    };

    const topAd = {
        imageUrl: "/samm.jpeg",
        headline: "Special Offer!",
        description: "Check out our exclusive deals.",
        targetUrl: "https://www.samsung.com/in/offer/"
    };

    const bottomAd = {
        imageUrl: "/lo.jpeg",
        headline: "Limited Time Discount!",
        description: "Don't miss out on this amazing offer.",
        targetUrl: "https://mcdindia.com/"
    };

    return (
        <div>
            <nav>
                <div>
                   <marquee><h1>Sk News</h1></marquee> 
                </div>
                
                <ul style={{ display: "flex", gap: "11px" }}>
                    <a style={{ fontWeight: 600, fontSize: "17px" }}>All Trending News</a>
                    <a style={{ fontWeight: 600, fontSize: "17px" }}>Trending</a>
                </ul>
                <div className='searchBar'>
                    <input type='text' placeholder='Search News' value={search} onChange={handleInput} />
                    <button onClick={getData}>Search</button>
                </div>
            </nav>
            <div>
                <p className='head'>Stay Updated with TrendyNews</p>
            </div>
            <div className='categoryBtn'>
                <button onClick={userInput} value="sports">Sports</button>
                <button onClick={userInput} value="politics">Politics</button>
                <button onClick={userInput} value="entertainment">Entertainment</button>
                <button onClick={userInput} value="health">Health</button>
                <button onClick={userInput} value="fitness">Fitness</button>
            </div>

            {/* Top Ad */}
            <AdBanner ad={topAd} />

            <div>
                {newsData ? <Card data={newsData} /> : null}
            </div>

            {/* Bottom Ad */}
            <AdBanner ad={bottomAd} />

            {/* Professional Footer */}
            <footer className="professional-footer">
                <div className="footer-content">
                    <div className="footer-section about">
                        <h3>About SK News</h3>
                        <p>SK News brings you the latest trending news from around the world. Stay informed and updated with us.</p>
                    </div>
                    <div className="footer-section links">
                        <h3>News Categories</h3>
                        <ul>
                            <li><a href="#" onClick={() => setSearch("sports")}>Sports</a></li>
                            <li><a href="#" onClick={() => setSearch("politics")}>Politics</a></li>
                            <li><a href="#" onClick={() => setSearch("entertainment")}>Entertainment</a></li>
                            <li><a href="#" onClick={() => setSearch("health")}>Health</a></li>
                            <li><a href="#" onClick={() => setSearch("fitness")}>Fitness</a></li>
                        </ul>
                    </div>
                    <div className="footer-section contact">
                        <h3>Contact Us</h3>
                        <p>Email: contact@sknews.com</p>
                        <p>Phone: +91 9176185339</p>
                    </div>
                    <div className="footer-section follow">
                        <h3>Follow Us</h3>
                        <ul className="social-media">
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">LinkedIn</a></li>
                        </ul>
                    </div>
                    <div className="footer-section subscribe">
                        <h3>Subscribe</h3>
                        <p>Get the latest news delivered to your inbox.</p>
                        <form className="subscribe-form" onSubmit={handleSubscribe}>
                            <input type="email" placeholder="Enter your email" required />
                            <button type="submit">Subscribe</button>
                        </form>
                        {subscribed && <p className="subscription-message">Thank you for subscribing!</p>}
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 SK News. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

const AdBanner = ({ ad }) => {
    return (
        <div className="ad-banner">
            <a href={ad.targetUrl} target="_blank" rel="noopener noreferrer">
                <img src={ad.imageUrl} alt={ad.headline} />
                <h3>{ad.headline}</h3>
                <p>{ad.description}</p>
            </a>
        </div>
    );
};

export default Newsapp;