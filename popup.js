async function loadShortcuts() {
    const { shortcuts = {} } = await chrome.storage.sync.get("shortcuts");
    const list = document.getElementById("shortcut-list");
    list.innerHTML = "";
    for (const key in shortcuts) {
        const div = document.createElement("div");
        div.textContent = `${key} → ${shortcuts[key]}`;
        list.appendChild(div);
    }
}
  
document.getElementById("add").addEventListener("click", async () => {
    const key = document.getElementById("key").value.trim().toLowerCase();
    const url = document.getElementById("url").value.trim();
    if (!key || !url) return;

    const { shortcuts = {} } = await chrome.storage.sync.get("shortcuts");
    shortcuts[key] = url;
    await chrome.storage.sync.set({ shortcuts });

    document.getElementById("key").value = "";
    document.getElementById("url").value = "";
    loadShortcuts();
});
  
loadShortcuts();
  