const shortcuts = {
  cal: "https://calendar.google.com",
  mail: "https://mail.google.com",
  yt: "https://youtube.com",
  git: "https://github.com"
};

chrome.omnibox.onInputEntered.addListener((text) => {
  const url = shortcuts[text.toLowerCase()] || `https://www.google.com/search?q=${text}`;
  chrome.tabs.update({ url });
});
