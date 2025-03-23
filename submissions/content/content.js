// this file runs on all pages and interacts with the page content when necessary.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getTabInfo") {
        // If the message action is "getTabInfo", gather data about the page.
        const pageInfo = {
            title: document.title,  
            url: window.location.href,  
            description: getMetaDescription()  //function to get the meta description of the page.
        };

        //sends the page info back to the background script or popup.
        sendResponse(pageInfo);
    }
});

// retrieves the meta description of a page.
function getMetaDescription() {
    const metaTag = document.querySelector('meta[name="description"]');
    return metaTag ? metaTag.getAttribute('content') : "No description available";  // returns the description or a default message.
}