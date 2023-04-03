export interface IBeer {
  id: number;
  name: string;
  rating: number;
  image: string;
  price: number;
}

export interface IBeers {
  data: IBeer[];
  total: number;
}
