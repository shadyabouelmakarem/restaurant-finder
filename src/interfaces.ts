export interface Restaurant {
  name: string;
  id: string;
  url: string;
  phone: string;
  display_phone: string;
  rating: number;
  photos: string[];
  location: Location;
  reviews: Review[];
}

export interface Location {
  address1: string;
  city: string;
  postal_code: string;
  formatted_address: string;
}

export interface Review {
  text: string;
  rating: number;
}

export interface ThemeColors {
  "--base": string;
  "--dark-gray": string;
  "--light-gray": string;
  "--sky-blue": string;
}
