// ShortcutsList module for handling the shortcuts list display and interactions
import StorageService from '../services/storage.js';
import NavigationService from '../services/navigation.js';

class ShortcutsList {
  constructor() {
    this.listContainer = document.querySelector("#shortcut-list .list-container");
    this.searchInput = document.getElementById("search-input");
    this.setupEventListeners();
  }

  async loadShortcuts() {
    this.shortcuts = await StorageService.getShortcuts();
    this.searchInput.value = ''; // Clear the search input
    this.filterShortcuts();
  }

  filterShortcuts() {
    const searchTerm = this.searchInput.value.toLowerCase();
    this.listContainer.innerHTML = "";
    
    if (Object.keys(this.shortcuts).length === 0) {
      this.listContainer.innerHTML = '<div class="shortcut-item">No shortcuts added yet.</div>';
      return;
    }

    const filteredShortcuts = Object.entries(this.shortcuts).filter(([key, url]) => {
      return key.toLowerCase().includes(searchTerm) || 
             url.toLowerCase().includes(searchTerm);
    });

    if (filteredShortcuts.length === 0) {
      this.listContainer.innerHTML = '<div class="shortcut-item">No shortcuts found.</div>';
      return;
    }

    for (const [key, url] of filteredShortcuts) {
      this.addShortcutToList(key, url);
    }
  }

  addShortcutToList(key, url) {
    const item = document.createElement("div");
    item.className = "shortcut-item";
    item.innerHTML = `
      <div class="shortcut-content">
        <div class="shortcut-key">${key}</div>
        <div class="shortcut-url">${url}</div>
      </div>
      <button class="edit-btn" data-key="${key}">Edit</button>
    `;
    this.listContainer.appendChild(item);

    // Make the entire item clickable
    item.addEventListener("click", (e) => {
      // Don't trigger if clicking the edit button
      if (!e.target.closest('.edit-btn')) {
        NavigationService.showEditShortcut(key, url);
      }
    });

    // Keep the edit button click handler
    const editBtn = item.querySelector('.edit-btn');
    editBtn.addEventListener("click", () => {
      NavigationService.showEditShortcut(key, url);
    });
  }

  setupEventListeners() {
    document.getElementById("view-all-btn").addEventListener("click", () => {
      NavigationService.showShortcutsList();
      this.loadShortcuts();
    });

    document.getElementById("back-btn").addEventListener("click", () => {
      const currentView = NavigationService.getCurrentView();
      if (currentView === 'list') {
        NavigationService.showHome();
      } else if (currentView === 'edit') {
        NavigationService.showShortcutsList();
        this.loadShortcuts();
      }
    });

    this.searchInput.addEventListener("input", () => {
      this.filterShortcuts();
    });
  }
}

export default new ShortcutsList(); 