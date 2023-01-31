import { InventoryItem } from "../types";

interface Props {
  inventory: InventoryItem[];
}

const InventoryContainer = ({ inventory }: Props) => {
  const Rows = inventory.map((item) => {
    return (
      <tr>
        <td>{item.name}</td>
        <td>{item.amount}</td>
        <td>{item.price}</td>
        <td>{item.cps}</td>
      </tr>
    );
  });

  const itemSum = inventory.reduce((acc, item) => acc + item.amount, 0);
  const priceSum = inventory.reduce((acc, item) => acc + item.price, 0);
  const cpsSum = inventory.reduce((acc, item) => acc + item.cps, 0);

  return (
    <table className="inventory-table">
      <thead>
        <tr>
          <td>Item</td>
          <td>Amount</td>
          <td>Price</td>
          <td>CPS</td>
        </tr>
      </thead>
      <tbody>
      {Rows}
      </tbody>
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
