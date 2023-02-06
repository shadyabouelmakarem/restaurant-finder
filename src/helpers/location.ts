import { Location } from "../interfaces";
export const parseLocation = (location: Location, full = false) => {
  return full
    ? location.formatted_address
    : `${location.address1}, ${location.city}`;
};
