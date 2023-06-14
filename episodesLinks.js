import axios from "axios";

// Using the example query "demon", and looking at the 2nd page of results.
const url = "https://api.consumet.org/anime/gogoanime/demon?page=1";
const data = async () => {
 try {
 const { data } = await axios.get(url, { params: { page: 2 } });
 return data;
 } catch (err) {
 throw new Error(err.message);
 }
};

const info = await data()


console.log(info);
