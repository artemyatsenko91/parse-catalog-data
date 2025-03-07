import { promises as fs, existsSync } from "fs";
import path from "path";

import { scrapeCatalogs } from "./scrapper";
import { downloadCatalogs } from "./downloader";
import { Catalog } from "./types";
import { getCliArgs } from "./cli";

const saveCatalogsJson = async (catalogs: Catalog[], outputDir: string) => {
  const jsonPath = path.join(outputDir, "catalogs.json");
  await fs.writeFile(jsonPath, JSON.stringify(catalogs, null, 2));
};

async function main() {
  const argv = getCliArgs();

  try {
    const {
      link,
      titleSelector,
      dateSelector,
      pdfSelector,
      sectionSelector,
      sectionId,
      outputDir,
    } = argv;

    const catalogs = await scrapeCatalogs(
      link,
      sectionId,
      sectionSelector,
      titleSelector,
      dateSelector,
      pdfSelector
    );
    if (catalogs.length === 0) {
      console.log("No catalogs found.");
      return;
    }

    if (!existsSync(outputDir)) {
      fs.mkdir(outputDir, { recursive: true });
    }

    await saveCatalogsJson(catalogs, outputDir);

    await downloadCatalogs(catalogs, outputDir);
    console.log("The process has been completed successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
