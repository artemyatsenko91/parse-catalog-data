import puppeteer from "puppeteer";
import { Catalog } from "./types";

const DEFAULT_TIMEOUT = 30000;

export async function scrapeCatalogs(
  link: string,
  sectionId: string,
  sectionSelector: string,
  titleSelector: string,
  dateSelector: string,
  pdfSelector: string
): Promise<Catalog[]> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setDefaultTimeout(DEFAULT_TIMEOUT);

  try {
    await page.goto(link, { waitUntil: "networkidle2" });
    await page.waitForSelector(sectionId);

    const fullSectionSelector = `${sectionId} ${sectionSelector}`;

    const catalogs = await page.$$eval(
      fullSectionSelector,
      (items, args) => {
        const [tSelector, dSelector, pSelector] = args;
        console.log([tSelector, dSelector, pSelector]);
        return items.map((item) => {
          const titleElement = item.querySelector(tSelector);
          const title = titleElement
            ? titleElement?.textContent?.trim()
            : "No title";

          const dateElements = item.querySelectorAll(dSelector);
          const dateStart = dateElements[0]
            ? dateElements[0]?.textContent?.trim()
            : "No start date";
          const dateEnd = dateElements[1]
            ? dateElements[1]?.textContent?.trim()
            : "No end date";

          const pdfLinkElement = item.querySelector(pSelector);
          const pdfLink = pdfLinkElement
            ? pdfLinkElement.getAttribute("href")
            : "No PDF link";

          return { title, dateStart, dateEnd, pdfLink };
        });
      },
      [titleSelector, dateSelector, pdfSelector]
    );

    return catalogs;
  } catch (error) {
    console.error("Error while scraping:", error);
    throw error;
  } finally {
    await browser.close();
  }
}
