document.addEventListener("DOMContentLoaded", () => {
    // loads retention preferences and stacks when the popup is opened
    chrome.storage.local.get({ retainStacks: false, stacks: [] }, (data) => {
      document.getElementById("retainStacks").checked = data.retainStacks;
  
      const stacksDiv = document.getElementById("stacks");
  
      if (!stacksDiv) {
        console.error("stack container not found!");
        return;
      }
  
      // displays stacks
      data.stacks.forEach((stack, index) => {
        const stackElement = document.createElement("div");
        stackElement.className = "stack";
  
        // creates an image element for the favicon
        const faviconElement = document.createElement("img");
        const domain = new URL(stack.url).hostname; // extracts domain from the url
        faviconElement.src = `https://www.google.com/s2/favicons?domain=${domain}`;
        faviconElement.alt = "favicon";
        stackElement.appendChild(faviconElement);
  
        // adds the title as a clickable link
        const titleElement = document.createElement("a");
        titleElement.className = "title";
        titleElement.textContent = stack.title;
        titleElement.href = stack.url;
        titleElement.target = "_blank"; // opens the link in a new tab
        stackElement.appendChild(titleElement);
  
        // adds a delete button for each stack
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete";
        deleteButton.textContent = "delete";
        deleteButton.addEventListener("click", () => {
          // removes the stack from the list
          data.stacks.splice(index, 1);
          chrome.storage.local.set({ stacks: data.stacks });
          stackElement.remove(); // removes the stack from the ui
        });
        stackElement.appendChild(deleteButton);
  
        // appends the stack element to the stacks container
        stacksDiv.appendChild(stackElement);
      });
    });
  
    // saves the retention preference when the option is changed
    document.getElementById("retainStacks").addEventListener("change", (e) => {
      chrome.storage.local.set({ retainStacks: e.target.checked });
    });
  
    // clears all stacks
    document.getElementById("clearStacks").addEventListener("click", () => {
      chrome.storage.local.set({ stacks: [] }); // clears storage
      document.getElementById("stacks").innerHTML = ""; // clears ui
    });
  });