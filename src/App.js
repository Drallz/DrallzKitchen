import { useState } from 'react';
import Navbar from "./components/Navbar";

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [email, setEmail] = useState('');

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  // Sample recipe data
  const recipes = [
    {
      id: 1,
      title: "Creamy Garlic Pasta",
      category: "pasta",
      prepTime: "15 mins",
      cookTime: "20 mins",
      rating: 4.8,
      image: "/drallzkitchen/src/styles/gar.jpeg",
      description: "A rich and creamy garlic pasta with parmesan and fresh herbs."
    },
    {
      id: 2,
      title: "Classic Beef Burger",
      category: "meat",
      prepTime: "10 mins",
      cookTime: "15 mins",
      rating: 4.9,
      image: "burger.jpg",
      description: "Juicy beef patty with cheese, lettuce, and special sauce."
    },
    {
      id: 3,
      title: "Avocado Toast",
      category: "vegetarian",
      prepTime: "5 mins",
      cookTime: "5 mins",
      rating: 4.5,
      image: "avocado-toast.jpg",
      description: "Simple yet delicious smashed avocado on sourdough bread."
    },
    {
      id: 4,
      title: "Chocolate Lava Cake",
      category: "dessert",
      prepTime: "20 mins",
      cookTime: "12 mins",
      rating: 5.0,
      image: "lava-cake.jpg",
      description: "Warm chocolate cake with a gooey molten center."
    },
    {
      id: 5,
      title: "Vegetable Stir Fry",
      category: "vegetarian",
      prepTime: "15 mins",
      cookTime: "10 mins",
      rating: 4.6,
      image: "stir-fry.jpg",
      description: "Colorful vegetables in a savory garlic sauce."
    },
    {
      id: 6,
      title: "Homemade Pizza",
      category: "italian",
      prepTime: "30 mins",
      cookTime: "15 mins",
      rating: 4.7,
      image: "pizza.jpg",
      description: "Classic pizza with your choice of toppings."
    }
  ];

  const categories = [
    { id: 'all', name: 'All Recipes' },
    { id: 'vegetarian', name: 'Vegetarian' },
    { id: 'meat', name: 'Meat' },
    { id: 'pasta', name: 'Pasta' },
    { id: 'dessert', name: 'Dessert' },
    { id: 'italian', name: 'Italian' }
  ];

  const filteredRecipes = selectedCategory === 'all' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === selectedCategory);

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
          <button className="hero-button">Explore Quick Recipes</button>
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
          
          {/* Recipe Grid */}
          <div className="recipes-grid">
            {filteredRecipes.map(recipe => (
              <div key={recipe.id} className="recipe-card">
                <div className="recipe-image">
                  <img src={`/images/${recipe.image}`} alt={recipe.title} />
                  <div className="category-badge">{recipe.category}</div>
                </div>
                <div className="recipe-content">
                  <h3 className="recipe-title">{recipe.title}</h3>
                  <p className="recipe-description">{recipe.description}</p>
                  <div className="recipe-meta">
                    <span className="prep-time"><i className="far fa-clock"></i> {recipe.prepTime}</span>
                    <span className="cook-time"><i className="fas fa-fire"></i> {recipe.cookTime}</span>
                    <span className="rating"><i className="fas fa-star"></i> {recipe.rating}</span>
                  </div>
                  <button className="view-recipe-btn">View Recipe</button>
                </div>
              </div>
            ))}
          </div>
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
                <li><a href="/category/vegetarian">Vegetarian</a></li>
                <li><a href="/category/meat">Meat</a></li>
                <li><a href="/category/dessert">Dessert</a></li>
                <li><a href="/category/pasta">Pasta</a></li>
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