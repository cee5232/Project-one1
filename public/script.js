async function analyzeSite() {
  const url = document.getElementById('siteUrl').value;
  
  try {
    const response = await fetch('/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });

    const data = await response.json();
    updateHeader(data.name);
    displaySiteInfo(data);
    displayPages(data.pages);
  } catch (error) {
    console.error('Failed to analyze site:', error);
  }
}

function updateHeader(siteName) {
  const headerTitle = document.getElementById('headerTitle');
  headerTitle.textContent = siteName || 'HAX Site Analyzer';
}

function displaySiteInfo(data) {
  document.getElementById('siteInfo').classList.remove('hidden');
  document.getElementById('siteLogo').src = data.logo;
  document.getElementById('siteName').textContent = data.name;
  document.getElementById('siteDescription').textContent = data.description;
  document.getElementById('siteTheme').textContent = data.theme;
  document.getElementById('siteCreated').textContent = data.created;
  document.getElementById('siteUpdated').textContent = data.lastUpdated;
}

function displayPages(pages) {
  const grid = document.getElementById('pageGrid');
  grid.innerHTML = '';

  pages.forEach(page => {
    const card = document.createElement('div');
    card.className = 'page-card';
    card.innerHTML = `
      <h3>${page.title}</h3>
      <p>${page.description || 'No description'}</p>
      <p>Last updated: ${page.metadata?.updated || 'Unknown'}</p>
      <a href="${page.location}" target="_blank">View Page</a>
      <a href="${page.source}" target="_blank">View Source</a>
    `;
    grid.appendChild(card);
  });
}