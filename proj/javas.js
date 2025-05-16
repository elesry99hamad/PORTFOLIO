// File: js/scripts.js
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme on page load
  initTheme();

  // Set up theme toggle button event listener
  const themeToggleBtn = document.querySelector('button[onclick="toggleTheme()"]');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
    themeToggleBtn.removeAttribute('onclick'); // Remove inline handler to avoid duplicates
  }

  // Display greeting only on index page
  if (window.location.pathname.endsWith('index.html') || 
      window.location.pathname.endsWith('/')) {
    displayGreeting();
  }
});

function displayGreeting() {
  const hour = new Date().getHours();
  let greeting;
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";
  
  let welcomeSection = document.querySelector('.welcome-section');
  if (!welcomeSection) {
    welcomeSection = document.createElement('section');
    welcomeSection.className = 'welcome-section';
    
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    if (header) {
      header.after(welcomeSection);
    } else if (main) {
      main.prepend(welcomeSection);
    } else {
      document.body.prepend(welcomeSection);
    }
  }
  
  welcomeSection.innerHTML = `
    <h1 class="dynamic-greeting">${greeting}! Welcome to My Portfolio</h1>
    <p class="welcome-message">
      I'm a passionate developer specializing in web technologies and cybersecurity solutions. 
      Explore my work and feel free to reach out!
    </p>
  `;
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  
  // Update ARIA label for accessibility
  const themeToggleBtn = document.querySelector('.theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.setAttribute('aria-label', 
      isDarkMode ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

function initTheme() {
  // Check for saved theme preference or use preferred color scheme
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedMode = localStorage.getItem('darkMode');
  
  // Apply theme based on preferences
  if (savedMode === 'true' || (savedMode === null && prefersDark)) {
    document.body.classList.add('dark-mode');
  }
}