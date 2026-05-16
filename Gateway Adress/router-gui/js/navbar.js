(function() {
    // Check current path to determine if we are on the login page
    const path = window.location.pathname;
    const isLoginPage = path.endsWith('index.html') && !path.includes('cgi-bin');
    const isRoot = path === '/' || path.endsWith('/router-gui/') || path.endsWith('/router-gui/index.html');
    
    // Skip rendering if on login page
    if (isLoginPage || isRoot) {
        return; 
    }

    // Determine relative paths based on current location
    const isInCgiBin = path.includes('/cgi-bin/');
    const isInWiFiSetup = path.includes('/WiFi-Setup/');
    const basePath = isInCgiBin ? '../' : (isInWiFiSetup ? '../../' : './');

    // Create navbar element
    const navbar = document.createElement('nav');
    navbar.className = 'main-navbar';
    
    navbar.innerHTML = `
        <div class="nav-container">
            <div class="nav-logo">
                <img src="${basePath}images/image.png" alt="Logo" onerror="this.style.display='none'">
                
            </div>
            <ul class="nav-links">
                <li><a href="${basePath}cgi-bin/index.html"></a></li>
                <li><a href="#"></a></li>
                <li><a href="#"></a></li>
                <li><a href="#" id="logout-btn" style="color: #ff7675;">Logout</a></li>
            </ul>
            <div class="nav-mobile-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;

    // Inject CSS if not already present
    if (!document.getElementById('navbar-styles')) {
        const link = document.createElement('link');
        link.id = 'navbar-styles';
        link.rel = 'stylesheet';
        link.href = `${basePath}css/navbar.css`;
        document.head.appendChild(link);
    }

    // Prepend to body
    if (document.body) {
        document.body.prepend(navbar);
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            document.body.prepend(navbar);
        });
    }

    // Mobile menu toggle
    const toggle = navbar.querySelector('.nav-mobile-toggle');
    const links = navbar.querySelector('.nav-links');
    
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }

    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('login');
            window.location.href = isInCgiBin ? '../../index.html' : (isInWiFiSetup ? '../../../index.html' : 'index.html');
        });
    }
})();
