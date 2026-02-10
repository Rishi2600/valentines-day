// Fun Facts API endpoint
const FUN_FACTS_API = 'https://uselessfacts.jsph.pl/random.json?language=en';

// Fallback fun facts in case API fails
const fallbackFacts = [
    "Honey never spoils. Archaeologists have found 3000-year-old honey in Egyptian tombs that was still edible! 🍯",
    "Octopuses have three hearts and blue blood! 🐙",
    "A group of flamingos is called a 'flamboyance'! 🦩",
    "Bananas are berries, but strawberries aren't! 🍌",
    "The shortest war in history lasted 38 minutes! ⚔️",
    "Cows have best friends and get stressed when separated! 🐮",
    "The heart of a shrimp is located in its head! 🦐",
    "A single strand of spaghetti is called a 'spaghetto'! 🍝",
    "Sea otters hold hands when they sleep so they don't drift apart! 🦦",
    "Penguins propose to their mates with a pebble! 🐧💍"
];

// Get DOM elements
const funFactElement = document.getElementById('fun-fact');
const newFactBtn = document.getElementById('new-fact-btn');

// Function to fetch fun fact from API
async function fetchFunFact() {
    try {
        const response = await fetch(FUN_FACTS_API);
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        const data = await response.json();
        return data.text;
    } catch (error) {
        console.log('API failed, using fallback facts');
        // Return random fallback fact
        return fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
    }
}

// Function to display fun fact
async function displayFunFact() {
    // Show loading state
    funFactElement.innerHTML = '<p class="loading">Loading...</p>';
    
    // Fetch and display fact
    const fact = await fetchFunFact();
    
    // Display with animation
    funFactElement.innerHTML = `<p>${fact}</p>`;
    funFactElement.style.opacity = '0';
    
    setTimeout(() => {
        funFactElement.style.transition = 'opacity 0.5s ease-in';
        funFactElement.style.opacity = '1';
    }, 100);
}

// Load initial fun fact when page loads
displayFunFact();

// Button click handler for new fact
newFactBtn.addEventListener('click', () => {
    displayFunFact();
    
    // Add button click animation
    newFactBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        newFactBtn.style.transform = 'scale(1)';
    }, 100);
});