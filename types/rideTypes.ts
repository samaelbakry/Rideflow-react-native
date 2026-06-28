export interface Car {
  id: string;
  title: string;
  multiplier: number;
  image_url: string;
}

export interface Driver {
  id: string;
  name: string;
  rating: number;
  car_model: string;
  plate_number: string;
  lat: number;
  lng: number;
  is_available: boolean;
  ride_type: string;
  color:string
}