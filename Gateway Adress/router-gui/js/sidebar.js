(function() {
    const path = window.location.pathname;
    const isLoginPage = (path.endsWith('index.html') || path.endsWith('/')) && !path.includes('cgi-bin');
    if (isLoginPage) return;

    const isInCgiBin = path.includes('/cgi-bin/');
    const basePath = isInCgiBin ? '../' : './';

    const icons = {
        status: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
        advanced: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
        firewall: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
        wifi: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>`,
        maintenance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a2 2 0 0 1-2.83-2.83l-3.94 3.6z"></path><path d="m20 13-2.5 2.5"></path><path d="m13.4 20.9 3.5-3.5"></path><circle cx="9.5" cy="15.5" r="5.5"></circle><path d="M15.5 9.5 13 12"></path><path d="m9 16 1.5-1.5"></path></svg>`,
        voip: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
        reboot: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>`,
        chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron-icon"><polyline points="9 18 15 12 9 6"></polyline></svg>`
    };

    const sidebarHTML = `
        <div class="sidebar-header">
            <a href="${basePath}cgi-bin/index.html" class="sidebar-logo">
                <img src="${basePath}images/image.png" alt="Logo" onerror="this.style.display='none'">
                <span>S136AN</span>
            </a>
        </div>
        
        <ul class="sidebar-menu">
            <li class="menu-section-label">Monitoring</li>
            <li class="menu-item">
                <div class="menu-link" onclick="toggleSubmenu(this)">
                    <div class="menu-link-content">
                        ${icons.status}
                        <span>Status</span>
                    </div>
                    ${icons.chevron}
                </div>
                <ul class="submenu">
                    <li class="submenu-item"><a href="${basePath}cgi-bin/index.html" class="submenu-link">Device Info</a></li>
                    <li class="submenu-item"><a href="${basePath}cgi-bin/traffic.html" class="submenu-link">Traffic Statistics</a></li>
                    <li class="submenu-item"><a href="${basePath}cgi-bin/wireless.html" class="submenu-link">Wireless Statistics</a></li>
                    <li class="submenu-item"><a href="${basePath}cgi-bin/dhcp.html" class="submenu-link">DHCP Lease</a></li>
                    <li class="submenu-item"><a href="${basePath}cgi-bin/connected-devices.html" class="submenu-link">Connected Devices</a></li>
                  
                </ul>
            </li>

            <li class="menu-section-label">Configuration</li>
            <li class="menu-item">
                <div class="menu-link" onclick="toggleSubmenu(this)">
                    <div class="menu-link-content">
                        ${icons.advanced}
                        <span>Advanced Setup</span>
                    </div>
                    ${icons.chevron}
                </div>
                <ul class="submenu">
                    <li class="submenu-item"><a href="${basePath}cgi-bin/wan-settings.html" class="submenu-link">WAN Settings</a></li>
                    <li class="submenu-item"><a href="${basePath}cgi-bin/lan-settings.html" class="submenu-link">LAN Settings</a></li>
                    <li class="submenu-item"><a href="#" class="submenu-link">NAT Configuration</a></li>
                    <li class="submenu-item"><a href="#" class="submenu-link">Parental Control</a></li>
                </ul>
            </li>

            <li class="menu-item">
                <div class="menu-link" onclick="toggleSubmenu(this)">
                    <div class="menu-link-content">
                        ${icons.wifi}
                        <span>Wi-Fi Setup</span>
                    </div>
                    ${icons.chevron}
                </div>
                <ul class="submenu">
                    <li class="submenu-item"><a href="${basePath}cgi-bin/wifi-settings.html" class="submenu-link">2.4GHz Settings</a></li>
                    <li class="submenu-item"><a href="${basePath}cgi-bin/security-settings.html" class="submenu-link">Security Settings</a></li>
                    <li class="submenu-item"><a href="${basePath}cgi-bin/wps-settings.html" class="submenu-link">WPS Settings</a></li>
                </ul>
            </li>

            <li class="menu-item">
                <div class="menu-link" onclick="toggleSubmenu(this)">
                    <div class="menu-link-content">
                        ${icons.firewall}
                        <span>Firewall Setup</span>
                    </div>
                    ${icons.chevron}
                </div>
                <ul class="submenu">
                    <li class="submenu-item"><a href="${basePath}cgi-bin/firewall.html" class="submenu-link">Firewall Settings</a></li>
                    <li class="submenu-item"><a href="#" class="submenu-link">MAC Filter</a></li>
                    <li class="submenu-item"><a href="#" class="submenu-link">IP Filter</a></li>
                    <li class="submenu-item"><a href="#" class="submenu-link">URL Filter</a></li>
                </ul>
            </li>

            <li class="menu-section-label">System</li>
            <li class="menu-item">
                <div class="menu-link" onclick="toggleSubmenu(this)">
                    <div class="menu-link-content">
                        ${icons.maintenance}
                        <span>Maintenance</span>
                    </div>
                    ${icons.chevron}
                </div>
                <ul class="submenu">
                    <li class="submenu-item"><a href="${basePath}cgi-bin/backup.html" class="submenu-link">Backup/Restore</a></li>
                    <li class="submenu-item"><a href="${basePath}cgi-bin/firmware.html" class="submenu-link">Firmware Upgrade</a></li>
                    <li class="submenu-item"><a href="${basePath}cgi-bin/system-log.html" class="submenu-link">System Log</a></li>
                </ul>
            </li>

            <li class="menu-item">
                <div class="menu-link" onclick="toggleSubmenu(this)">
                    <div class="menu-link-content">
                        ${icons.voip}
                        <span>VoIP</span>
                    </div>
                    ${icons.chevron}
                </div>
                <ul class="submenu">
                    <li class="submenu-item"><a href="#" class="submenu-link">Global Settings</a></li>
                    <li class="submenu-item"><a href="#" class="submenu-link">Advanced Settings</a></li>
                </ul>
            </li>

            <li class="menu-item">
                <a href="#" class="menu-link">
                    <div class="menu-link-content">
                        ${icons.reboot}
                        <span>Save/Reboot</span>
                    </div>
                </a>
            </li>
        </ul>
        <div class="sidebar-overlay"></div>
    `;

    // Create sidebar container
    const sidebarContainer = document.createElement('aside');
    sidebarContainer.className = 'sidebar';
    sidebarContainer.innerHTML = sidebarHTML;
    
    // Inject CSS
    if (!document.getElementById('sidebar-styles')) {
        const link = document.createElement('link');
        link.id = 'sidebar-styles';
        link.rel = 'stylesheet';
        link.href = `${basePath}css/sidebar.css`;
        document.head.appendChild(link);
    }

    // Add to body
    if (document.body) {
        document.body.prepend(sidebarContainer);
        initSidebar();
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            document.body.prepend(sidebarContainer);
            initSidebar();
        });
    }

    function initSidebar() {
        // Highlight active link
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll('.submenu-link');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href !== '#' && currentPath.includes(href.split('/').pop())) {
                link.classList.add('active');
                const submenu = link.closest('.submenu');
                const parentLink = submenu.previousElementSibling;
                submenu.classList.add('show');
                parentLink.classList.add('open');
                parentLink.classList.add('active');
            }
        });

        // Overlay click to close mobile sidebar
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                document.querySelector('.sidebar').classList.remove('show');
                overlay.classList.remove('show');
            });
        }
    }

    window.toggleSubmenu = function(element) {
        const submenu = element.nextElementSibling;
        const allSubmenus = document.querySelectorAll('.submenu');
        const allParentLinks = document.querySelectorAll('.menu-link');

        // Close others
        allSubmenus.forEach(sub => {
            if (sub !== submenu) {
                sub.classList.remove('show');
            }
        });
        allParentLinks.forEach(link => {
            if (link !== element) {
                link.classList.remove('open');
            }
        });

        // Toggle current
        if (submenu) {
            submenu.classList.toggle('show');
            element.classList.toggle('open');
        }
    };
})();
