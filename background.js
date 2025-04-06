const defaultShortcuts = {
  cal: "https://calendar.google.com",
  mail: "https://mail.google.com",
  yt: "https://youtube.com",
  git: "https://github.com",
};

// Function to merge default and user-added shortcuts
async function loadShortcuts() {
  const { shortcuts = {} } = await chrome.storage.sync.get("shortcuts");

  // Merge default shortcuts with user-added shortcuts
  const mergedShortcuts = { ...defaultShortcuts, ...shortcuts };

  // Store the merged shortcuts back into chrome.storage.sync
  await chrome.storage.sync.set({ shortcuts: mergedShortcuts });
  return mergedShortcuts;
}

// Initialize on installation
chrome.runtime.onInstalled.addListener(async () => {
  const { shortcuts } = await chrome.storage.sync.get("shortcuts");
  if (!shortcuts) {
    // If no shortcuts are stored, set the defaults
    await chrome.storage.sync.set({ shortcuts: defaultShortcuts });
  } else {
    // Merge the user-added shortcuts with the defaults
    await loadShortcuts();
  }
});

// Handle omnibox input (search or shortcut)
chrome.omnibox.onInputEntered.addListener(async (text) => {
  const { shortcuts = {} } = await chrome.storage.sync.get("shortcuts");
  const url =
    shortcuts[text.toLowerCase()] || `https://www.google.com/search?q=${text}`;
  chrome.tabs.update({ url });
});
