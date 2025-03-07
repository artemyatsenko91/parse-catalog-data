import axios from "axios";
import { promises as fs } from "fs";
import path from "path";
import { Catalog } from "./types";

const sanitizeFileName = (title: string) =>
  title.replace(/[^a-z0-9]/gi, "_").toLowerCase() + ".pdf";

export const downloadCatalogs = async (
  catalogs: Array<Pick<Catalog, "title" | "pdfLink">>,
  outputDir: string
) => {
  if (!catalogs.length) return;

  await fs.mkdir(outputDir, { recursive: true });

  await Promise.all(
    catalogs.map(async (catalog, index) => {
      try {
        if (!catalog.pdfLink || !catalog.title) {
          console.warn(
            `Skipping catalog ${index + 1}: Missing PDF link or title.`
          );
          return;
        }

        const fileName = sanitizeFileName(catalog.title);
        const filePath = path.join(outputDir, fileName);
        const response = await axios.get(catalog.pdfLink, {
          responseType: "arraybuffer",
        });
        await fs.writeFile(filePath, response.data);
        console.log(`Downloaded ${index + 1}/${catalogs.length}: ${fileName}`);
      } catch (error) {
        if (error instanceof Error) {
          console.error(
            `Failed to download catalog ${index + 1}:`,
            error.message
          );
        } else
          console.error(`Failed to download catalog ${JSON.stringify(error)}`);
      }
    })
  );
};
