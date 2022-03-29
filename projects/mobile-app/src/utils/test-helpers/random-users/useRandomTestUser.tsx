import { AccountType } from "generated/graphql";
import randomUsers from "../randomUsers.json";

export interface GeneratedUserRecord {
  cell: string;
  dob: { date: string; age: number };
  gender: string;
  id: { name: string; value: string | null };
  location: {
    city: string;
    street: { number: number; name: string };
    coordinates: { latitude: string; longitude: string };
    country: string;
    postcode: string | number;
    state: string;
    timezone: {
      description: string;
      offset: string;
    };
  };
  login: {
    md5: string;
    password: string;
    salt: string;
    sha1: string;
    sha256: string;
    username: string;
    uuid: string;
  };
  name: {
    first: string;
    last: string;
    title: string;
  };
  nat: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  registered: {
    age: number;
    date: string;
  };
}
export interface GeneratedUser {
  chosenUser: number;
  user: GeneratedUserRecord;
}

export const useRandomTestUser = (userArrayPosition?: number) => {
  const randomPosition = userArrayPosition || Math.floor(Math.random() * randomUsers.results.length);
  const user = randomUsers.results[randomPosition];
  return { chosenUser: randomPosition, user };
};

export const getRandomTestUser = (userArrayPosition?: number) => {
  const randomPosition = userArrayPosition || Math.floor(Math.random() * randomUsers.results.length);
  const user = randomUsers.results[randomPosition];
  return { chosenUser: randomPosition, user };
};

export const getTestUsers = (numberOfUsers: number, startPosition?: number) =>
  Array.from({ length: numberOfUsers }, () => getRandomTestUser(startPosition));

export const convertGeneratedtoAccounts = (users: GeneratedUser[]): AccountType[] =>
  users.map((currentUser: GeneratedUser) => ({
    id: currentUser.user.login.uuid,
    userName: currentUser.user.login.username,
    displayName: `${currentUser.user.name.first} ${currentUser.user.name.last}`,
    image: currentUser.user.picture.thumbnail,
    isMerchant: false,
  }));
