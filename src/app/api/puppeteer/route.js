const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

export async function POST(){
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();

  await page.goto("https://www.example.com", { waitUntil: "networkidle0" });

  console.log("Chromium:", await browser.version());
  console.log("Page Title:", await page.title());

  await page.close();

  await browser.close();

    return new Response(
        JSON.stringify({ fullTitle: "success" }),
        { headers: { "Content-Type": "application/json" } }
      );
}