import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [email, setEmail] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const API_KEY = 'e8819ce8de2a47c6a7f0c608c4d6f6be'; // Replace with your actual API key
  const BASE_URL = 'https://api.spoonacular.com/recipes';

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  const categories = [
    { id: 'all', name: 'All Recipes' },
    { id: 'vegetarian', name: 'Vegetarian' },
    { id: 'vegan', name: 'Vegan' },
    { id: 'glutenFree', name: 'Gluten Free' },
    { id: 'dairyFree', name: 'Dairy Free' }
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let url = `${BASE_URL}/random?apiKey=${API_KEY}&number=12`;
        
        // Add dietary filters if not 'all'
        if (selectedCategory !== 'all') {
          url += `&tags=${selectedCategory}`;
        }
        
        // Add search query if present
        if (searchQuery) {
          url = `${BASE_URL}/complexSearch?apiKey=${API_KEY}&query=${searchQuery}&number=12`;
        }

        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        
        const data = await response.json();
        
        // Handle both random and search endpoints
        const recipesData = data.recipes || data.results;
        setRecipes(recipesData || []);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [selectedCategory, searchQuery]);

  const filteredRecipes = selectedCategory === 'all' 
    ? recipes 
    : recipes.filter(recipe => {
        // Handle different API response structures
        if (recipe.vegetarian && selectedCategory === 'vegetarian') return true;
        if (recipe.vegan && selectedCategory === 'vegan') return true;
        if (recipe.glutenFree && selectedCategory === 'glutenFree') return true;
        if (recipe.dairyFree && selectedCategory === 'dairyFree') return true;
        return false;
      });

  return (
    <div className="App">
      <Navbar toggleSidebar={toggleSidebar} />
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero">
          <h1 className="hero-title">Welcome to Drallz Kitchen</h1>
          <p className="hero-subtitle">
            Discover mouth-watering recipes, cooking tips, and your next favorite dish.
          </p>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </section>

        {/* Featured Recipes */}
        <section className="featured-recipes container">
          <h2 className="section-title">Featured Recipes</h2>
          
          {/* Category Filter */}
          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Loading and Error States */}
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading delicious recipes...</p>
            </div>
          )}
          
          {error && (
            <div className="error-message">
              <p>Error loading recipes: {error}</p>
              <button onClick={() => window.location.reload()} className="retry-btn">
                Retry
              </button>
            </div>
          )}
          
          {/* Recipe Grid */}
          {!loading && !error && (
            <>
              {filteredRecipes.length > 0 ? (
                <div className="recipes-grid">
                  {filteredRecipes.map(recipe => (
                    <div key={recipe.id} className="recipe-card">
                      <div className="recipe-image">
                        <img 
                          src={recipe.image || `https://spoonacular.com/recipeImages/${recipe.id}-556x370.jpg`} 
                          alt={recipe.title} 
                          onError={(e) => {
                            e.target.src = '/placeholder-food.jpg'; // Fallback image
                          }}
                        />
                        <div className="category-badge">
                          {recipe.vegetarian ? 'Vegetarian' : 
                           recipe.vegan ? 'Vegan' : 'Regular'}
                        </div>
                      </div>
                      <div className="recipe-content">
                        <h3 className="recipe-title">{recipe.title}</h3>
                        <p className="recipe-description">
                          {recipe.summary?.replace(/<[^>]*>?/gm, '').substring(0, 100)}...
                        </p>
                        <div className="recipe-meta">
                          <span className="prep-time">
                            <i className="far fa-clock"></i> {recipe.readyInMinutes} mins
                          </span>
                          <span className="servings">
                            <i className="fas fa-utensils"></i> {recipe.servings} servings
                          </span>
                        </div>
                        <a 
                          href={recipe.sourceUrl || `https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="view-recipe-btn"
                        >
                          View Recipe
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <p>No recipes found. Try a different search or category.</p>
                </div>
              )}
            </>
          )}
        </section>

        {/* Cooking Tips */}
        <section className="cooking-tips container">
          <h2 className="section-title">Professional Cooking Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>Knife Skills</h3>
              <p>Master the basic cuts: julienne, dice, and chiffonade to improve your prep time and presentation.</p>
            </div>
            <div className="tip-card">
              <h3>Seasoning</h3>
              <p>Season in layers - a little salt at different stages of cooking builds more complex flavors.</p>
            </div>
            <div className="tip-card">
              <h3>Temperature Control</h3>
              <p>Let meat rest after cooking to allow juices to redistribute for maximum tenderness.</p>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="newsletter-section">
          <div className="container">
            <div className="newsletter-content">
              <h2>Subscribe to Our Newsletter</h2>
              <p>Get the latest recipes and cooking tips delivered to your inbox weekly.</p>
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>DrallzKitchen</h3>
              <p>Bringing delicious recipes to your home since 2023. Our mission is to make cooking accessible and enjoyable for everyone.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/recipes">Recipes</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Categories</h4>
              <ul>
                {categories.slice(1).map(category => (
                  <li key={category.id}>
                    <a href={`/category/${category.id}`}>{category.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect With Us</h4>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-pinterest"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} DrallzKitchen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;