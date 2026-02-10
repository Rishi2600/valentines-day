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
    const safeDistance = 120;
    
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
    
    // Get window dimensions and button size
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;
    
    // Add safety padding from edges
    const padding = 20;
    const edgeThreshold = 50; // How close to edge before we consider it "stuck"
    
    // Check if button is stuck at any edge
    const isAtLeftEdge = buttonRect.left <= padding + edgeThreshold;
    const isAtRightEdge = buttonRect.right >= windowWidth - padding - edgeThreshold;
    const isAtTopEdge = buttonRect.top <= padding + edgeThreshold;
    const isAtBottomEdge = buttonRect.bottom >= windowHeight - padding - edgeThreshold;
    
    // If button is stuck at corner or edge, teleport to random position
    if ((isAtLeftEdge || isAtRightEdge) && (isAtTopEdge || isAtBottomEdge)) {
        // Stuck in corner - teleport to opposite quadrant!
        teleportToSafePosition(isAtRightEdge, isAtBottomEdge);
        return;
    } else if (isAtLeftEdge || isAtRightEdge || isAtTopEdge || isAtBottomEdge) {
        // Stuck at edge - teleport to random position
        teleportToRandomPosition();
        return;
    }
    
    // Normal movement - calculate direction from button to mouse
    const deltaX = mouseX - buttonCenterX;
    const deltaY = mouseY - buttonCenterY;
    const distance = getDistance(mouseX, mouseY, buttonCenterX, buttonCenterY);
    
    // Normalize the direction (create unit vector)
    const directionX = deltaX / distance;
    const directionY = deltaY / distance;
    
    // How far to move the button
    const moveDistance = 120;
    
    // Calculate new CENTER position (opposite direction from mouse)
    let newCenterX = buttonCenterX - (directionX * moveDistance);
    let newCenterY = buttonCenterY - (directionY * moveDistance);
    
    // Convert center to top-left position FIRST
    let newX = newCenterX - buttonWidth / 2;
    let newY = newCenterY - buttonHeight / 2;
    
    // NOW clamp to screen bounds with padding
    newX = Math.max(padding, Math.min(newX, windowWidth - buttonWidth - padding));
    newY = Math.max(padding, Math.min(newY, windowHeight - buttonHeight - padding));
    
    // Apply position
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    
    // Shrink No button and grow Yes button
    shrinkNoButton();
    growYesButton();
}

// Teleport to opposite quadrant when stuck in corner
function teleportToSafePosition(isRight, isBottom) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const buttonRect = noBtn.getBoundingClientRect();
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;
    const padding = 20;
    
    // Teleport to opposite corner area
    let newX, newY;
    
    if (isRight && isBottom) {
        // Was in bottom-right, go to top-left area
        newX = padding + Math.random() * 100;
        newY = padding + Math.random() * 100;
    } else if (isRight && !isBottom) {
        // Was in top-right, go to bottom-left area
        newX = padding + Math.random() * 100;
        newY = windowHeight - buttonHeight - padding - Math.random() * 100;
    } else if (!isRight && isBottom) {
        // Was in bottom-left, go to top-right area
        newX = windowWidth - buttonWidth - padding - Math.random() * 100;
        newY = padding + Math.random() * 100;
    } else {
        // Was in top-left, go to bottom-right area
        newX = windowWidth - buttonWidth - padding - Math.random() * 100;
        newY = windowHeight - buttonHeight - padding - Math.random() * 100;
    }
    
    // Apply position with animation
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.transition = 'all 0.3s ease-out';
    
    setTimeout(() => {
        noBtn.style.transition = '';
    }, 300);
    
    shrinkNoButton();
    growYesButton();
}

// Teleport to completely random position
function teleportToRandomPosition() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const buttonRect = noBtn.getBoundingClientRect();
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;
    const padding = 20;
    
    // Random position in safe zone
    const maxX = windowWidth - buttonWidth - padding * 2;
    const maxY = windowHeight - buttonHeight - padding * 2;
    
    const newX = padding + Math.random() * maxX;
    const newY = padding + Math.random() * maxY;
    
    // Apply position
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.transition = 'all 0.3s ease-out';
    
    setTimeout(() => {
        noBtn.style.transition = '';
    }, 300);
    
    shrinkNoButton();
    growYesButton();
}

// Shrink the No button
function shrinkNoButton() {
    noButtonSize = Math.max(0.4, noButtonSize - 0.08); // Minimum 40% size, slower shrinking
    noBtn.style.transform = `scale(${noButtonSize})`;
    noBtn.style.transformOrigin = 'center center'; // Ensure scaling from center
}

// Grow the Yes button
function growYesButton() {
    yesButtonSize = Math.min(1.4, yesButtonSize + 0.08); // Maximum 140% size
    yesBtn.style.transform = `scale(${yesButtonSize})`;
    yesBtn.style.transformOrigin = 'center center';
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