// Mouse position tracking
let mouseX = 0;
let mouseY = 0;

// Button size tracking
let noButtonSize = 1;
let yesButtonSize = 1;

// Get button elements
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Check if mouse is near the No button
    checkProximity();
});

// Function to calculate distance between two points
function getDistance(x1, y1, x2, y2) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

// Function to check if mouse is too close to No button
function checkProximity() {
    const buttonRect = noBtn.getBoundingClientRect();
    
    // Get button center position
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;
    
    // Calculate distance from mouse to button center
    const distance = getDistance(mouseX, mouseY, buttonCenterX, buttonCenterY);
    
    // Define safe distance (danger zone radius)
    const safeDistance = 150;
    
    // If mouse is too close, move the button!
    if (distance < safeDistance) {
        moveButton();
    }
}

// Function to move the No button away from mouse
function moveButton() {
    const buttonRect = noBtn.getBoundingClientRect();
    
    // Get button center
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;
    
    // Calculate direction from button to mouse
    const deltaX = mouseX - buttonCenterX;
    const deltaY = mouseY - buttonCenterY;
    const distance = getDistance(mouseX, mouseY, buttonCenterX, buttonCenterY);
    
    // Normalize the direction (create unit vector)
    const directionX = deltaX / distance;
    const directionY = deltaY / distance;
    
    // How far to move the button
    const moveDistance = 250;
    
    // Calculate new position (opposite direction from mouse)
    let newX = buttonCenterX - (directionX * moveDistance);
    let newY = buttonCenterY - (directionY * moveDistance);
    
    // Get window dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;
    
    // Keep button within screen bounds
    newX = Math.max(buttonWidth / 2, Math.min(newX, windowWidth - buttonWidth / 2));
    newY = Math.max(buttonHeight / 2, Math.min(newY, windowHeight - buttonHeight / 2));
    
    // Convert center position to top-left position
    newX = newX - buttonWidth / 2;
    newY = newY - buttonHeight / 2;
    
    // Apply position
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.transform = 'none'; // Reset any transforms
    
    // Shrink No button and grow Yes button
    shrinkNoButton();
    growYesButton();
}

// Shrink the No button
function shrinkNoButton() {
    noButtonSize = Math.max(0.3, noButtonSize - 0.1); // Minimum 30% size
    noBtn.style.transform = `scale(${noButtonSize})`;
}

// Grow the Yes button
function growYesButton() {
    yesButtonSize = Math.min(1.5, yesButtonSize + 0.1); // Maximum 150% size
    yesBtn.style.transform = `scale(${yesButtonSize})`;
}

// Yes button click handler
yesBtn.addEventListener('click', () => {
    // Redirect to surprise page
    window.location.href = 'surprise.html';
});

// No button click handler (just in case someone manages to click it)
noBtn.addEventListener('click', () => {
    // Move it away even on click attempt
    moveButton();
});

// Add hover effect to Yes button
yesBtn.addEventListener('mouseenter', () => {
    yesBtn.style.transform = `scale(${yesButtonSize * 1.1})`;
});

yesBtn.addEventListener('mouseleave', () => {
    yesBtn.style.transform = `scale(${yesButtonSize})`;
});