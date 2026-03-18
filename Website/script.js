const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

// =========================================
// DARK/LIGHT MODE LOGIC
// =========================================

// 1. Check if the user previously saved a theme preference
let theme = localStorage.getItem('portfolio-theme');

// 2. Default is dark (no classes). If they saved "light", apply it immediately
if (theme === 'light') {
    body.classList.add('light-mode');
}

// 3. Listen for clicks on the toggle button
darkModeToggle.addEventListener('click', function (event) {
    event.preventDefault();

    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        localStorage.setItem('portfolio-theme', 'light');
    } else {
        localStorage.setItem('portfolio-theme', 'dark');
    }
});

// =========================================
// CURSOR LOGIC
// =========================================
const cursorOutline = document.querySelector('.cursor-outline');
const cursorDot = document.querySelector('.cursor-dot');
// Target interactive elements (links, buttons, form inputs)
const allInteractables = document.querySelectorAll('a, button, input, textarea');

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

// Track the real mouse
window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // The dot moves instantly
    cursorDot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
});

// Smooth trailing loop for the hollow ring
function animateCursor() {
    // 0.15 is the speed. Lower = slower trailing
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    cursorOutline.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Make the cursor interact with links
allInteractables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('hovered');
        cursorDot.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('hovered');
        cursorDot.classList.remove('hovered');
    });
});