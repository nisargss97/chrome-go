async function loadShortcuts() {
  const { shortcuts = {} } = await chrome.storage.sync.get("shortcuts");
  const listContainer = document.querySelector("#shortcut-list .list-container");
  listContainer.innerHTML = ""; // Clear any previous content

  // Check if there are shortcuts to display
  if (Object.keys(shortcuts).length === 0) {
    listContainer.innerHTML = '<div class="shortcut-item">No shortcuts added yet.</div>';
    return;
  }

  for (const key in shortcuts) {
    const item = document.createElement("div");
    item.className = "shortcut-item";
    item.innerHTML = `
      <div class="shortcut-content">
        <div class="shortcut-key">${key}</div>
        <div class="shortcut-url">${shortcuts[key]}</div>
      </div>
      <button class="edit-btn" data-key="${key}">Edit</button>
    `;
    listContainer.appendChild(item);

    // Add edit button event listener right after creating the button
    const editBtn = item.querySelector('.edit-btn');
    editBtn.addEventListener("click", () => {
      const key = editBtn.getAttribute("data-key");
      showEditShortcut(key, shortcuts[key]);
    });
  }
}

// Navigation state
let currentView = 'home'; // 'home', 'list', or 'edit'
let editingKey = null; // Track which shortcut is being edited

// Navigation functions
function showHome() {
  const list = document.getElementById("shortcut-list");
  const addUpdateSection = document.getElementById("add-update-section");
  const backBtn = document.getElementById("back-btn");
  const deleteBtn = document.getElementById("delete-btn");
  
  list.style.display = "none";
  addUpdateSection.style.display = "block";
  backBtn.style.display = "none";
  deleteBtn.style.display = "none";
  currentView = 'home';
  editingKey = null;
  
  // Clear form
  document.getElementById("key").value = "";
  document.getElementById("url").value = "";
  focusFirstInput();
}

function showShortcutsList() {
  const list = document.getElementById("shortcut-list");
  const addUpdateSection = document.getElementById("add-update-section");
  const backBtn = document.getElementById("back-btn");
  
  list.style.display = "block";
  addUpdateSection.style.display = "none";
  backBtn.style.display = "block";
  currentView = 'list';
  loadShortcuts();
}

function showEditShortcut(key, url) {
  const list = document.getElementById("shortcut-list");
  const addUpdateSection = document.getElementById("add-update-section");
  const backBtn = document.getElementById("back-btn");
  const deleteBtn = document.getElementById("delete-btn");
  
  list.style.display = "none";
  addUpdateSection.style.display = "block";
  backBtn.style.display = "block";
  deleteBtn.style.display = "block";
  currentView = 'edit';
  editingKey = key;
  
  document.getElementById("key").value = key;
  document.getElementById("url").value = url;
  focusFirstInput();
}

// Save/Delete functionality
function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  const messageElement = notification.querySelector('.notification-message');
  
  notification.className = `notification ${type}`;
  messageElement.textContent = message;
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

document.getElementById("save-btn").addEventListener("click", async () => {
  let key = document.getElementById("key").value.trim().toLowerCase();
  let url = document.getElementById("url").value.trim();

  if (!key || !url) {
    showNotification("Please provide both a shortcut key and URL.", 'error');
    return;
  }

  // If the URL doesn't already start with 'http://' or 'https://', add 'https://'
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  const { shortcuts = {} } = await chrome.storage.sync.get("shortcuts");

  // If we're editing an existing shortcut and the key has changed
  if (editingKey && editingKey !== key) {
    // Remove the old key
    delete shortcuts[editingKey];
    showNotification(`Shortcut '${editingKey}' updated to '${key}' successfully!`);
  } else if (editingKey) {
    showNotification(`Shortcut '${key}' updated successfully!`);
  } else {
    showNotification(`Shortcut '${key}' added successfully!`);
  }

  // Add or update the shortcut with the new key
  shortcuts[key] = url;
  await chrome.storage.sync.set({ shortcuts });

  showShortcutsList();
  focusFirstInput();
});

