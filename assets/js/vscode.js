/* VS Code Dracula Theme Interactions */

// Expose toggleTheme globally
window.toggleTheme = function() {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  localStorage.setItem('vscode-theme', isLight ? 'light' : 'dark');
};

// Apply saved theme immediately
if (localStorage.getItem('vscode-theme') === 'light') {
  document.body.classList.add('light-theme');
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sidebar Accordion / Toggle Folder Sections
  const sections = document.querySelectorAll('.sidebar-section-title');
  sections.forEach(section => {
    section.addEventListener('click', () => {
      const parent = section.closest('.sidebar-section');
      parent.classList.toggle('collapsed');
    });
  });

  // 2. Mobile Sidebar Slide Panel & Activity Bar click
  const explorerIcon = document.getElementById('activity-explorer');
  const sidebar = document.getElementById('sidebar-explorer');
  if (explorerIcon && sidebar) {
    explorerIcon.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      explorerIcon.classList.toggle('active');
    });
  }

  // Close sidebar on mobile when clicking outside
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && sidebar && explorerIcon) {
      if (!sidebar.contains(e.target) && !explorerIcon.contains(e.target) && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        explorerIcon.classList.remove('active');
      }
    }
  });

  // 3. View Mode Toggles (Code, Split, Preview)
  const splitPane = document.getElementById('editor-split-pane');
  const btnCode = document.getElementById('btn-view-code');
  const btnSplit = document.getElementById('btn-view-split');
  const btnPreview = document.getElementById('btn-view-preview');

  function setViewMode(mode) {
    if (!splitPane) return;
    
    // Clear all mode classes
    splitPane.classList.remove('mode-code-only', 'mode-preview-only');
    
    // Deactivate all buttons
    if (btnCode) btnCode.classList.remove('active');
    if (btnSplit) btnSplit.classList.remove('active');
    if (btnPreview) btnPreview.classList.remove('active');

    if (mode === 'code') {
      splitPane.classList.add('mode-code-only');
      if (btnCode) btnCode.classList.add('active');
    } else if (mode === 'preview') {
      splitPane.classList.add('mode-preview-only');
      if (btnPreview) btnPreview.classList.add('active');
    } else {
      // Split mode
      if (btnSplit) btnSplit.classList.add('active');
    }

    localStorage.setItem('vscode-view-mode', mode);
  }

  // Bind view mode button click listeners
  if (btnCode) btnCode.addEventListener('click', () => setViewMode('code'));
  if (btnSplit) btnSplit.addEventListener('click', () => setViewMode('split'));
  if (btnPreview) btnPreview.addEventListener('click', () => setViewMode('preview'));

  // Initialize view mode from localStorage or default
  const savedMode = localStorage.getItem('vscode-view-mode');
  if (savedMode) {
    setViewMode(savedMode);
  } else {
    // Default to split screen on desktop, preview on mobile
    if (window.innerWidth <= 768) {
      setViewMode('preview');
    } else {
      setViewMode('split');
    }
  }

  // 4. Dynamic Line Numbering for Code Pane
  const codeContent = document.querySelector('.code-content pre code');
  const lineGutter = document.querySelector('.code-line-numbers');
  
  if (codeContent && lineGutter) {
    const text = codeContent.textContent || codeContent.innerText;
    // Count newlines (lines are 1-based, text ends with a newline often)
    const lines = text.split(/\r?\n/);
    // Remove the last empty line if it's trailing
    if (lines.length > 1 && lines[lines.length - 1] === '') {
      lines.pop();
    }
    const lineCount = lines.length;
    
    let gutterHTML = '';
    for (let i = 1; i <= lineCount; i++) {
      gutterHTML += `<div>${i}</div>`;
    }
    lineGutter.innerHTML = gutterHTML;
  }
});
