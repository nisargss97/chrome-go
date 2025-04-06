// Storage service for handling Chrome storage operations
class StorageService {
  async getShortcuts() {
    const { shortcuts = {} } = await chrome.storage.sync.get("shortcuts");
    return shortcuts;
  }

  async saveShortcuts(shortcuts) {
    try {
      await chrome.storage.sync.set({ shortcuts });
    } catch (error) {
      if (error.message.includes('QUOTA_BYTES_PER_ITEM')) {
        throw new Error('Storage limit reached (max 8KB per item). Please delete some shortcuts to add new ones.');
      } else if (error.message.includes('QUOTA_BYTES')) {
        throw new Error('Total storage limit reached (max 100KB). Please delete some shortcuts to add new ones.');
      } else {
        throw new Error(`Failed to save shortcuts: ${error.message}. Please try again.`);
      }
    }
  }

  async addShortcut(key, url) {
    if (!key) {
      throw new Error('Please provide a shortcut key. This is the word you\'ll type to navigate to the URL.');
    }

    if (!url) {
      throw new Error('Please provide a URL. This is the website you want to navigate to.');
    }

    if (key.length > 20) {
      throw new Error(`Shortcut key '${key}' is too long (${key.length} characters). Please use 20 characters or less.`);
    }

    if (url.length > 2000) {
      throw new Error(`URL is too long (${url.length} characters). Please use a shorter URL (max 2000 characters).`);
    }

    const shortcuts = await this.getShortcuts();
    if (shortcuts[key]) {
      const existingUrl = shortcuts[key];
      throw new Error(`The shortcut '${key}' already exists and points to '${existingUrl}'. Please choose a different key or update the existing shortcut.`);
    }
    
    shortcuts[key] = url;
    await this.saveShortcuts(shortcuts);
  }

  async updateShortcut(oldKey, newKey, url) {
    if (!newKey) {
      throw new Error('Please provide a shortcut key. This is the word you\'ll type to navigate to the URL.');
    }

    if (!url) {
      throw new Error('Please provide a URL. This is the website you want to navigate to.');
    }

    if (newKey.length > 20) {
      throw new Error(`Shortcut key '${newKey}' is too long (${newKey.length} characters). Please use 20 characters or less.`);
    }

    if (url.length > 2000) {
      throw new Error(`URL is too long (${url.length} characters). Please use a shorter URL (max 2000 characters).`);
    }

    const shortcuts = await this.getShortcuts();
    if (!shortcuts[oldKey]) {
      throw new Error(`The shortcut '${oldKey}' does not exist. It may have been deleted or you may have mistyped the key.`);
    }

    // If the key is being changed and the new key already exists
    if (oldKey !== newKey && shortcuts[newKey]) {
      const existingUrl = shortcuts[newKey];
      throw new Error(`The shortcut '${newKey}' already exists and points to '${existingUrl}'. Please choose a different key or update the existing shortcut.`);
    }

    // If only the URL is being updated
    if (oldKey === newKey) {
      shortcuts[oldKey] = url;
    } else {
      // If the key is being changed
      delete shortcuts[oldKey];
      shortcuts[newKey] = url;
    }
    
    await this.saveShortcuts(shortcuts);
  }

  async deleteShortcut(key) {
    const shortcuts = await this.getShortcuts();
    if (!shortcuts[key]) {
      throw new Error(`The shortcut '${key}' does not exist. It may have been deleted or you may have mistyped the key.`);
    }
    
    delete shortcuts[key];
    await this.saveShortcuts(shortcuts);
  }
}

export default new StorageService(); 