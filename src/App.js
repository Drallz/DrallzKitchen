import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import "./styles/index.scss";


// Main App Component
export default function App() {
  return (
    <Router>
      <DrallzKitchenApp />
    </Router>
  );
}

function DrallzKitchenApp() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const API_KEY = 'e8819ce8de2a47c6a7f0c608c4d6f6be'; 

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="App">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar visible={sidebarVisible} toggleSidebar={toggleSidebar} />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home apiKey={API_KEY} />} />
          <Route path="/recipes" element={<Recipes apiKey={API_KEY} />} />
          <Route path="/recipes/:id" element={<RecipeDetail apiKey={API_KEY} />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

// Navbar Component
function Navbar({ toggleSidebar }) {
  return (
    <div className="navbar container">
      <Link to="/" className="logo">Drallz<span>Kit</span>Chen🍽️</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/settings">Settings</Link>
      </div>
      <div onClick={toggleSidebar} className="sidebar-btn">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
}

// Sidebar Component
function Sidebar({ visible, toggleSidebar }) {
  return (
    <div className={`sidebar ${visible ? 'visible' : 'hidden'}`}>
      <div className="sidebar-content">
        <Link to="/" onClick={toggleSidebar}>Home</Link>
        <Link to="/recipes" onClick={toggleSidebar}>Recipes</Link>
        <Link to="/settings" onClick={toggleSidebar}>Settings</Link>
      </div>
    </div>
  );
}

// Home Component (Main Landing Page)
function Home({ apiKey }) {
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

  const RecipeCard = ({ recipe }) => (
    <Link to={`/recipes/${recipe.id}`} className="recipe-card">
      <div className="recipe-image">
        <img 
          src={recipe.image || `https://spoonacular.com/recipeImages/${recipe.id}-556x370.jpg`} 
          alt={recipe.title} 
        />
        {recipe.vegetarian && <span className="badge vegetarian">Vegetarian</span>}
      </div>
      <div className="recipe-content">
        <h3>{recipe.title}</h3>
        <div className="recipe-meta">
          <span><i className="far fa-clock"></i> {recipe.readyInMinutes || 'N/A'} mins</span>
          <span><i className="fas fa-utensils"></i> {recipe.servings || 'N/A'} servings</span>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="home-page">
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

      <section className="featured-section container">
        <h2>Today's Specials</h2>
        {loading && <div className="loading-spinner"></div>}
        {error && <div className="error-message">{error}</div>}
        {!loading && !error && (
          <div className="featured-recipes">
            {featuredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

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
        </div>
      </section>
    </div>
  );
}

// Recipes Component
function Recipes({ apiKey }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const url = searchQuery 
          ? `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}`
          : `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=12`;
        
        const response = await fetch(url);
        const data = await response.json();
        setRecipes(data.recipes || data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [apiKey, searchQuery]);

  const RecipeCard = ({ recipe }) => (
    <Link to={`/recipes/${recipe.id}`} className="recipe-card">
      <div className="recipe-image">
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <div className="recipe-content">
        <h3>{recipe.title}</h3>
        <div className="recipe-meta">
          <span>Ready in: {recipe.readyInMinutes} mins</span>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="recipes-page container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading && <div className="loading">Loading recipes...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && (
        <div className="recipes-grid">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

// RecipeDetail Component
function RecipeDetail({ apiKey }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
        );
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id, apiKey]);

  if (loading) return <div className="loading">Loading recipe details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="recipe-detail container">
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      
      <div className="recipe-meta">
        <span>⏱️ {recipe.readyInMinutes} mins</span>
        <span>🍽️ {recipe.servings} servings</span>
      </div>
      
      <div className="recipe-content">
        <div className="ingredients">
          <h2>Ingredients</h2>
          <ul>
            {recipe.extendedIngredients?.map(ingredient => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        </div>
        
        <div className="instructions">
          <h2>Instructions</h2>
          <div dangerouslySetInnerHTML={{ __html: recipe.instructions || 'No instructions provided' }} />
        </div>
      </div>
    </div>
  );
}

// Settings Component
function Settings() {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="settings-page container">
      <h1>Settings</h1>
      <div className="settings-form">
        <div className="setting-group">
          <label>Theme:</label>
          <select name="theme" value={settings.theme} onChange={handleChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        
        <div className="setting-group">
          <label>
            <input 
              type="checkbox" 
              name="notifications" 
              checked={settings.notifications} 
              onChange={handleChange} 
            />
            Enable Notifications
          </label>
        </div>
        
        <button className="save-btn">Save Settings</button>
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>DrallzKitchen</h3>
            <p>Delicious recipes for every home cook</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/recipes">Recipes</Link></li>
              <li><Link to="/settings">Settings</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} DrallzKitchen</p>
        </div>
      </div>
    </footer>
  );
}