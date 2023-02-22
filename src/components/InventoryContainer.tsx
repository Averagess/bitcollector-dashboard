import { InventoryItem } from "../types";

interface Props {
  inventory: InventoryItem[];
}

const InventoryContainer = ({ inventory }: Props) => {
  const Rows = inventory.map((item) => {
    return (
      <tr>
        <td className="font-bold p-2 outline-1 outline outline-sky-500 bg-slate-900">
          {item.name}
        </td>
        <td className="font-bold p-2 outline-1 outline outline-sky-500 bg-slate-900">
          {item.amount}
        </td>
        <td className="font-bold p-2 outline-1 outline outline-sky-500 bg-slate-900">
          {item.price}
        </td>
        <td className="font-bold p-2 outline-1 outline outline-sky-500 bg-slate-900">
          {Math.round(item.cps * 100) / 100}
        </td>
      </tr>
    );
  });

  const itemSum = inventory.reduce((acc, item) => acc + item.amount, 0);
  const priceSum = inventory.reduce((acc, item) => acc + item.price, 0);
  const cpsSum =
    Math.round(inventory.reduce((acc, item) => acc + item.cps, 0) * 100) / 100;

  return (
    <table className="border-collapse">
      <thead>
        <tr>
          <td className="font-bold p-2 outline-1 outline outline-sky-500 bg-slate-900">
            Item
          </td>
          <td className="font-bold p-2 outline-1 outline outline-sky-500 bg-slate-900">
            Amount
          </td>
          <td className="font-bold p-2 outline-1 outline outline-sky-500 bg-slate-900">
            Price
          </td>
          <td className="font-bold p-2 outline-1 outline outline-sky-500 bg-slate-900">
            CPS
          </td>
        </tr>
      </thead>
      <tbody>{Rows}</tbody>
      <tfoot>
        <tr>
          <td className="font-bold p-2 outline-1 outline outline-sky-500 bg-slate-900">
            Total
          </td>
          <td className="font-bold p-2 outline-1 outline outline-sky-500 bg-slate-900">
            {itemSum}
          </td>
          <td className="font-bold p-2 outline-1 outline outline-sky-500 bg-slate-900">
            {priceSum}
          </td>
          <td className="font-bold p-2 outline-1 outline outline-sky-500 bg-slate-900">
            {cpsSum}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default InventoryContainer;
