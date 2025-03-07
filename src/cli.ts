import yargs from "yargs";
import { ARGS_CONSTANTS } from "./config";

export const getCliArgs = () =>
  yargs
    .option("link", {
      alias: "l",
      type: "string",
      describe: ARGS_CONSTANTS.link.describe,
      demandOption: true,
    })
    .option("sectionId", {
      alias: "id",
      describe: ARGS_CONSTANTS.sectionId.describe,
      default: ARGS_CONSTANTS.sectionId.default,
    })
    .option("sectionSelector", {
      alias: "s",
      type: "string",
      describe: ARGS_CONSTANTS.sectionSelector.describe,
      default: ARGS_CONSTANTS.sectionSelector.default,
    })
    .option("titleSelector", {
      alias: "t",
      type: "string",
      describe: ARGS_CONSTANTS.titleSelector.describe,
      default: ARGS_CONSTANTS.titleSelector.default,
    })
    .option("dateSelector", {
      alias: "d",
      type: "string",
      describe: ARGS_CONSTANTS.dateSelector.describe,
      default: ARGS_CONSTANTS.dateSelector.default,
    })
    .option("pdfSelector", {
      alias: "p",
      type: "string",
      describe: ARGS_CONSTANTS.pdfSelector.describe,
      default: ARGS_CONSTANTS.pdfSelector.default,
    })
    .option("outputDir", {
      alias: "o",
      type: "string",
      describe: ARGS_CONSTANTS.outputDir.describe,
      default: ARGS_CONSTANTS.outputDir.default,
    })
    .help()
    .parseSync();
