chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: startAutoScroll,
    args: ['InvestigationsList__CardListContainer-fOwSDh', 5000]
  });
});

function startAutoScroll(className, interval) {
  if (window.autoScrollInterval) {
    clearInterval(window.autoScrollInterval);
    window.autoScrollInterval = null;
    console.log('Auto-scroll stopped');
    alert('Auto-scroll stopped!');
    return;
  }
  
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
  
  scrollDiv();

  window.autoScrollInterval = setInterval(scrollDiv, interval);
  console.log('Auto-scroll started - every', interval / 1000, 'seconds');
  alert('Auto-scroll started! Click extension again to stop.');
}
