import readableNumber from "../helpers/readableNumber";

const CustomToolTip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="text-cyan-500 bg-black p-2 border-2 bg-opacity-50 rounded-xl">
        <h1>{label}</h1>
        {payload.map((item: any, i: number) => {
          return (
            <div key={i}>
              {typeof item.value === "number" ? (
                <h1>{readableNumber(item.value.toString())}</h1>
              ) : (
                <h1>{item.value}</h1>
              )}
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

export default CustomToolTip;
