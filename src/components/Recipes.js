import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                // Replace with your actual API call
                const response = await fetch('https://api.spoonacular.com/recipes/random?number=12');
                const data = await response.json();
                setRecipes(data.recipes);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    if (loading) return <div className="loading">Loading recipes...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="recipes-page container">
            <h1>All Recipes</h1>
            <div className="recipes-grid">
                {recipes.map(recipe => (
                    <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                        <RecipeCard recipe={recipe} />
                    </Link>
                ))}
            </div>
        </div>
    );
}