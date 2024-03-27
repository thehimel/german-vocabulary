export function toggleDarkModeStyleSheet(darkMode: boolean) {
  // Manually add dark mode to Selectors
  const link = document.getElementById('dynamic-styles') as HTMLLinkElement | null;

  if (darkMode && !link) {
      const newLink = document.createElement('link');
      newLink.href = '/static/styles/Selector.css';
      newLink.rel = 'stylesheet';
      newLink.id = 'dynamic-styles';
      document.head.appendChild(newLink);
  } else if (!darkMode && link) {
      link.remove();
  }
}
