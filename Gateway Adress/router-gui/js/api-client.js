/**
 * api-client.js
 * Handles communication with the Lua backend with a localStorage fallback for development.
 */

const ApiClient = {
    // Determine if we are running on a real router or a dev server
    isDevMode: window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost",

    async fetch(action, method = "GET", data = null) {
        const url = method === "GET" ? `api.lua?action=${action}` : "api.lua";
        
        try {
            const options = {
                method: method,
            };

            if (method === "POST" && data) {
                options.body = data;
            }

            const response = await fetch(url, options);

            // If server returns 405 (Method Not Allowed) or 404, we are likely in a dev environment without CGI
            if (!response.ok) {
                if (response.status === 405 || response.status === 404) {
                    return this.simulate(action, method, data);
                }
                throw new Error(`Server returned ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.warn(`Backend error (${error.message}). Falling back to Simulation Mode.`);
            return this.simulate(action, method, data);
        }
    },

    /**
     * Simulation mode using localStorage. 
     * This allows UI testing even when the Lua backend isn't running.
     */
    simulate(action, method, data) {
        console.log(`%c[Simulation Mode] %c${method} %c${action}`, "color: orange; font-weight: bold", "color: blue", "color: green");
        
        const storageKey = `sim_config_${action.replace("save_", "").replace("load_", "")}`;

        if (method === "GET") {
            const saved = localStorage.getItem(storageKey);
            return saved ? JSON.parse(saved) : {};
        } else {
            // Convert URLSearchParams to object
            const params = {};
            data.forEach((value, key) => {
                if (key !== "action") params[key] = value;
            });
            
            localStorage.setItem(storageKey, JSON.stringify(params));
            return { status: "success", message: "(Simulated) Settings saved to localStorage" };
        }
    },

    showNotification(message, isError = false) {
        const notification = document.createElement("div");
        notification.className = "api-notification";
        Object.assign(notification.style, {
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "15px 25px",
            borderRadius: "5px",
            color: "white",
            backgroundColor: isError ? "#dc3545" : "#28a745",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            zIndex: "10000",
            transition: "opacity 0.5s ease",
            fontWeight: "bold"
        });
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = "0";
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
};

window.ApiClient = ApiClient;
