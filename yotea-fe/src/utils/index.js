import axios from "axios";

export const uploadFile = async (fileName) => {
  const formData = new FormData();
  formData.append("file", fileName);
  formData.append("upload_preset", "kkio3wiw");
  const { data } = await axios.post(
    "https://api.cloudinary.com/v1_1/levantuan/image/upload",
    formData
  );
  return data.url;
};

export const formatCurrency = (currency) =>
  currency.toLocaleString("it-IT", { style: "currency", currency: "VND" });

// format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const formatDate =
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  return `${formatDate}/${month}/${date.getFullYear()} ${hours}:${minutes}:${seconds}`;
};

// định dạng ngày tạo bài viết
export const formatDateNews = (dateString) => {
  const date = new Date(dateString || "");
  return `${date.getDate()} Tháng ${
    date.getMonth() + 1
  }, ${date.getFullYear()}`;
};

export const updateTitle = (title) => {
  document.title = `${title} - Trà sữa Yotea`;
};
