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
  const episodes = 520;
  const jsonFile = "test_episode_data.json";
  const logFile = "test-log.log";

  try {
    let jsonData = [];

    // Check if the JSON file already exists
    if (fs.existsSync(jsonFile)) {
      const existingData = fs.readFileSync(jsonFile);
      jsonData = JSON.parse(existingData);
    }

    // Open the log file in append mode
    const logStream = fs.createWriteStream(logFile, { flags: "a" });

    // Redirect console output to the log file
    console.log = (message) => {
      logStream.write(`[LOG] ${message}\n`);
      process.stdout.write(`[LOG] ${message}\n`);
    };

    // Redirect console errors to the log file
    console.error = (error) => {
      logStream.write(`[ERROR] ${error}\n`);
      process.stderr.write(`[ERROR] ${error}\n`);
    };

    for (let episodeNo = 501; episodeNo <= episodes; episodeNo++) {
      try {
        const data = await fetchData(episodeNo);
        const episodeData = {
          episodeNumber: episodeNo,
          vidstreaming: data,
        };
        jsonData.push(episodeData);
        console.log(`Episode ${episodeNo} processed.`);
      } catch (err) {
        console.error(`Error processing episode ${episodeNo}: ${err}`);
        episodeNo = episodeNo - 1;
      }
    }

    fs.writeFileSync(jsonFile, JSON.stringify(jsonData, null, 2));
    console.log(`Data written to ${jsonFile} successfully.`);

    // Close the log stream
    logStream.end();
    console.log(`Log file '${logFile}' created successfully.`);
  } catch (err) {
    console.error(err);
  }
};

writeEpisodeDataToFile();
