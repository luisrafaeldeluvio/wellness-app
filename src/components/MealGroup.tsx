interface MealGroupProps {
  title: string;
  totalKcal: number;
}

const MealGroup = ({
  title,
  totalKcal,
  children,
}: React.PropsWithChildren<MealGroupProps>) => {
  return (
    <div className="p-4">
      <div className="pb-4">
        <span>{title}</span>
        <span className="float-right">{totalKcal} Kcal</span>
      </div>
      {children}
    </div>
  );
};

export default MealGroup;
