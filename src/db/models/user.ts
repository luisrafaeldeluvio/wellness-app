export interface IUserInfo {
  sex: "male" | "female";
  age: number;
  height: number;
  weight: number;
  activityLevel: number;
  deficit: number;
}

export class UserInfo implements IUserInfo {
  sex!: "male" | "female";
  age!: number;
  height!: number;
  weight!: number;
  activityLevel!: number;
  deficit!: number;

  constructor(params: IUserInfo) {
    this.sex = params.sex;
    this.age = params.age;
    this.height = params.height;
    this.weight = params.weight;
    this.activityLevel = params.activityLevel;
    this.deficit = params.deficit;
  }

  getBMR(): number {
    const sexMod = this.sex === "male" ? 5 : -161;
    return 10 * this.weight + 6.25 * this.height - 5 * this.age + sexMod;
  }

  getTDEE(): number {
    return this.getBMR() * this.activityLevel;
  }

  getCalorieIntake(): number {
    const intake: number = this.getTDEE() - this.deficit;
    return Math.max(this.sex === "male" ? 1500 : 1200, intake);
  }
}
