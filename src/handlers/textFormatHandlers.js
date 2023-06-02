import { format } from "date-fns";

export const changeTitle = (newTitle) => {
  document.getElementsByTagName("title")[0].textContent = newTitle;
};
export const formatDate = (date) => format(new Date(date), "LLLL d, yyyy");

export const prepareErrorsText = (errors) =>
  Object.entries(errors).map((error) => error.reduce((key, value) => `${key} ${value}`));

export const preparedItems = (items) =>
  items.map((item) => {
    const tagList = shortenList(item.tagList);
    return { ...item, title: shortenText(item.title), description: shortenText(item.description), tagList };
  });

function shortenText(text) {
  if (text === undefined || !text.trim().length) return "[EMPTY FIELD]";
  if (text.length > 100) {
    const textArr = text.split(" ", 20);
    if (textArr[0].length > 100) {
      return shortenWord(textArr[0]);
    }
    return `${textArr.join(" ")}...`;
  }
  return text;
}

export const shortenWord = (word) => {
  if (!word) return "empty";
  if (word.length > 100) {
    return `${word.slice(0, 20)}...`;
  }
  return word;
};

const shortenList = (list) => {
  const listCopy = [...list];
  listCopy.length = 10;
  return listCopy.map((item) => shortenWord(item));
};
