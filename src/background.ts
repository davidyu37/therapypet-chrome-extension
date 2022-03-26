chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.from === 'therapy-pet-content') {
    // Open new tab with cute animals
    chrome.tabs.create({ url: message.url });
  }
});