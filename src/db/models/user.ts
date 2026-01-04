export interface IUserInfo {
  sex: "male" | "female";
  age: number;
  height: number;
  weight: number;
  activityLevel: number;
  energyBalance: "deficit" | "maintenance" | "surplus";
  energyOffset: number; // the amount of energy that adjusts the calorie intake
}

export class UserInfo implements IUserInfo {
  sex!: "male" | "female";
  age!: number;
  height!: number;
  weight!: number;
  activityLevel!: number;
  energyBalance!: "deficit" | "maintenance" | "surplus";
  energyOffset!: number;

  constructor(params: IUserInfo) {
    this.sex = params.sex;
    this.age = params.age;
    this.height = params.height;
    this.weight = params.weight;
    this.activityLevel = params.activityLevel;
    this.energyBalance = params.energyBalance;
    this.energyOffset = params.energyOffset;
  }

  getBMR(): number {
    const sexMod = this.sex === "male" ? 5 : -161;
    return 10 * this.weight + 6.25 * this.height - 5 * this.age + sexMod;
  }

  getTDEE(): number {
    return this.getBMR() * this.activityLevel;
  }

  getCalorieIntake(): number {
    const intake: number = this.getTDEE() - this.energyOffset;
    return Math.max(this.sex === "male" ? 1500 : 1200, intake);
  }
}
