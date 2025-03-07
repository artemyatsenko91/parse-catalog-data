# Instructions for starting the scraper

## Requirements

- Install [Node.js](https://nodejs.org/) (version 16+)
- Make sure `npm` is available on the command line.

## Start

1. **Install dependencies**:
   ```bash
   npm install
   ```
1. **Build**:
   ```bash
   npx tsc
   ```
1. **Run the scraper (indicate the link to the site):**:
   ```bash
   node dist/main.js -l "https://www.tus.si" -id "#s2"
   ```
   **With custom settings:**:
   ```bash
   node dist/main.js -l "https://www.tus.si" -id "#s2" -s ".list-item" -t "h3 a" -d "p time" -p "a.pdf" -o "catalogs_output"
   ```
