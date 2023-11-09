import axios from "axios";

const generateAvatar = async (name) => {
  try {
    const response = await axios.get(
      `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}`
    );
    return response.config.url;
  } catch (error) {
    console.log("Error generating avatar:", error);
    return null;
  }
};

export default generateAvatar;
