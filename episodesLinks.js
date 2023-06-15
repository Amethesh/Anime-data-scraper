import axios from "axios";
import fs from "fs";

const fetchData = async (episodeNo) => {
  const url = `https://api.consumet.org/anime/gogoanime/watch/one-piece-episode-${episodeNo}`;
  try {
    const { data } = await axios.get(url, {
      params: { server: "vidstreaming" },
    });
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const writeEpisodeDataToFile = async () => {
  const episodes = 20;
  const jsonFile = "episode_data.json";

  try {
    let jsonData = [];

    // Check if the JSON file already exists
    if (fs.existsSync(jsonFile)) {
      const existingData = fs.readFileSync(jsonFile);
      jsonData = JSON.parse(existingData);
    }

    for (let episodeNo = 11; episodeNo <= episodes; episodeNo++) {
      const data = await fetchData(episodeNo);
      const episodeData = {
        episodeNumber: episodeNo,
        vidstreaming: data,
      };
      jsonData.push(episodeData);
      console.log(`Episode ${episodeNo} processed.`);
    }

    fs.writeFileSync(jsonFile, JSON.stringify(jsonData, null, 2));
    console.log(`Data written to ${jsonFile} successfully.`);
  } catch (err) {
    console.error(err);
  }
};

writeEpisodeDataToFile();
