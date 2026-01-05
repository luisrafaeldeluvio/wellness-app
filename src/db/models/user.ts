export interface IUserInfo {
  sex: "male" | "female";
  age: number;
  height: number; //cm
  weight: number; //kg
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

  getEnergyOffset(): number {
    if (this.energyBalance == "deficit") {
      return this.getTDEE() * 0.25;
    } else if (this.energyBalance == "surplus") {
      return this.getTDEE() * 1.25;
    } else {
      return 0;
    }
  }

  getCalorieIntake(): number {
    const intake: number = this.getTDEE() - this.energyOffset;
    return Math.max(this.sex === "male" ? 1500 : 1200, intake);
  }
}
