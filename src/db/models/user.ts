export interface IUserInfo {
  sex: "male" | "female";
  age: number;
  height: number; //cm
  weight: number; //kg
  activityLevel: number;
  energyBalance: "deficit" | "maintenance" | "surplus";
  energyOffset: number; // the amount of energy that adjusts the calorie intake
}
