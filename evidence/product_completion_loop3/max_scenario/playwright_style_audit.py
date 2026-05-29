import json
from html.parser import HTMLParser
from pathlib import Path
import hashlib
import re
import sys
import time

class AuditParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self._in_title = False
        self.testids = set()
        self.aria_labels = []
        self.buttons = []
        self.text = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "title":
            self._in_title = True
        if "data-testid" in attrs:
            self.testids.add(attrs["data-testid"])
        if "aria-label" in attrs:
            self.aria_labels.append(attrs["aria-label"])
        if tag == "button":
            self.buttons.append(attrs)
    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False
    def handle_data(self, data):
        if self._in_title:
            self.title += data.strip()
        if data.strip():
            self.text.append(data.strip())

def sha256(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest().upper()

started = time.perf_counter()
root = Path(__file__).resolve().parent
site_path = root / "test_site.html"
source = site_path.read_text(encoding="utf-8")
parser = AuditParser()
parser.feed(source)
checks = [
    {"id": "title", "status": "PASS" if parser.title == "Terminator Test Module" else "FAIL", "note": parser.title},
    {"id": "start_button", "status": "PASS" if "start-button" in parser.testids else "FAIL", "note": "data-testid=start-button"},
    {"id": "aria", "status": "PASS" if parser.aria_labels else "FAIL", "note": "; ".join(parser.aria_labels)},
    {"id": "no_real_secret", "status": "PASS" if not re.search(r"sk-[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9_]{20,}|AIza[A-Za-z0-9_-]{20,}", source) else "FAIL", "note": "no token-like pattern"},
    {"id": "no_ai_api", "status": "PASS" if not re.search(r"openai\.com/v1|generativelanguage\.googleapis|openrouter\.ai/api|api\.deepseek", source, re.I) else "FAIL", "note": "no AI API endpoint"},
]
risks = [line for line in parser.text if line.startswith("Риск:")]
if not risks:
    risks.append("Нет отдельного risk-note; добавить UX copy перед production hardening.")
plan = [
    "Проверить title и корневой landmark.",
    "Проверить кнопку data-testid=start-button и aria-label.",
    "Проверить отсутствие token-like и AI API endpoint patterns.",
    "Добавить отдельный offline-state test в следующий UX polish pass."
]
result = {
    "scenario": "mini audit of test module",
    "site": str(site_path),
    "script": str(Path(__file__).resolve()),
    "site_sha256": sha256(site_path),
    "script_sha256": sha256(Path(__file__).resolve()),
    "checks": checks,
    "risks": risks,
    "autotest_plan": plan,
    "stdout_summary": "PASS with UX risk" if all(c["status"] == "PASS" for c in checks) else "FAIL",
    "exit_code": 0 if all(c["status"] == "PASS" for c in checks) else 1,
    "duration_ms": round((time.perf_counter() - started) * 1000),
}
print(json.dumps(result, ensure_ascii=False, indent=2))
sys.exit(result["exit_code"])

