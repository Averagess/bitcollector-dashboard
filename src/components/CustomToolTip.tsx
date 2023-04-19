const CustomToolTip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="text-purple-500 bg-black p-2 border-2 bg-opacity-50 rounded-xl">
        <h1>{label}</h1>
        {payload.map((item: any, i: number) => {
          return (
            <div key={i}>
              <h1>{item.name}</h1>
              <h1>{item.value}</h1>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

export default CustomToolTip;
