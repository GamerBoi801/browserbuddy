// creates the context menu item only once
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "addToStack", // unique id
    title: "add to stack",
    contexts: ["page"] // show this option when right-clicking on a page
  });
});

// listens for clicks on the context menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addToStack") {
    // adds the tab to the stack
    chrome.storage.local.get({ stacks: [], retainStacks: false }, (data) => {
      const stacks = data.stacks;
      stacks.push({ url: tab.url, title: tab.title }); // adds the new stack
      chrome.storage.local.set({ stacks }); // saves the updated stacks
    });
  }
});

// clears stacks when the session ends (if retention is disabled)
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get({ retainStacks: false }, (data) => {
    if (!data.retainStacks) {
      chrome.storage.local.set({ stacks: [] }); // clears stacks
    }
  });
});

chrome.runtime.onSuspend.addListener(() => {
  chrome.storage.local.get({ retainStacks: false }, (data) => {
    if (!data.retainStacks) {
      chrome.storage.local.set({ stacks: [] }); // clears stacks
    }
  });
});