import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:5173";
const out = process.argv[3] || "/tmp/screenshot.png";
const clickSelector = process.argv[4];

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
if (clickSelector) {
  await page.click(clickSelector).catch(() => {});
  await page.waitForTimeout(300);
}
await page.screenshot({ path: out, fullPage: true });
console.log("Screenshot saved to", out);
console.log("Console errors:", errors.length ? JSON.stringify(errors, null, 2) : "none");
await browser.close();
