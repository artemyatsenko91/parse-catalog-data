export const ARGS_CONSTANTS = {
  link: {
    default: "https://www.tus.si",
    describe: "Link to scraping site",
  },
  sectionId: {
    default: "#s2",
    describe: "Section id to scraping",
  },
  sectionSelector: {
    default: ".list-item",
    describe: "Selector to extract catalogs section",
  },
  titleSelector: {
    default: "h3 a",
    describe: "Selector to extract catalog name",
  },
  dateSelector: {
    default: "p time",
    describe: "Selector for extracting dates",
  },
  pdfSelector: {
    default: "a.pdf",
    describe: "Selector to extract PDF link",
  },
  outputDir: {
    default: "./output",
    describe: "Directory for saving JSON and PDF files",
  },
};
