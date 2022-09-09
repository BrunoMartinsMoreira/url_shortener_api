interface ICreateUrlDTO {
  original_url: string;
  hash: string;
  user_id: string;
  short_url?: string;
  clicks?: number;
}

export { ICreateUrlDTO };
