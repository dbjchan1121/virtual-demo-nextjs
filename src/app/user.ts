export enum Status {
  ACTIVE = 1,
  INACTIVE = 0,
}

type Result<T> = {
  code: number;
  data: T;
  msg: string;
};

export type User = {
  id: number;
  name: string;
  avatar: string;
  status: Status;
};

export const getUserList: () => Promise<Result<User[]>> = async () => {
  // const data = await fetch("http://192.168.50.247:8080/api/getUserList");
  const data = await fetch("http://192.168.1.33:8080/api/getUserList");
  const posts = await data.json();
  return posts;
};
