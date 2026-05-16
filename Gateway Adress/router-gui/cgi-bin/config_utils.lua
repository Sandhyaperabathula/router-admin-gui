local M = {}

-- Simple key-value parser for .conf files
function M.read_config(file_path)
    -- Fallback for local testing if /etc/config doesn't exist
    if not io.open(file_path, "r") then
        local filename = file_path:match("([^/]+)$") or "config.conf"
        file_path = filename -- Use local file instead
    end

    local config = {}
    local f = io.open(file_path, "r")
    if not f then return config end
    
    for line in f:lines() do
        -- Skip comments and empty lines
        if not line:match("^%s*#") and not line:match("^%s*$") then
            local key, value = line:match("^%s*([^=]+)%s*=%s*(.-)%s*$")
            if key and value then
                config[key] = value
            end
        end
    end
    f:close()
    return config
end

function M.write_config(file_path, config)
    -- Fallback for local testing if /etc/config doesn't exist
    local f_check = io.open(file_path, "a")
    if not f_check then
        local filename = file_path:match("([^/]+)$") or "config.conf"
        file_path = filename
    else
        f_check:close()
    end

    local f = io.open(file_path, "w")
    if not f then return false end
    
    for k, v in pairs(config) do
        f:write(string.format("%s=%s\n", k, v))
    end
    f:close()
    return true
end

return M
