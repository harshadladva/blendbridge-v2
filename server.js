import express from "express";
import { chromium } from "playwright";
import { writeFileSync, mkdirSync, readFileSync } from "fs";
import cors from "cors";

const app = express();
const port = 8000;
const RESULT_PATH = "./results/";
app.use(cors());

async function getPage() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  page.setExtraHTTPHeaders({
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
  });
  return page;
}

async function fetchJobs(companyName, page) {
  const k = encodeURIComponent(companyName.toLowerCase());
  await page.goto(
    `https://www.naukri.com/${slugify(companyName.toLowerCase())}-jobs?k=${k}`
  );

  await page.waitForSelector("[data-job-id]");
  const locators = await page.locator("[data-job-id]").all();

  const jobposts = [];
  for (const locator of locators) {
    const title = await getInnerText(locator.locator(".title").first());
    const subTitle = await getInnerText(locator.locator(".subTitle").first());
    const experience = await getInnerText(
      locator.locator(".experience").first()
    );
    const salary = await getInnerText(locator.locator(".salary").first());
    const location = await getInnerText(locator.locator(".location").first());
    const jobDescription = await getInnerText(
      locator.locator(".job-description").first()
    );
    jobposts.push({
      company: companyName,
      title,
      subTitle,
      experience,
      salary,
      location,
      jobDescription,
    });
  }

  return jobposts;
}

app.get("/company/:companyName", async (req, res) => {
  const page = await getPage();

  const jobPosts = await fetchJobs(req.params["companyName"], page);
  await page.close();
  res.json({ jobPosts });
});

const companies = ["Google", "Microsoft"];

app.get("/prepare", async (req, res) => {
  try {
    const page = await getPage();
    const jobs = [];
    for (const company of companies) {
      const jobPosts = await fetchJobs(company, page);
      jobs.push(...jobPosts);
    }
    await page.close();
    saveFile("jobposts.json", jobs);
    res.json({ status: "success" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: "error" });
  }
});

app.get("/", async (req, res) => {
  try {
    const jobs = readFileSync(`${RESULT_PATH}jobposts.json`, "utf8");
    res.json(JSON.parse(jobs));
  } catch (e) {
    res.status(500).json("Can not find joblists");
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// UTILS
function saveFile(path, data, dir = "") {
  mkdirSync(RESULT_PATH + dir, { recursive: true });
  writeFileSync(
    `${RESULT_PATH}${dir ? `${dir}/` : ""}${path}`,
    JSON.stringify(data, null, 2)
  );
}

async function getInnerText(locator) {
  const count = await locator.count();
  if (count === 0) {
    return "";
  }

  let text = await locator.innerText();
  return text;
}

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
