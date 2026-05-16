import http.server
import os
import subprocess
import sys

# Change to the directory containing this script
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class CGIHandler(http.server.CGIHTTPRequestHandler):
    def is_cgi(self):
        # Treat .lua files as CGI scripts
        if self.path.endswith(".lua"):
            self.cgi_info = os.path.dirname(self.path), os.path.basename(self.path)
            return True
        return super().is_cgi()

def run(port=8001):
    server_address = ('', port)
    httpd = http.server.HTTPServer(server_address, CGIHandler)
    print(f"Starting CGI Server on http://localhost:{port}...")
    print(f"To test with real Lua, ensure 'lua' is in your PATH.")
    print(f"To stop the server, press Ctrl+C")
    
    # Ensure some config files exist locally for testing if /etc/config doesn't exist
    for conf in ['wifi.conf', 'security.conf', 'wps.conf']:
        if not os.path.exists(conf):
            with open(conf, 'w') as f:
                f.write("# Local test config\n")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        httpd.server_close()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8001
    run(port)
