export type Gender = {
  gender: string;
  probability: number;
};
export type Nationality = {
  country_id: string;
  probability: number;
};
export type NameData = {
  name: string;
  gender: Gender;
  nationality: Nationality[];
};
