/** type UserData for data from form */

export type UserData = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  age: number;
  gender: "male" | "female";
  phoneNumber: string;
  address: string;
  dateOfBirth: moment.Moment;
  hobbies: string[] | string;
};

/** type User for data from base of users*/
export type User = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  age: number;
  gender: "male" | "female";
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  hobbies: string[] | string;
  hobbiesName?: string[] | string;
};

export type Hobbie = {
  id: string;
  name: string;
};