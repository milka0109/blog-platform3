export const getStorageUser = () => {
  const stateImage = localStorage.image !== "undefined" ? localStorage.image : null;
  return {
    username: localStorage.username,
    email: localStorage.email,
    image: stateImage,
  };
};
export const setStorageUser = (username, email, image) => {
  localStorage.setItem("username", username);
  localStorage.setItem("email", email);
  localStorage.setItem("image", image);
};
export const deleteStorageUser = () => localStorage.clear();
