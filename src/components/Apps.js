import React from "react";
import "./Dashboard.css";

const Apps = () => {
  const mainApps = [
    {
      name: "Kite",
      description: "Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices.",
      image: "http://localhost:3001/media/images/kite.png",
      category: "Trading Platform"
    },
    {
      name: "Console",
      description: "The central dashboard for your Investa account. Gain insights into your trades and investments with in-depth reports and visualisations.",
      image: "http://localhost:3001/media/images/console.png",
      category: "Dashboard"
    },
    {
      name: "Coin",
      description: "Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices.",
      image: "http://localhost:3001/media/images/coin.png",
      category: "Mutual Funds"
    },
    {
      name: "Kite Connect API",
      description: "Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase.",
      image: "http://localhost:3001/media/images/kiteconnect.png",
      category: "API Platform"
    },
    {
      name: "Varsity Mobile",
      description: "An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go.",
      image: "http://localhost:3001/media/images/varsity.png",
      category: "Education"
    }
  ];

  const partnerApps = [
    {
      name: "Smallcase",
      description: "Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs.",
      image: "http://localhost:3001/media/images/smallcaseLogo.png",
      category: "Partner Platform"
    },
    {
      name: "Streak",
      description: "Systematic trading platform that allows you to create and backtest strategies without coding.",
      image: "http://localhost:3001/media/images/streakLogo.png",
      category: "Partner Platform"
    },
    {
      name: "Ditto",
      description: "Personalized advice on life and health insurance. No spam and no mis-selling.",
      image: "http://localhost:3001/media/images/dittoLogo.png",
      category: "Partner Platform"
    },
    {
      name: "Sensibull",
      description: "Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more.",
      image: "http://localhost:3001/media/images/sensibullLogo.svg",
      category: "Partner Platform"
    },
    {
      name: "Tijori",
      description: "Investment research platform that offers detailed insights on stocks, sectors, supply chains, and more.",
      image: "http://localhost:3001/media/images/tijori.svg",
      category: "Partner Platform"
    },
    {
      name: "GoldenPi",
      description: "An online platform that enables investors to discover, analyze, and invest in high-quality fixed-income instruments.",
      image: "http://localhost:3001/media/images/goldenpiLogo.png",
      category: "Partner Platform"
    }
  ];

  return (
    <>
      <div className="apps-header">
        <h3 className="title">Investa Apps</h3>
        <p className="apps-subtitle">Explore our trading and investment platforms</p>
      </div>

      <div className="apps-section">
        <h4 className="apps-section-title">Main Platforms</h4>
        <div className="apps-grid">
          {mainApps.map((app, index) => (
            <div key={index} className="app-card">
              <div className="app-image-container">
                <img 
                  src={app.image} 
                  alt={app.name}
                  className="app-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="app-image-placeholder" style={{ display: 'none' }}>
                  {app.name.charAt(0)}
                </div>
              </div>
              <div className="app-content">
                <div className="app-category">{app.category}</div>
                <h5 className="app-name">{app.name}</h5>
                <p className="app-description">{app.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="apps-section">
        <h4 className="apps-section-title">Partner Platforms</h4>
        <p className="apps-section-subtitle">Extend your trading and investment experience even further with our partner platforms</p>
        <div className="apps-grid">
          {partnerApps.map((app, index) => (
            <div key={index} className="app-card">
              <div className="app-image-container">
                <img 
                  src={app.image} 
                  alt={app.name}
                  className="app-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="app-image-placeholder" style={{ display: 'none' }}>
                  {app.name.charAt(0)}
                </div>
              </div>
              <div className="app-content">
                <div className="app-category">{app.category}</div>
                <h5 className="app-name">{app.name}</h5>
                <p className="app-description">{app.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Apps;