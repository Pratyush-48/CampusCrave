:root {
  /* Light Theme */
  --light-bg: #f9f9f9;
  --light-text: #292f36;
  --light-card: #ffffff;
  --light-primary: #ff6b6b;
  --light-shadow: 0 4px 8px rgba(0,0,0,0.1);
  
  /* Dark Theme */
  --dark-bg: #121212;
  --dark-text: #f5f5f5;
  --dark-card: #1e1e1e;
  --dark-primary: #ff8a8a;
  --dark-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

body.light-theme {
  --bg: var(--light-bg);
  --text: var(--light-text);
  --card: var(--light-card);
  --primary: var(--light-primary);
  --shadow: var(--light-shadow);
}

body.dark-theme {
  --bg: var(--dark-bg);
  --text: var(--dark-text);
  --card: var(--dark-card);
  --primary: var(--dark-primary);
  --shadow: var(--dark-shadow);
  background-color: var(--bg);
  color: var(--text);
}