// app.js
async function loadGames() {
    try {
        // Fetch the data from your "Admin Panel" file
        const response = await fetch('data.json');
        const data = await response.json();
        
        // 1. Load Featured Games (Top 3)
        const featuredContainer = document.getElementById('featured-container');
        featuredContainer.innerHTML = ''; // Clear container
        
        data.featuredGames.forEach(game => {
            featuredContainer.innerHTML += `
                <div class="featured-app">
                    <img src="${game.icon}" alt="${game.name}">
                    <h4>${game.name}</h4>
                    <a href="${game.downloadLink}" class="btn-download-large" target="_blank">Download</a>
                </div>
            `;
        });

        // 2. Load List Games
        const listContainer = document.getElementById('list-container');
        document.getElementById('loading').style.display = 'none'; // Hide loading text
        listContainer.innerHTML = ''; // Clear container
        
        data.gameList.forEach(game => {
            listContainer.innerHTML += `
                <div class="game-item">
                    <div class="game-left">
                        <img src="${game.icon}" class="game-icon" alt="${game.name}">
                        <div class="game-details">
                            <h3>${game.name}</h3>
                            <p class="bonus">Sign Up Bonus ${game.bonus}</p>
                            <p class="withdraw">Min Withdraw ${game.minWithdraw}</p>
                        </div>
                    </div>
                    <a href="${game.downloadLink}" class="btn-download-small" target="_blank">
                        <i class="fas fa-download"></i> Get
                    </a>
                </div>
            `;
        });

    } catch (error) {
        document.getElementById('loading').innerText = "Failed to load game data.";
        console.error("Error loading JSON:", error);
    }
}

// Run the function when the website loads
window.onload = loadGames;