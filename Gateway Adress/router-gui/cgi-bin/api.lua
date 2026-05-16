#!/usr/bin/lua

-- Ensure we can find local modules
package.path = package.path .. ";./?.lua;/www/cgi-bin/?.lua"

local config_utils = require("config_utils")

-- Helper to parse POST body
local function get_post_data()
    local length = tonumber(os.getenv("CONTENT_LENGTH")) or 0
    if length > 0 then
        return io.read(length)
    end
    return nil
end

-- Very simple JSON encoder for success/error messages
local function json_response(data)
    io.write("Content-Type: application/json\n")
    io.write("Cache-Control: no-cache\n")
    io.write("Connection: close\n\n")
    
    local parts = {}
    for k, v in pairs(data) do
        local val
        if type(v) == "boolean" then
            val = tostring(v)
        elseif type(v) == "number" then
            val = tostring(v)
        else
            val = '"' .. tostring(v):gsub('"', '\\"') .. '"'
        end
        table.insert(parts, string.format('"%s": %s', k, val))
    end
    io.write("{" .. table.concat(parts, ", ") .. "}\n")
end

-- Simple URL decode
local function url_decode(str)
    str = string.gsub(str, "+", " ")
    str = string.gsub(str, "%%(%x%x)", function(h) return string.char(tonumber(h, 16)) end)
    return str
end

-- Simple form-data parser (key1=val1&key2=val2)
local function parse_form_data(data)
    local params = {}
    for pair in data:gmatch("[^&]+") do
        local key, value = pair:match("([^=]+)=(.*)")
        if key and value then
            params[url_decode(key)] = url_decode(value)
        end
    end
    return params
end

local method = os.getenv("REQUEST_METHOD") or "GET"
local query_string = os.getenv("QUERY_STRING") or ""

if method == "GET" then
    -- Load settings
    local action = query_string:match("action=([^&]+)")
    if action == "load_wifi" then
        local config = config_utils.read_config("/etc/config/wifi.conf")
        json_response(config)
    elseif action == "load_security" then
        local config = config_utils.read_config("/etc/config/security.conf")
        json_response(config)
    elseif action == "load_wps" then
        local config = config_utils.read_config("/etc/config/wps.conf")
        json_response(config)
    else
        json_response({error = "Invalid action"})
    end

elseif method == "POST" then
    -- Save settings
    local data = get_post_data()
    if not data then
        json_response({error = "No data received"})
        return
    end

    local params = parse_form_data(data)
    local action = params.action

    if action == "save_wifi" then
        -- Remove action from params before saving
        params.action = nil
        local success = config_utils.write_config("/etc/config/wifi.conf", params)
        if success then
            -- Apply settings (e.g., reload wifi service)
            os.execute("/sbin/wifi reload &")
            json_response({status = "success", message = "WiFi settings saved and applied successfully"})
        else
            json_response({status = "error", message = "Failed to write WiFi config"})
        end
    elseif action == "save_security" then
        params.action = nil
        local success = config_utils.write_config("/etc/config/security.conf", params)
        if success then
            -- Apply settings
            os.execute("/sbin/wifi reload &")
            json_response({status = "success", message = "Security settings saved and applied successfully"})
        else
            json_response({status = "error", message = "Failed to write Security config"})
        end
    elseif action == "save_wps" then
        params.action = nil
        local success = config_utils.write_config("/etc/config/wps.conf", params)
        if success then
            -- Apply settings
            os.execute("/etc/init.d/hostapd restart &")
            json_response({status = "success", message = "WPS settings saved and applied successfully"})
        else
            json_response({status = "error", message = "Failed to write WPS config"})
        end
    else
        json_response({error = "Invalid action"})
    end
end
