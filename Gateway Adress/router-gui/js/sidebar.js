(function() {
    document.write(`
        <div class="sidebar">
            <div class="logo-area">
                S136AN
            </div>
            
            <ul class="menu-tree">
                <!-- Status Menu -->
                <li class="menu-item parent-item">
                    <div class="menu-link" onclick="toggleSubmenu(this)">
                        <span class="toggle-icon">+</span>
                        Status
                    </div>
                    <ul class="submenu">
                        <li class="submenu-item"><a href="index.html" class="submenu-link" onclick="selectItem(this)">Device Info</a></li>
                        <li class="submenu-item"><a href="#" class="submenu-link" onclick="selectItem(this)">Traffic Statistics</a></li>
                        <li class="submenu-item"><a href="#" class="submenu-link" onclick="selectItem(this)">Wireless Statistics</a></li>
                        <li class="submenu-item"><a href="#" class="submenu-link" onclick="selectItem(this)">Current Wireless Users</a></li>
                        <li class="submenu-item"><a href="#" class="submenu-link" onclick="selectItem(this)">DHCP Lease</a></li>
                    </ul>
                </li>

                <!-- Advanced Setup -->
                <li class="menu-item parent-item">
                    <div class="menu-link" onclick="toggleSubmenu(this)">
                        <span class="toggle-icon">+</span>
                        Advanced Setup
                    </div>
                    <ul class="submenu">
                        <li class="submenu-item"><a href="#" class="submenu-link">WAN</a></li>
                        <li class="submenu-item"><a href="#" class="submenu-link">LAN</a></li>
                        <li class="submenu-item"><a href="#" class="submenu-link">NAT</a></li>
                       
                        <li class="submenu-item"><a href="#" class="submenu-link">Parental Control</a></li>
                    </ul>
                </li>

                <!-- Firewall Setup -->
                <li class="menu-item parent-item">
                    <div class="menu-link" onclick="toggleSubmenu(this)">
                        <span class="toggle-icon">+</span>
                        Firewall Setup
                    </div>
                    <ul class="submenu">
                        <li class="submenu-item"><a href="#" class="submenu-link">MAC Filter</a></li>
                        <li class="submenu-item"><a href="#" class="submenu-link">IP Filter</a></li>
                        <li class="submenu-item"><a href="#" class="submenu-link">URL Filter</a></li>
                    </ul>
                </li>

                <!-- Wi-Fi Setup -->
                <li class="menu-item parent-item">
                    <div class="menu-link" onclick="toggleSubmenu(this)">
                        <span class="toggle-icon">+</span>
                        Wi-Fi Setup
                    </div>
                   <ul class="submenu">
    <li class="submenu-item">
        <a href="wifi-settings.html" class="submenu-link">
            WiFi 2.4GHz Settings
        </a>
    </li>

    <li class="submenu-item">
        <a href="security-settings.html" class="submenu-link">
            Security Settings
        </a>
    </li>

    <li class="submenu-item">
        <a href="wps-settings.html" class="submenu-link">
            WPS Settings
        </a>
    </li>
</ul>
                </li>

                <!-- Maintenance -->
                <li class="menu-item parent-item">
                    <div class="menu-link" onclick="toggleSubmenu(this)">
                        <span class="toggle-icon">+</span>
                        Maintenance
                    </div>
                    <ul class="submenu">
                        <li class="submenu-item"><a href="#" class="submenu-link">Backup/Restore</a></li>
                        <li class="submenu-item"><a href="#" class="submenu-link">Firmware Upgrade</a></li>
                        <li class="submenu-item"><a href="#" class="submenu-link">System Log</a></li>
                    </ul>
                </li>

                <!-- VoIP -->
                <li class="menu-item parent-item">
                    <div class="menu-link" onclick="toggleSubmenu(this)">
                        <span class="toggle-icon">+</span>
                        VoIP
                    </div>
                    <ul class="submenu">
                        <li class="submenu-item"><a href="#" class="submenu-link">Global Settings</a></li>
                        <li class="submenu-item"><a href="#" class="submenu-link">Advanced Settings</a></li>
                    </ul>
                </li>

                <!-- Save/Reboot -->
                <li class="menu-item parent-item">
                    <a href="#" class="menu-link">
                        <span class="toggle-icon" style="visibility: hidden;">+</span>
                        Save/Reboot
                    </a>
                </li>
            </ul>
        </div>
    `);
})();

function toggleSubmenu(element) {
    const parentItem = element.parentElement;
    const submenu = parentItem.querySelector('.submenu');
    const icon = element.querySelector('.toggle-icon');

    if (submenu) {
        if (submenu.style.display === 'block') {
            submenu.style.display = 'none';
            icon.textContent = '+';
        } else {
            submenu.style.display = 'block';
            icon.textContent = '-';
        }
    }
}

function selectItem(element) {
    // Remove active class from all links
    document.querySelectorAll('.submenu-link').forEach(link => {
        link.style.backgroundColor = '';
        link.style.fontWeight = 'normal';
    });
    // Add active style to selected
    element.style.backgroundColor = '#d0d0d0';
    element.style.fontWeight = 'bold';
}

// Logic to keep the correct menu open based on current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.submenu-link');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#' && currentPath.includes(href.split('/').pop())) {
            const submenu = link.closest('.submenu');
            const parentItem = submenu.closest('.menu-item');
            const icon = parentItem.querySelector('.toggle-icon');
            
            submenu.style.display = 'block';
            if (icon) icon.textContent = '-';
            
            link.style.backgroundColor = '#d0d0d0';
            link.style.fontWeight = 'bold';
        }
    });
});
