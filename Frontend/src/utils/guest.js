import { v4 as uuidv4 } from "uuid";

export const getGuestId = () => {
  let guestId = localStorage.getItem("guestId");

  if (!guestId) {
    guestId = "guest_" + uuidv4();
    localStorage.setItem("guestId", guestId);
  }

  return guestId;
};
