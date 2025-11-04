chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: startAutoScroll,
    args: ['InvestigationsList__CardListContainer-fOwSDh', 5000] // className and interval in milliseconds (20000ms = 20 seconds)
  });
});

function startAutoScroll(className, interval) {
  // Check if auto-scroll is already running
  if (window.autoScrollInterval) {
    clearInterval(window.autoScrollInterval);
    window.autoScrollInterval = null;
    console.log('Auto-scroll stopped');
    alert('Auto-scroll stopped!');
    return;
  }
  
  // Function to scroll the div
  function scrollDiv() {
    const element = document.querySelector('.' + className);
    
    if (element) {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth'
      });
      console.log('Auto-scrolled div at:', new Date().toLocaleTimeString());
    } else {
      console.error('Could not find element with class:', className);
    }
  }
  
  // Scroll immediately first time
  scrollDiv();
  
  // Then scroll every 20 seconds
  window.autoScrollInterval = setInterval(scrollDiv, interval);
  console.log('Auto-scroll started - every', interval / 1000, 'seconds');
  alert('Auto-scroll started! Click extension again to stop.');
}