import axios from "axios";

const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export default fetcher;
