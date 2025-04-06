class ThemeService {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.init();
  }

  init() {
    // Load saved theme preference
    chrome.storage.sync.get('theme', (data) => {
      const theme = data.theme || 'light';
      this.setTheme(theme);
    });

    // Add event listener for theme toggle
    this.themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
    });
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    chrome.storage.sync.set({ theme });
  }
}

export default ThemeService; 