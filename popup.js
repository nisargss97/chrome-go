let showAll = false; // Flag to track the state of "Show All"

// Load and display shortcuts
async function loadShortcuts() {
  const { shortcuts = {} } = await chrome.storage.sync.get("shortcuts");
  const list = document.getElementById("shortcut-list");
  list.innerHTML = ""; // Clear any previous content

  // If showAll is false, show the "Click 'Show All' to view shortcuts." message
  if (!showAll) {
    list.innerHTML = "Click 'Show All' to view shortcuts.";
    return;
  }

  // If there are no shortcuts, display a message
  if (Object.keys(shortcuts).length === 0) {
    list.innerHTML = "No shortcuts added yet.";
    return;
  }

  const rightArrow = " → "; // Arrow symbol for separation

  // Loop through the shortcuts and display them
  for (const key in shortcuts) {
    const div = document.createElement("div");
    div.classList.add("shortcut"); // Adding class for styling

    const shortcutText = `${key}${rightArrow}${shortcuts[key]}`; // Concatenate with rightArrow
    div.textContent = shortcutText;

    // Create the edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn"); // Adding class for styling
    editBtn.onclick = () => {
      // Populate the input fields for editing
      document.getElementById("key").value = key;
      document.getElementById("url").value = shortcuts[key];
    };

    div.appendChild(editBtn); // Append the edit button to the shortcut div
    list.appendChild(div); // Add the div to the list
  }
}

// Add or update the shortcut
document.getElementById("add").addEventListener("click", async () => {
  const key = document.getElementById("key").value.trim().toLowerCase();
  let url = document.getElementById("url").value.trim();

  if (!key || !url) {
    alert("Please provide both a shortcut key and URL.");
    return;
  }

  // If the URL doesn't already start with 'http://' or 'https://', add 'https://'
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  const { shortcuts = {} } = await chrome.storage.sync.get("shortcuts");

  // Update the shortcuts object with the new/updated shortcut
  shortcuts[key] = url;

  // Save the updated shortcuts to storage
  await chrome.storage.sync.set({ shortcuts });

  // Clear input fields
  document.getElementById("key").value = "";
  document.getElementById("url").value = "";

  loadShortcuts(); // Reload the shortcuts list
});

// Show or hide the full list of shortcuts
document.getElementById("show-all-btn").addEventListener("click", () => {
  showAll = !showAll; // Toggle the "show all" state
  loadShortcuts(); // Reload the shortcuts list based on the new state
});

// Initialize the list on popup open
loadShortcuts();
