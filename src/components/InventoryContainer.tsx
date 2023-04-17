import { InventoryItem } from "../types";

interface Props {
  inventory: InventoryItem[];
}

const InventoryContainer = ({ inventory }: Props) => {
  if (!inventory.length) return <p>Player has no items..</p>;
  const Rows = inventory.map((item) => {
    return (
      <tr>
        <td>{item.name}</td>
        <td>{item.amount}</td>
        <td>{item.price}</td>
        <td>{Math.round(item.cps * 100) / 100}</td>
      </tr>
    );
  });

  const itemSum = inventory.reduce((acc, item) => acc + item.amount, 0);
  const priceSum = inventory.reduce((acc, item) => acc + item.price, 0);
  const cpsSum =
    Math.round(inventory.reduce((acc, item) => acc + item.cps, 0) * 100) / 100;

  return (
    <table className="generic-table table-auto border-collapse">
      <thead>
        <tr>
          <td>Item</td>
          <td>Amount</td>
          <td>Price</td>
          <td>CPS</td>
        </tr>
      </thead>
      <tbody>{Rows}</tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>{itemSum}</td>
          <td>{priceSum}</td>
          <td>{cpsSum}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default InventoryContainer;
