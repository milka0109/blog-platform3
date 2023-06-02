import { getCookie, setCookie, deleteCookie } from "./cookieHandlers";
import { changeTitle, formatDate, prepareErrorsText, preparedItems, shortenWord } from "./textFormatHandlers";
import { getStorageUser, setStorageUser, deleteStorageUser } from "./storageHandlers";
import { submitUserData } from "./submissionHandlers";

export {
  getCookie,
  setCookie,
  deleteCookie,
  changeTitle,
  formatDate,
  prepareErrorsText,
  preparedItems,
  shortenWord,
  getStorageUser,
  setStorageUser,
  deleteStorageUser,
  submitUserData,
};
