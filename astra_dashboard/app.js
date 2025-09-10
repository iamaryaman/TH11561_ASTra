
let currentUser = null;
let allDevices = [];
let filteredDevices = [];
let currentPage = 'landing';
let currentTheme = 'auto';
let currentLanguage = 'en';


let mockUsers = [
    {"username": "admin", "password": "demo123", "fullname": "Admin User", "email": "admin@astra.com"},
    {"username": "manager", "password": "astra2024", "fullname": "Manager User", "email": "manager@astra.com"},
    {"username": "operator", "password": "gps123", "fullname": "Operator User", "email": "operator@astra.com"}
];

const devicesData = [
    {
        "id": "AST001",
        "deviceName": "Astra Tracker Pro",
        "userName": "Rajesh Kumar",
        "userId": "USR-2024-001",
        "emergencyContact": {
            "phone": "+91-9876543210",
            "email": "rajesh.kumar@email.com"
        },
        "status": "active",
        "location": {"lat": 28.6139, "lng": 77.2090},
        "lastUpdate": "2025-09-04T15:30:00"
    },
    {
        "id": "AST002", 
        "deviceName": "Astra Guardian",
        "userName": "Priya Sharma",
        "userId": "USR-2024-002",
        "emergencyContact": {
            "phone": "+91-9123456789",
            "email": "priya.sharma@email.com"
        },
        "status": "active",
        "location": {"lat": 19.0760, "lng": 72.8777},
        "lastUpdate": "2025-09-04T16:15:00"
    },
    {
        "id": "AST003",
        "deviceName": "Astra Secure+",
        "userName": "Amit Patel",
        "userId": "USR-2024-003", 
        "emergencyContact": {
            "phone": "+91-9987654321",
            "email": "amit.patel@email.com"
        },
        "status": "inactive",
        "location": {"lat": 22.5726, "lng": 88.3639},
        "lastUpdate": "2025-09-04T12:45:00"
    },
    {
        "id": "AST004",
        "deviceName": "Astra Mini Track",
        "userName": "Sunita Devi",
        "userId": "USR-2024-004",
        "emergencyContact": {
            "phone": "+91-9876549876",
            "email": "sunita.devi@email.com"
        },
        "status": "active",
        "location": {"lat": 12.9716, "lng": 77.5946},
        "lastUpdate": "2025-09-04T16:45:00"
    },
    {
        "id": "AST005",
        "deviceName": "Astra Fleet Pro",
        "userName": "Mohammad Ali",
        "userId": "USR-2024-005",
        "emergencyContact": {
            "phone": "+91-9654321987",
            "email": "mohammad.ali@email.com"
        },
        "status": "active",
        "location": {"lat": 26.9124, "lng": 75.7873},
        "lastUpdate": "2025-09-04T17:00:00"
    },
    {
        "id": "AST006",
        "deviceName": "Astra Safety Shield",
        "userName": "Deepika Singh",
        "userId": "USR-2024-006",
        "emergencyContact": {
            "phone": "+91-9321654987",
            "email": "deepika.singh@email.com"
        },
        "status": "active",
        "location": {"lat": 17.3850, "lng": 78.4867},
        "lastUpdate": "2025-09-04T16:30:00"
    },
    {
        "id": "AST007",
        "deviceName": "Astra Connect",
        "userName": "Ravi Gupta",
        "userId": "USR-2024-007",
        "emergencyContact": {
            "phone": "+91-9876123456",
            "email": "ravi.gupta@email.com"
        },
        "status": "inactive",
        "location": {"lat": 23.0225, "lng": 72.5714},
        "lastUpdate": "2025-09-04T14:20:00"
    },
    {
        "id": "AST008",
        "deviceName": "Astra Watch",
        "userName": "Kavita Joshi",
        "userId": "USR-2024-008",
        "emergencyContact": {
            "phone": "+91-9123987654",
            "email": "kavita.joshi@email.com"
        },
        "status": "active",
        "location": {"lat": 21.1458, "lng": 79.0882},
        "lastUpdate": "2025-09-04T17:10:00"
    },
    {
        "id": "AST009",
        "deviceName": "Astra Sentinel",
        "userName": "Vikram Reddy",
        "userId": "USR-2024-009",
        "emergencyContact": {
            "phone": "+91-9456789123",
            "email": "vikram.reddy@email.com"
        },
        "status": "active", 
        "location": {"lat": 15.2993, "lng": 74.1240},
        "lastUpdate": "2025-09-04T16:55:00"
    },
    {
        "id": "AST010",
        "deviceName": "Astra Elite",
        "userName": "Anita Nair", 
        "userId": "USR-2024-010",
        "emergencyContact": {
            "phone": "+91-9789456123",
            "email": "anita.nair@email.com"
        },
        "status": "active",
        "location": {"lat": 9.9312, "lng": 76.2673},
        "lastUpdate": "2025-09-04T17:05:00"
    }
];


