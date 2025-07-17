import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                // Replace with your actual API call
                const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information`);
                const data = await response.json();
                setRecipe(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) return <div className="loading">Loading recipe details...</div>;
    if (error) return <div className="error">Error: {error}</div>;
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
                        {recipe.extendedIngredients.map(ingredient => (
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