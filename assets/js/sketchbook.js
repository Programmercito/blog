/* Code Sketchbook Theme Interactions */

document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.querySelector('.main-content');
  const lineGutter = document.querySelector('.line-gutter');

  function updateLineNumbers() {
    if (!mainContent || !lineGutter) return;
    
    // Clear previous numbers
    lineGutter.innerHTML = '';

    // Measure the actual height of the main content
    const contentHeight = mainContent.offsetHeight;
    
    // Compute font size of the root element (usually 16px)
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    
    // Line height of body is 1.6rem (25.6px when root is 16px)
    const lineHeightPx = rootFontSize * 1.6;
    
    // Calculate the number of lines needed to cover the height
    // We add 5 extra lines for buffer
    const numLines = Math.max(15, Math.ceil(contentHeight / lineHeightPx) + 5);

    const fragment = document.createDocumentFragment();
    for (let i = 1; i <= numLines; i++) {
      const lineNumDiv = document.createElement('span');
      lineNumDiv.className = 'line-number';
      lineNumDiv.textContent = i;
      fragment.appendChild(lineNumDiv);
    }
    lineGutter.appendChild(fragment);
  }

  // Run on load
  updateLineNumbers();

  // Run on window resize
  window.addEventListener('resize', updateLineNumbers);
  
  // Run when fonts or images finish loading
  window.addEventListener('load', updateLineNumbers);
  
  // Re-run after a brief delay to ensure dynamic elements have fully rendered
  setTimeout(updateLineNumbers, 250);
});
