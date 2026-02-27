// --- Main Function to Initialize Website ---
async function initializeWebsite() {
    try {
        // Fetch the data from your data.json file
        const response = await fetch('data.json');
        const data = await response.json();

        // Pass the data to populate functions
        populateFeaturedApps(data.featuredApps);
        populateGameList(data.gameList);

    } catch (error) {
        console.error("Failed to fetch game data:", error);
    }
}

// --- Function to Populate Featured Apps ---
function populateFeaturedApps(apps) {
    const container = document.getElementById('featured-container');
    container.innerHTML = ''; // Clear any existing content

    apps.forEach(app => {
        const card = createFeaturedAppCard(app);
        container.appendChild(card);
    });
}

// --- Helper to Create Featured App Card HTML ---
function createFeaturedAppCard(app) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'featured-app-card';

    // Build the inner HTML based on data.json
    cardDiv.innerHTML = `
        <div class="featured-icon">${app.icon}</div>
        <p class="featured-title">${app.title}</p>
        <p class="featured-detail">${app.detail}</p>
        <a href="${app.link}" class="featured-btn">${app.buttonText}</a>
    `;

    return cardDiv;
}

// --- Function to Populate All Games List ---
function populateGameList(apps) {
    const container = document.getElementById('game-list');
    container.innerHTML = ''; // Clear any existing content

    apps.forEach((app, index) => {
        // Create a unique placeholder ID for the first few items based on the image
        const placeholderId = index < 6 ? String(index + 1) : '';
        const listItem = createGameListItem(app, placeholderId);
        container.appendChild(listItem);
    });
}

// --- Helper to Create Game List Item HTML ---
function createGameListItem(app, placeholderId) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'game-list-item';

    // If a placeholder ID exists, show it in the icon container. Otherwise, show an image.
    const iconHTML = placeholderId 
        ? `<div class="icon-container">${placeholderId}</div>`
        : `<div class="icon-container"><img src="${app.icon}" alt="${app.title} Icon" class="app-icon"></div>`;

    // Build the inner HTML based on data.json
    itemDiv.innerHTML = `
        <div class="game-item-left">
            ${iconHTML}
            <div class="game-item-details">
                <p class="app-name">${app.title}</p>
                <p class="app-detail">${app.detail}</p>
            </div>
        </div>
        <a href="${app.link}" class="btn-get">Get</a>
    `;

    return itemDiv;
}

// --- Run Website Initialization on Page Load ---
window.onload = initializeWebsite;
