export interface IJournal {
  id: number;
  date: string;
  foodItemIDs: number[];
  totalEnergy: {
    intake: number;
    outflow: number;
  };
}
