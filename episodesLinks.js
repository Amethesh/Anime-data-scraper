import axios from "axios";

// Using the example query "demon", and looking at the 2nd page of results.
const url = "https://api.consumet.org/anime/gogoanime/watch/one-piece-episode-1";
const data = async () => {
 try {
 const { data } = await axios.get(url, { params: { server: "streamsb" } });
 return data;
 } catch (err) {
 throw new Error(err.message);
 }
};

const info = await data()


console.log(info);
