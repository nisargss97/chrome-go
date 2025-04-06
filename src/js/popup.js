import StorageService from './services/storage.js';
import NotificationService from './services/notification.js';
import NavigationService from './services/navigation.js';
import KeyboardService from './services/keyboard.js';
import ShortcutsList from './modules/shortcutsList.js';

// Initialize services
const keyboardService = new KeyboardService(NavigationService);

// Save button functionality
document.getElementById("save-btn").addEventListener("click", async () => {
  let key = document.getElementById("key").value.trim().toLowerCase();
  let url = document.getElementById("url").value.trim();

  if (!key || !url) {
    NotificationService.showError("Please provide both a shortcut key and URL.");
    return;
  }

  // If the URL doesn't already start with 'http://' or 'https://', add 'https://'
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  try {
    const editingKey = NavigationService.getEditingKey();
    if (editingKey) {
      await StorageService.updateShortcut(editingKey, key, url);
      NotificationService.showSuccess(`Shortcut '${editingKey}' ${editingKey !== key ? `updated to '${key}'` : 'updated'} successfully!`);
    } else {
      await StorageService.addShortcut(key, url);
      NotificationService.showSuccess(`Shortcut '${key}' added successfully!`);
    }

    NavigationService.showShortcutsList();
    await ShortcutsList.loadShortcuts();
  } catch (error) {
    NotificationService.showError(error.message);
  }
});

// Delete functionality
document.getElementById("delete-btn").addEventListener("click", () => {
  const editingKey = NavigationService.getEditingKey();
  if (editingKey) {
    const dialog = document.getElementById("confirm-dialog");
    const message = document.getElementById("confirm-message");
    message.textContent = `Are you sure you want to delete the shortcut '${editingKey}'?`;
    dialog.style.display = "flex";
    document.getElementById('confirm-btn').focus();

    const handleConfirm = async () => {
      try {
        await StorageService.deleteShortcut(editingKey);
        NotificationService.showSuccess(`Shortcut '${editingKey}' deleted successfully!`);
        dialog.style.display = "none";
        NavigationService.showShortcutsList();
        await ShortcutsList.loadShortcuts();
      } catch (error) {
        NotificationService.showError(error.message);
        dialog.style.display = "none";
      }
    };

    const handleCancel = () => {
      dialog.style.display = "none";
    };

    document.getElementById("confirm-btn").addEventListener("click", handleConfirm, { once: true });
    document.getElementById("cancel-btn").addEventListener("click", handleCancel, { once: true });
  }
});

// Initialize the extension
NavigationService.showHome();