document.addEventListener('DOMContentLoaded', function() {
    console.log('Application initializing...');
    
    
    allDevices = [...devicesData];
    filteredDevices = [...allDevices];
    
    
    const messageOverlay = document.getElementById('message-overlay');
    const confirmDialog = document.getElementById('confirm-dialog');
    const mapsModal = document.getElementById('maps-modal');
    
    if (messageOverlay) {
        messageOverlay.classList.add('hidden');
    }
    if (confirmDialog) {
        confirmDialog.classList.add('hidden');
    }
    if (mapsModal) {
        mapsModal.classList.add('hidden');
    }
    
    
    setupModalEventListeners();
    
    
    showPage('landing');
    console.log('Application initialized successfully');
});


function setupModalEventListeners() {
    try {
        const mapsModal = document.getElementById('maps-modal');
        
        if (mapsModal) {
            
            mapsModal.addEventListener('click', function(event) {
                if (event.target === mapsModal) {
                    closeMapModal();
                }
            });
        }
    } catch (error) {
        console.error('Error setting up modal event listeners:', error);
    }
}


function showPage(pageId) {
    try {
        console.log(`Navigating to page: ${pageId}`);
        
        
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.remove('active');
            console.log(`Hiding page: ${page.id}`);
        });
        
        
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            currentPage = pageId;
            console.log(`Showing page: ${targetPage.id}`);
            
            
            if (pageId === 'dashboard') {
                initializeDashboard();
            }
        } else {
            console.error(`Page not found: ${pageId}-page`);
        }
    } catch (error) {
        console.error('Error in showPage:', error);
    }
}


window.navigateToSignIn = function() {
    try {
        console.log('Navigate to Sign In clicked');
        showPage('signin');
    } catch (error) {
        console.error('Error navigating to sign in:', error);
    }
};

window.navigateToLanding = function() {
    try {
        console.log('Navigate to Landing clicked');
        showPage('landing');
    } catch (error) {
        console.error('Error navigating to landing:', error);
    }
};

window.navigateToDashboard = function() {
    try {
        console.log('Navigate to Dashboard clicked');
        if (currentUser) {
            showPage('dashboard');
        } else {
            showMessage('Please sign in first', 'error');
        }
    } catch (error) {
        console.error('Error navigating to dashboard:', error);
    }
};

window.navigateToSettings = function() {
    try {
        console.log('Navigate to Settings clicked');
        if (currentUser) {
            showPage('settings');
        } else {
            showMessage('Please sign in first', 'error');
        }
    } catch (error) {
        console.error('Error navigating to settings:', error);
    }
};


window.handleSignIn = function(event) {
    event.preventDefault();
    
    try {
        console.log('Sign in form submitted');
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        console.log(`Attempting login with username: ${username}`);
        
        
        const user = mockUsers.find(u => u.username === username && u.password === password);
        
        if (user) {
            currentUser = user.username;
            console.log(`Login successful for: ${currentUser}`);
            showMessage('Sign in successful! Redirecting to dashboard...', 'success');
            
            setTimeout(() => {
                hideMessage();
                navigateToDashboard();
            }, 1500);
        } else {
            console.log('Login failed - invalid credentials');
            showMessage('Invalid username or password. Please check demo credentials.', 'error');
        }
    } catch (error) {
        console.error('Error in handleSignIn:', error);
        showMessage('An error occurred during sign in. Please try again.', 'error');
    }
};

