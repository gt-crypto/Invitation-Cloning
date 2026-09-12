from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent
API_ORIGIN = "https://api.invitationnation.in"
CDN_ORIGIN = "https://cdn-admin.invitationnation.in"
SITE_ORIGIN = "https://wed002-livedemo.invitationnation.in"


class InvitationHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        request = urlsplit(self.path)

        if request.path == "/" and not request.query:
            self.send_response(302)
            self.send_header("Location", "/?slug=wed002-livedemo")
            self.end_headers()
            return

        if request.path.startswith("/api/"):
            self.proxy_remote(request, "/api", API_ORIGIN)
            return

        if request.path.startswith("/cdn-admin/"):
            self.proxy_remote(request, "/cdn-admin", CDN_ORIGIN)
            return

        if request.path.startswith("/assets/") and request.path.endswith(".ttf"):
            self.proxy_font(request)
            return

        if request.path.endswith(".js"):
            self.serve_rewritten_javascript(request.path)
            return

        super().do_GET()

    def proxy_remote(self, request, local_prefix, remote_origin):
        upstream_url = remote_origin + request.path[len(local_prefix):]
        if request.query:
            upstream_url += "?" + request.query

        try:
            upstream = urlopen(Request(upstream_url, headers={"Accept": "application/json"}))
            body = upstream.read()
            content_type = upstream.headers.get_content_type()
            status = upstream.status
        except HTTPError as error:
            body = error.read()
            content_type = error.headers.get_content_type()
            status = error.code
        except URLError as error:
            self.send_error(502, "API proxy failed: " + str(error.reason))
            return

        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def proxy_font(self, request):
        upstream_url = SITE_ORIGIN + request.path
        try:
            upstream = urlopen(Request(upstream_url))
            body = upstream.read()
        except (HTTPError, URLError) as error:
            self.send_error(502, "Font proxy failed: " + str(error))
            return

        self.send_response(200)
        self.send_header("Content-Type", "font/ttf")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def serve_rewritten_javascript(self, path):
        file_path = ROOT / path.lstrip("/")
        if not file_path.is_file():
            self.send_error(404, "JavaScript file not found")
            return

        body = file_path.read_bytes().replace(
            API_ORIGIN.encode("ascii"), b"/api"
        ).replace(
            CDN_ORIGIN.encode("ascii"), b"/cdn-admin"
        )
        self.send_response(200)
        self.send_header("Content-Type", "text/javascript; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 4173), InvitationHandler)
    print("Invitation running at http://localhost:4173/")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
    finally:
        server.server_close()
