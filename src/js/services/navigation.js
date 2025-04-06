// Navigation service for handling view state and navigation
class NavigationService {
  constructor() {
    this.currentView = 'home';
    this.editingKey = null;
  }

  showHome() {
    const list = document.getElementById("shortcut-list");
    const addUpdateSection = document.getElementById("add-update-section");
    const backBtn = document.getElementById("back-btn");
    const deleteBtn = document.getElementById("delete-btn");
    
    list.style.display = "none";
    addUpdateSection.style.display = "block";
    backBtn.style.display = "none";
    deleteBtn.style.display = "none";
    this.currentView = 'home';
    this.editingKey = null;
    
    // Clear form
    document.getElementById("key").value = "";
    document.getElementById("url").value = "";
    this.focusFirstInput();
  }

  showShortcutsList() {
    const list = document.getElementById("shortcut-list");
    const addUpdateSection = document.getElementById("add-update-section");
    const backBtn = document.getElementById("back-btn");
    
    list.style.display = "block";
    addUpdateSection.style.display = "none";
    backBtn.style.display = "block";
    this.currentView = 'list';
  }

  showEditShortcut(key, url) {
    const list = document.getElementById("shortcut-list");
    const addUpdateSection = document.getElementById("add-update-section");
    const backBtn = document.getElementById("back-btn");
    const deleteBtn = document.getElementById("delete-btn");
    
    list.style.display = "none";
    addUpdateSection.style.display = "block";
    backBtn.style.display = "block";
    deleteBtn.style.display = "block";
    this.currentView = 'edit';
    this.editingKey = key;
    
    document.getElementById("key").value = key;
    document.getElementById("url").value = url;
    this.focusFirstInput();
  }

  focusFirstInput() {
    document.getElementById("key").focus();
  }

  getCurrentView() {
    return this.currentView;
  }

  getEditingKey() {
    return this.editingKey;
  }
}

export default new NavigationService(); 