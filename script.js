const searchBtn = document.getElementById('searchBtn');
const ingredientInput = document.getElementById('ingredientInput');
const recipeResults = document.getElementById('recipeResults');
const recipeList = document.getElementById('recipeList');

searchBtn.addEventListener('click', searchRecipes);

async function searchRecipes() {
    const ingredients = ingredientInput.value.split(',').map(ingredient => ingredient.trim()).join(',');
    if (!ingredients) {
        alert('Please enter at least one ingredient.');
        return;
    }

    const apiKey = 'YOUR_SPOONACULAR_API_KEY'; // Add your API key here
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Clear previous results
        recipeList.innerHTML = '';
        
        // Display new results
        data.forEach(recipe => {
            const card = document.createElement('div');
            card.classList.add('recipeCard');
            card.innerHTML = `
                <img src="https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg" alt="${recipe.title}">
                <div class="recipeInfo">
                    <h3>${recipe.title}</h3>
                    <p>${recipe.description || 'No description available'}</p>
                </div>
            `;
            recipeList.appendChild(card);
        });

        recipeResults.classList.remove('hidden');
    } catch (error) {
        alert('Error fetching recipes. Please try again.');
    }
}