// Delete functionality with custom confirmation dialog
document.getElementById("delete-btn").addEventListener("click", () => {
  if (editingKey) {
    const dialog = document.getElementById("confirm-dialog");
    const message = document.getElementById("confirm-message");
    message.textContent = `Are you sure you want to delete the shortcut '${editingKey}'?`;
    dialog.style.display = "flex";
    document.getElementById('confirm-btn').focus();

    const handleConfirm = async () => {
      const { shortcuts = {} } = await chrome.storage.sync.get("shortcuts");
      delete shortcuts[editingKey];
      await chrome.storage.sync.set({ shortcuts });
      
      showNotification(`Shortcut '${editingKey}' deleted successfully!`);
      showShortcutsList();
      dialog.style.display = "none";
      
      // Remove event listeners
      document.getElementById("confirm-btn").removeEventListener("click", handleConfirm);
      document.getElementById("cancel-btn").removeEventListener("click", handleCancel);
    };

    const handleCancel = () => {
      dialog.style.display = "none";
      // Remove event listeners
      document.getElementById("confirm-btn").removeEventListener("click", handleConfirm);
      document.getElementById("cancel-btn").removeEventListener("click", handleCancel);
    };

    // Add one-time event listeners
    document.getElementById("confirm-btn").addEventListener("click", handleConfirm, { once: true });
    document.getElementById("cancel-btn").addEventListener("click", handleCancel, { once: true });
  }
});

// Navigation event listeners
document.getElementById("view-all-btn").addEventListener("click", showShortcutsList);
document.getElementById("back-btn").addEventListener("click", () => {
  if (currentView === 'list') {
    showHome();
  } else if (currentView === 'edit') {
    showShortcutsList();
  }
});

// Initialize the list on popup open
showHome();

// Tab navigation support
document.addEventListener('keydown', (e) => {
  // Handle Tab key
  if (e.key === 'Tab') {
    const activeElement = document.activeElement;
    const focusableElements = Array.from(document.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])'));
    const currentIndex = focusableElements.indexOf(activeElement);
    
    // If no element is focused, focus the first element
    if (currentIndex === -1) {
      focusableElements[0]?.focus();
      e.preventDefault();
    }
  }
  
  // Handle Enter key
  if (e.key === 'Enter') {
    const activeElement = document.activeElement;
    
    // If focused on save button or in input fields
    if (activeElement.id === 'save-btn' || 
        activeElement.id === 'key' || 
        activeElement.id === 'url') {
      document.getElementById('save-btn').click();
    }
    // If focused on confirm button in delete dialog
    else if (activeElement.id === 'confirm-btn') {
      document.getElementById('confirm-btn').click();
    }
  }
  
  // Handle Escape key
  if (e.key === 'Escape') {
    // Close delete confirmation dialog if open
    const dialog = document.getElementById('confirm-dialog');
    if (dialog.style.display === 'flex') {
      document.getElementById('cancel-btn').click();
    }
    // Go back if in edit or list view
    else if (currentView !== 'home') {
      document.getElementById('back-btn').click();
    }
  }
});

// Focus management
function focusFirstInput() {
  document.getElementById('key').focus();
}

// Add tabindex to elements
document.querySelectorAll('button, input').forEach(element => {
  element.setAttribute('tabindex', '0');
});

// Add keyboard shortcut hints
document.querySelectorAll('button').forEach(button => {
  const originalText = button.textContent;
  if (button.id === 'save-btn') {
    button.setAttribute('title', 'Enter');
  } else if (button.id === 'back-btn') {
    button.setAttribute('title', 'Esc');
  } else if (button.id === 'confirm-btn') {
    button.setAttribute('title', 'Enter');
  } else if (button.id === 'cancel-btn') {
    button.setAttribute('title', 'Esc');
  }
});
