// Love & Romance Fun Facts
const loveFacts = [
    "Couples who laugh together have stronger relationships! 😄💕",
    "Holding hands can actually sync your heartbeats and reduce pain! 💑",
    "The heart symbol ❤️ we use today comes from the shape of ivy leaves, which represent fidelity! 🌿",
    "Falling in love has similar neurological effects as getting high on cocaine! 🧠✨",
    "Looking into each other's eyes can make strangers fall in love! 👀💘",
    "Butterflies in your stomach are real - it's adrenaline from attraction! 🦋",
    "Couples who celebrate small moments together are happier long-term! 🎉💚",
    "Cuddling releases oxytocin, the 'love hormone' that reduces stress! 🤗",
    "The longer you're in a relationship, the more you start to look alike! 👫",
    "Your heart rate syncs with your partner's when you're in love! 💓💓",
    "Chocolates and love are linked - chocolate contains phenylethylamine, the 'love chemical'! 🍫💕",
    "Thinking about love and relationships can actually make you more creative! 🎨❤️",
    "Couples who travel together report being more satisfied in their relationships! ✈️💑",
    "The average person falls in love 7 times before marriage! 💘",
    "Hugging for 20 seconds releases oxytocin and can make you trust someone more! 🫂",
    "Love can literally make you feel less pain! 💊❤️",
    "Kissing someone you love can reduce stress and increase happiness! 😘",
    "When you see someone you love, your pupils dilate! 👁️✨",
    "Couples who are friends first tend to have longer relationships! 👫💚",
    "Playing together keeps love alive - couples who play games laugh more! 🎮❤️"
];

// Get DOM elements
const funFactElement = document.getElementById('fun-fact');
const newFactBtn = document.getElementById('new-fact-btn');

// Track which facts have been shown to avoid immediate repeats
let shownFacts = [];

// Function to get a random love fact
function getRandomLoveFact() {
    // If we've shown all facts, reset the list
    if (shownFacts.length >= loveFacts.length) {
        shownFacts = [];
    }
    
    // Get facts that haven't been shown yet
    const availableFacts = loveFacts.filter((fact, index) => !shownFacts.includes(index));
    
    // Pick a random one
    const randomIndex = Math.floor(Math.random() * availableFacts.length);
    const selectedFact = availableFacts[randomIndex];
    
    // Mark this fact as shown
    const originalIndex = loveFacts.indexOf(selectedFact);
    shownFacts.push(originalIndex);
    
    return selectedFact;
}

// Function to display fun fact
function displayFunFact() {
    // Get a random love fact
    const fact = getRandomLoveFact();
    
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
