import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';


function HomePage({ apiKey }) {
    const [featuredRecipes, setFeaturedRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchFeaturedRecipes = async () => {
        try {
          const response = await fetch(
            `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=3`
          );
          const data = await response.json();
          setFeaturedRecipes(data.recipes);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchFeaturedRecipes();
    }, [apiKey]);
  
    return (
      <div className="home-page">
        {/* Hero Banner */}
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to Drallz Kitchen</h1>
            <p>Discover delicious recipes for every occasion</p>
            <div className="hero-buttons">
              <Link to="/recipes" className="hero-button">Browse Recipes</Link>
              <Link to="/recipes?category=vegetarian" className="hero-button secondary">
                Vegetarian Picks
              </Link>
            </div>
          </div>
        </section>
  
      
  
        {/* Quick Categories */}
        <section className="quick-categories container">
          <h2>Quick Categories</h2>
          <div className="category-buttons">
            <Link to="/recipes?category=vegetarian" className="category-button">
              <i className="fas fa-leaf"></i> Vegetarian
            </Link>
            <Link to="/recipes?category=dessert" className="category-button">
              <i className="fas fa-ice-cream"></i> Desserts
            </Link>
            <Link to="/recipes?category=italian" className="category-button">
              <i className="fas fa-pizza-slice"></i> Italian
            </Link>
            <Link to="/recipes?category=quick" className="category-button">
              <i className="fas fa-stopwatch"></i> Quick Meals
            </Link>
          </div>
        </section>
  
        {/* Cooking Tips */}
        <section className="cooking-tips container">
          <h2>Chef's Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">
                <i className="fas fa-knife-kitchen"></i>
              </div>
              <h3>Knife Skills</h3>
              <p>Learn proper chopping techniques to save time and improve presentation.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">
                <i className="fas fa-mortar-pestle"></i>
              </div>
              <h3>Seasoning</h3>
              <p>Layer your seasonings throughout the cooking process for deeper flavor.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">
                <i className="fas fa-thermometer-half"></i>
              </div>
              <h3>Temperature</h3>
              <p>Let meat rest after cooking to allow juices to redistribute evenly.</p>
            </div>
          </div>
        </section>
      </div>
    );
  }