import React from "react"

export type ContainerProps = {
    children :React.ReactNode,
    className?:string,
    style?:object
}

export type LatLng = {
  description?: string;
  latitude: number;
  longitude: number;
};

export type CreateRideProps = {
  user_id: string;
  driver_id: string;
  car_id: string;

  origin: string;
  destination: string;

  origin_lat: number;
  origin_lng: number;

  destination_lat: number;
  destination_lng: number;

  distance: number;
  duration: number;

  price: number;

  status: string;
};

export type RideReview ={
  ride_id: string;
  driver_id: string;
  user_id: string;
  rating: number;
  comment?: string;
}

type ColorTheme = {
  primary: string;
  onPrimary: string;
  accent: string;


  background: string;
  surface: string;
  card: string;

  
  text: string;
  textSecondary: string;
  textMuted: string;

  border: string;
  icon: string;
  divider: string;

  danger: string;
  success: string;
  warning: string;

  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
};

export type AppColors = {
  light: ColorTheme;
  dark: ColorTheme;
};

export type RecentPlace = {
  id?:string,
  user_id: string;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
};
export type FavoritePlace = {
  id?:string,
  user_id?: string;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type Promo = {
  id: string;
  title: string;
  subtitle: string;
  button_text: string;
  background_color: string;
};
export type FavoritePlaceModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;

  recentPlaces: RecentPlace[];

  selectedPlace: FavoritePlace | null;
  setSelectedPlace: React.Dispatch<
    React.SetStateAction<FavoritePlace | null>
  >;

  handleSave: () => void;
};