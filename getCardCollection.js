import axios from "axios";
import { promises as fs } from "fs";
import { dirname } from 'path';

// Function to ensure the directory exists
async function ensureDirectoryExistence(filePath) {
  const dir = dirname(filePath);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function fetchCardCollection(outputPath) {
  try {
    await ensureDirectoryExistence(outputPath);

    const response = await axios.get(
      "https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json"
    );
    const data = response.data;

    const jsonString = JSON.stringify(data, null, 2);

    await fs.writeFile(outputPath, jsonString);
    console.log("Card collection loaded");
  } catch (error) {
    console.error("Error on getting the cards", error);
  }
}

fetchCardCollection("src/resources/cards.collectible.json");
