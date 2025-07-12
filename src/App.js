import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
     <Navbar />
     <main className="main-content">
     {/* Hero Section */}
     <section className="hero">
          <h1 className="hero-title">Welcome to Drallz Kitchen</h1>
          <p className="hero-subtitle">
            Discover mouth-watering recipes, cooking tips, and your next favorite dish.
          </p>
          <button className="hero-button">Explore Quick Recipes</button>
        </section>
      </main>
    </div>
  );
}

export default App;