window.handleSignUp = function(event) {
    event.preventDefault();
    
    try {
        console.log('Sign up form submitted');
        const fullname = document.getElementById('new-fullname').value.trim();
        const email = document.getElementById('new-email').value.trim();
        const username = document.getElementById('new-username').value.trim();
        const password = document.getElementById('new-password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();
        
        
        if (password !== confirmPassword) {
            showMessage('Passwords do not match. Please try again.', 'error');
            return;
        }
        
        
        if (mockUsers.find(u => u.username === username)) {
            showMessage('Username already exists. Please choose another.', 'error');
            return;
        }
        
        
        if (mockUsers.find(u => u.email === email)) {
            showMessage('Email already registered. Please use another email.', 'error');
            return;
        }
        
        
        const newUser = {
            username: username,
            password: password,
            fullname: fullname,
            email: email
        };
        
        mockUsers.push(newUser);
        console.log(`New account created for: ${username}`);
        
        showMessage('Account created successfully! Please sign in.', 'success');
        
        
        setTimeout(() => {
            switchToSignIn();
            
            document.getElementById('username').value = username;
            document.getElementById('password').value = '';
        }, 1500);
        
    } catch (error) {
        console.error('Error in handleSignUp:', error);
        showMessage('An error occurred during sign up. Please try again.', 'error');
    }
};

window.switchToSignIn = function() {
    try {
        document.getElementById('signin-form').classList.remove('hidden');
        document.getElementById('signup-form').classList.add('hidden');
        document.getElementById('signin-tab').classList.add('active');
        document.getElementById('signup-tab').classList.remove('active');
        document.getElementById('auth-title').textContent = 'Sign In to Dashboard';
        document.getElementById('auth-subtitle').textContent = 'Access your GPS device management console';
    } catch (error) {
        console.error('Error switching to sign in:', error);
    }
};

window.switchToSignUp = function() {
    try {
        document.getElementById('signin-form').classList.add('hidden');
        document.getElementById('signup-form').classList.remove('hidden');
        document.getElementById('signin-tab').classList.remove('active');
        document.getElementById('signup-tab').classList.add('active');
        document.getElementById('auth-title').textContent = 'Create Your Account';
        document.getElementById('auth-subtitle').textContent = 'Join ASTra GPS management platform';
    } catch (error) {
        console.error('Error switching to sign up:', error);
    }
};

window.handleLogout = function() {
    try {
        console.log('Logout clicked');
        currentUser = null;
        showMessage('Logged out successfully', 'success');
        
        setTimeout(() => {
            hideMessage();
            navigateToLanding();
        }, 1000);
    } catch (error) {
        console.error('Error in handleLogout:', error);
    }
};


function initializeDashboard() {
    try {
        console.log('Initializing dashboard...');
        if (!currentUser) {
            navigateToLanding();
            return;
        }
        
        
        const currentUserElement = document.getElementById('current-user');
        if (currentUserElement) {
            currentUserElement.textContent = currentUser;
        }
        
        
        const searchInput = document.getElementById('device-search');
        const statusFilter = document.getElementById('status-filter');
        
        if (searchInput) searchInput.value = '';
        if (statusFilter) statusFilter.value = '';
        
        
        filteredDevices = [...allDevices];
        
        
        updateDeviceStats();
        renderDevices();
        renderMapMarkers();
        
        
        startAutoRefresh();
        console.log('Dashboard initialized successfully');
    } catch (error) {
        console.error('Error initializing dashboard:', error);
    }
}

function updateDeviceStats() {
    try {
        const activeCount = allDevices.filter(device => device.status === 'active').length;
        const totalCount = allDevices.length;
        
        const activeCountElement = document.getElementById('active-count');
        const totalCountElement = document.getElementById('total-count');
        
        if (activeCountElement) activeCountElement.textContent = activeCount;
        if (totalCountElement) totalCountElement.textContent = totalCount;
    } catch (error) {
        console.error('Error updating device stats:', error);
    }
}


window.openDeviceLocation = function(deviceId) {
    try {
        console.log(`Opening device location modal for: ${deviceId}`);
        const device = allDevices.find(d => d.id === deviceId);
        if (!device) {
            console.error('Device not found:', deviceId);
            return;
        }
        
        const modal = document.getElementById('maps-modal');
        const deviceNameElement = document.getElementById('modal-device-name');
        const deviceInfoElement = document.getElementById('modal-device-info');
        const mapsIframe = document.getElementById('google-maps-iframe');
        
        if (!modal || !deviceNameElement || !deviceInfoElement || !mapsIframe) {
            console.error('Modal elements not found');
            return;
        }
        
        
        deviceNameElement.textContent = device.deviceName;
        deviceInfoElement.textContent = `${device.userName} â€¢ ${device.id} â€¢ ${device.status.toUpperCase()}`;
        
        
        const mapsUrl = `https://maps.google.com/maps?q=${device.location.lat},${device.location.lng}&hl=en&z=14&output=embed`;
        mapsIframe.src = mapsUrl;
        
        
        modal.classList.remove('hidden');
        document.body.classList.add('modal-open');
        
        console.log(`Modal opened for ${device.deviceName} at coordinates: ${device.location.lat}, ${device.location.lng}`);
    } catch (error) {
        console.error('Error opening device location modal:', error);
    }
};

window.closeMapModal = function() {
    try {
        console.log('Closing maps modal');
        const modal = document.getElementById('maps-modal');
        const mapsIframe = document.getElementById('google-maps-iframe');
        
        if (modal) {
            modal.classList.add('hidden');
            document.body.classList.remove('modal-open');
        }
        
        
        if (mapsIframe) {
            mapsIframe.src = '';
        }
        
        console.log('Maps modal closed');
    } catch (error) {
        console.error('Error closing maps modal:', error);
    }
};

function renderDevices() {
    try {
        const devicesGrid = document.getElementById('devices-grid');
        if (!devicesGrid) return;
        
        if (filteredDevices.length === 0) {
            devicesGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                    <p style="color: var(--color-text-secondary); font-size: var(--font-size-lg);">
                        No devices found matching your criteria.
                    </p>
                </div>
            `;
            return;
        }
        
        devicesGrid.innerHTML = filteredDevices.map(device => `
            <div class="device-card" onclick="openDeviceLocation('${device.id}')">
                <div class="device-header">
                    <div class="device-info">
                        <h4>${device.deviceName}</h4>
                        <span class="device-id">${device.id}</span>
                    </div>
                    <span class="device-status-badge ${device.status}">${device.status}</span>
                </div>
                
                <div class="device-details">
                    <div class="detail-row">
                        <span class="detail-label">Owner:</span>
                        <span class="detail-value">${device.userName}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">User ID:</span>
                        <span class="detail-value">${device.userId}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Last Update:</span>
                        <span class="detail-value">${formatDate(device.lastUpdate)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Location:</span>
                        <span class="detail-value">${device.location.lat.toFixed(4)}, ${device.location.lng.toFixed(4)}</span>
                    </div>
                    
                    <div class="emergency-contact">
                        <div class="emergency-title">ðŸš¨ Emergency Contact</div>
                        <div class="detail-row">
                            <span class="detail-label">Phone:</span>
                            <span class="detail-value">${device.emergencyContact.phone}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Email:</span>
                            <span class="detail-value">${device.emergencyContact.email}</span>
                        </div>
                    </div>
                </div>
                
                <div class="device-actions" onclick="event.stopPropagation()">
                    <button class="btn btn--toggle btn--sm ${device.status === 'inactive' ? 'inactive' : ''}" onclick="toggleDeviceStatus('${device.id}')">
                        ${device.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button class="btn btn--danger btn--sm" onclick="confirmDeleteDevice('${device.id}')">
                        Delete
                    </button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error rendering devices:', error);
    }
}

function renderMapMarkers() {
    try {
        const mapGrid = document.getElementById('map-grid');
        if (!mapGrid) return;
        
        mapGrid.innerHTML = filteredDevices.map(device => `
            <div class="map-marker ${device.status}" onclick="openDeviceLocation('${device.id}')" title="${device.deviceName} - ${device.userName} (Click to view location details)">
                <div class="marker-id">${device.id}</div>
                <div class="marker-status">${device.status}</div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error rendering map markers:', error);
    }
}


window.filterDevices = function() {
    try {
        const searchInput = document.getElementById('device-search');
        const statusFilter = document.getElementById('status-filter');
        
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const statusFilterValue = statusFilter ? statusFilter.value : '';
        
        filteredDevices = allDevices.filter(device => {
            const matchesSearch = !searchTerm || 
                device.deviceName.toLowerCase().includes(searchTerm) ||
                device.id.toLowerCase().includes(searchTerm) ||
                device.userName.toLowerCase().includes(searchTerm) ||
                device.userId.toLowerCase().includes(searchTerm);
                
            const matchesStatus = !statusFilterValue || device.status === statusFilterValue;
            
            return matchesSearch && matchesStatus;
        });
        
        renderDevices();
        renderMapMarkers();
    } catch (error) {
        console.error('Error filtering devices:', error);
    }
};


window.toggleDeviceStatus = function(deviceId) {
    try {
        console.log(`Toggling status for device: ${deviceId}`);
        const device = allDevices.find(d => d.id === deviceId);
        if (device) {
            const newStatus = device.status === 'active' ? 'inactive' : 'active';
            device.status = newStatus;
            device.lastUpdate = new Date().toISOString();
            
            
            updateDeviceStats();
            renderDevices();
            renderMapMarkers();
            
            showMessage(`Device ${deviceId} status changed to ${newStatus}`, 'success');
        }
    } catch (error) {
        console.error('Error toggling device status:', error);
    }
};

window.confirmDeleteDevice = function(deviceId) {
    try {
        console.log(`Confirming delete for device: ${deviceId}`);
        const device = allDevices.find(d => d.id === deviceId);
        if (device) {
            const confirmDialog = document.getElementById('confirm-dialog');
            const confirmText = document.getElementById('confirm-text');
            const confirmYes = document.getElementById('confirm-yes');
            
            if (confirmDialog && confirmText && confirmYes) {
                confirmText.innerHTML = `Are you sure you want to permanently delete <strong>${device.deviceName}</strong>?<br>This action cannot be undone.`;
                
                
                confirmYes.onclick = null;
                
                
                confirmYes.onclick = () => deleteDevice(deviceId);
                
                confirmDialog.classList.remove('hidden');
            }
        }
    } catch (error) {
        console.error('Error showing confirmation dialog:', error);
    }
};

window.deleteDevice = function(deviceId) {
    try {
        console.log(`Deleting device: ${deviceId}`);
        
        allDevices = allDevices.filter(device => device.id !== deviceId);
        filteredDevices = filteredDevices.filter(device => device.id !== deviceId);
        
        
        updateDeviceStats();
        renderDevices();
        renderMapMarkers();
        
        hideConfirmDialog();
        showMessage(`Device ${deviceId} has been permanently deleted.`, 'success');
    } catch (error) {
        console.error('Error deleting device:', error);
    }
};

window.updateMap = function() {
    try {
        console.log('Updating map...');
        const mapGrid = document.getElementById('map-grid');
        const updateButton = document.querySelector('[onclick="updateMap()"]');
        
        if (!mapGrid || !updateButton) return;
        
        
        mapGrid.classList.add('updating');
        updateButton.textContent = 'ðŸ”„ Updating...';
        updateButton.disabled = true;
        
        
        setTimeout(() => {
            
            allDevices.forEach(device => {
                if (device.status === 'active') {
                    device.lastUpdate = new Date().toISOString();
                    
                    device.location.lat += (Math.random() - 0.5) * 0.001;
                    device.location.lng += (Math.random() - 0.5) * 0.001;
                }
            });
            
            
            filterDevices();
            
            
            mapGrid.classList.remove('updating');
            updateButton.textContent = 'ðŸ”„ Update Map';
            updateButton.disabled = false;
            
            showMessage('Map updated successfully! Device locations refreshed.', 'success');
        }, 2000);
    } catch (error) {
        console.error('Error updating map:', error);
    }
};


window.hideConfirmDialog = function() {
    try {
        const confirmDialog = document.getElementById('confirm-dialog');
        if (confirmDialog) {
            confirmDialog.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error hiding confirm dialog:', error);
    }
};


function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffMinutes = Math.floor((now - date) / (1000 * 60));
        
        if (diffMinutes < 1) return 'Just now';
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Unknown';
    }
}

function showMessage(text, type = 'info') {
    try {
        const overlay = document.getElementById('message-overlay');
        const messageText = document.getElementById('message-text');
        
        if (!overlay || !messageText) return;
        
        messageText.innerHTML = text;
        overlay.classList.remove('hidden');
        
        
        if (type === 'success' || type === 'info') {
            setTimeout(() => {
                hideMessage();
            }, 3000);
        }
    } catch (error) {
        console.error('Error showing message:', error);
    }
}

window.hideMessage = function() {
    try {
        const overlay = document.getElementById('message-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error hiding message:', error);
    }
};


let autoRefreshInterval = null;

function startAutoRefresh() {
    try {
        if (currentPage === 'dashboard' && currentUser) {
            autoRefreshInterval = setInterval(() => {
                
                allDevices.forEach(device => {
                    if (device.status === 'active' && Math.random() > 0.7) {
                        device.lastUpdate = new Date().toISOString();
                    }
                });
                
                
                const searchInput = document.getElementById('device-search');
                const statusFilter = document.getElementById('status-filter');
                
                const searchTerm = searchInput ? searchInput.value.trim() : '';
                const statusFilterValue = statusFilter ? statusFilter.value : '';
                
                if (!searchTerm && !statusFilterValue) {
                    renderDevices();
                }
            }, 30000);
        }
    } catch (error) {
        console.error('Error starting auto-refresh:', error);
    }
}

function stopAutoRefresh() {
    try {
        if (autoRefreshInterval) {
            clearInterval(autoRefreshInterval);
            autoRefreshInterval = null;
        }
    } catch (error) {
        console.error('Error stopping auto-refresh:', error);
    }
}


document.addEventListener('keydown', function(event) {
    try {
        
        if (event.key === 'Escape') {
            hideMessage();
            hideConfirmDialog();
            closeMapModal();
        }
        
        
        if (event.ctrlKey && event.key === '/' && currentPage === 'dashboard') {
            event.preventDefault();
            const searchInput = document.getElementById('device-search');
            if (searchInput) {
                searchInput.focus();
            }
        }
    } catch (error) {
        console.error('Error in keydown handler:', error);
    }
});


document.addEventListener('visibilitychange', function() {
    try {
        if (document.hidden) {
            stopAutoRefresh();
        } else if (currentPage === 'dashboard') {
            startAutoRefresh();
        }
    } catch (error) {
        console.error('Error in visibility change handler:', error);
    }
});


window.addEventListener('beforeunload', function() {
    try {
        stopAutoRefresh();
    } catch (error) {
        console.error('Error in beforeunload handler:', error);
    }
});


window.changeLanguage = function(language) {
    try {
        currentLanguage = language;
        console.log('Language changed to:', language);
        showMessage(`Language changed to ${language}. (Note: Translation not implemented in demo)`, 'info');
        
        localStorage.setItem('astra-language', language);
    } catch (error) {
        console.error('Error changing language:', error);
    }
};

window.changeTheme = function(theme) {
    try {
        currentTheme = theme;
        console.log('Theme changed to:', theme);
        
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-color-scheme', 'dark');
        } else if (theme === 'light') {
            document.documentElement.setAttribute('data-color-scheme', 'light');
        } else {
            
            document.documentElement.removeAttribute('data-color-scheme');
        }
        
        localStorage.setItem('astra-theme', theme);
        showMessage(`Theme changed to ${theme}`, 'success');
    } catch (error) {
        console.error('Error changing theme:', error);
    }
};

window.exportData = function(format) {
    try {
        console.log('Exporting data as:', format);
        
        if (format === 'json') {
            const dataStr = JSON.stringify(allDevices, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
            
            const exportFileDefaultName = `astra-devices-${new Date().toISOString().slice(0,10)}.json`;
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
            
            showMessage('Data exported as JSON successfully!', 'success');
            
        } else if (format === 'csv') {
            
            const headers = ['ID', 'Device Name', 'User Name', 'User ID', 'Status', 'Latitude', 'Longitude', 'Last Update', 'Emergency Phone', 'Emergency Email'];
            const csvContent = [
                headers.join(','),
                ...allDevices.map(device => [
                    device.id,
                    device.deviceName,
                    device.userName,
                    device.userId,
                    device.status,
                    device.location.lat,
                    device.location.lng,
                    device.lastUpdate,
                    device.emergencyContact.phone,
                    device.emergencyContact.email
                ].join(','))
            ].join('\n');
            
            const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
            const exportFileDefaultName = `astra-devices-${new Date().toISOString().slice(0,10)}.csv`;
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
            
            showMessage('Data exported as CSV successfully!', 'success');
            
        } else if (format === 'pdf') {
            showMessage('PDF export feature coming soon! For now, you can print this page to PDF.', 'info');
            
        }
        
    } catch (error) {
        console.error('Error exporting data:', error);
        showMessage('Error exporting data. Please try again.', 'error');
    }
};


window.addEventListener('DOMContentLoaded', function() {
    try {
        
        const savedTheme = localStorage.getItem('astra-theme');
        if (savedTheme) {
            changeTheme(savedTheme);
            
            const themeRadio = document.querySelector(`input[name="theme"][value="${savedTheme}"]`);
            if (themeRadio) themeRadio.checked = true;
        }
        
        
        const savedLanguage = localStorage.getItem('astra-language');
        if (savedLanguage) {
            currentLanguage = savedLanguage;
            const languageSelect = document.getElementById('language-select');
            if (languageSelect) languageSelect.value = savedLanguage;
        }
    } catch (error) {
        console.error('Error loading preferences:', error);
    }
});

