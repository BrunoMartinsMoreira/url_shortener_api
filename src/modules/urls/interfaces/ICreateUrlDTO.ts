interface ICreateUrlDTO {
  original_url: string;
  hash: string;
  user_id: string;
  clicks?: number;
}

export { ICreateUrlDTO };
