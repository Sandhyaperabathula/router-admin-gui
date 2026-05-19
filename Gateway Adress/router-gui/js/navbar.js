(function() {
    const path = window.location.pathname;
    const isLoginPage = (path.endsWith('index.html') || path.endsWith('/')) && !path.includes('cgi-bin');
    if (isLoginPage) return;

    const isInCgiBin = path.includes('/cgi-bin/');
    const basePath = isInCgiBin ? '../' : './';

    const navbarHTML = `
        <div class="nav-left">
            <button class="mobile-toggle" onclick="toggleMobileSidebar()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <div class="router-info">
                <span class="router-model">S136AN Gateway</span>
                <div class="router-status">
                    <span class="status-indicator"></span>
                    <span>System Online</span>
                </div>
            </div>
        </div>

        <div class="nav-right">
 
            <div class="nav-user">
                <a href="#" class="logout-btn" id="logout-btn">Logout</a>
            </div>
        </div>
    `;

    const navbarContainer = document.createElement('nav');
    navbarContainer.className = 'main-navbar';
    navbarContainer.innerHTML = navbarHTML;

    // Inject CSS
    if (!document.getElementById('navbar-styles')) {
        const link = document.createElement('link');
        link.id = 'navbar-styles';
        link.rel = 'stylesheet';
        link.href = `${basePath}css/navbar.css`;
        document.head.appendChild(link);
    }

    // Add to body
    if (document.body) {
        document.body.prepend(navbarContainer);
        initNavbar();
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            document.body.prepend(navbarContainer);
            initNavbar();
        });
    }

    function initNavbar() {
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('login');
                window.location.href = isInCgiBin ? '../../index.html' : 'index.html';
            });
        }
    }

    window.toggleMobileSidebar = function() {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        if (sidebar) sidebar.classList.toggle('show');
        if (overlay) overlay.classList.toggle('show');
    };
})();
