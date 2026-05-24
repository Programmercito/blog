/* Code Sketchbook Theme Interactions */

document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.querySelector('.main-content');
  const lineGutter = document.querySelector('.line-gutter');
  const workspace = document.querySelector('.workspace-container');

  // 1. Line Numbers Generator
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

  // Run line generator on events
  updateLineNumbers();
  window.addEventListener('resize', updateLineNumbers);
  window.addEventListener('load', updateLineNumbers);
  setTimeout(updateLineNumbers, 250);

  // 2. Spotlight Background Cursor-Following Glow
  document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  // 3. Dark/Light Theme Switcher Toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      try {
        localStorage.setItem('theme', newTheme);
      } catch (e) {}
      
      // Update line gutter height if layout shifts slightly
      setTimeout(updateLineNumbers, 50);
    });
  }

  // 4. IDE Line Highlight Interaction
  if (workspace && lineGutter) {
    workspace.addEventListener('mousemove', (e) => {
      const rect = workspace.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      
      // Calculate active line index based on line height (1.6rem = 25.6px)
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const lineHeightPx = rootFontSize * 1.6;
      
      // Padding of workspace/main-content is 2rem = 32px
      const paddingOffset = rootFontSize * 2;
      
      const lineIndex = Math.floor((relativeY - paddingOffset) / lineHeightPx);
      const spans = lineGutter.querySelectorAll('.line-number');
      
      spans.forEach((span, idx) => {
        if (idx === lineIndex) {
          span.classList.add('active');
        } else {
          span.classList.remove('active');
        }
      });
    });
    
    // Remove highlight when mouse leaves workspace
    workspace.addEventListener('mouseleave', () => {
      const spans = lineGutter.querySelectorAll('.line-number');
      spans.forEach(span => span.classList.remove('active'));
    });
  }

  // 5. Scroll Reveal for article content
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('article > *').forEach((el, i) => {
      el.classList.add('scroll-reveal');
      el.style.transitionDelay = `${Math.min(i * 0.05, 0.3)}s`;
      revealObserver.observe(el);
    });
  }

  // 6. Archive items stagger
  document.querySelectorAll('.archive-item').forEach((item, i) => {
    item.style.animation = `fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.03}s both`;
  });
});
