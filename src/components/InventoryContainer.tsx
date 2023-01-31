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

  const itemCount = inventory.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);
  const priceCount = inventory.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
  const cpsCount = inventory.reduce((acc, item) => {
    return acc + item.cps;
  }, 0);

  return (
    <table style={{ border: "2px solid grey", width: "100%" }}>
      <thead>
        <tr>
          <td>Item</td>
          <td>Amount</td>
          <td>Price</td>
          <td>CPS</td>
        </tr>
      </thead>
      {Rows}
      <tfoot>
        <tr>
          <td>Total</td>
          <td>{itemCount}</td>
          <td>{priceCount}</td>
          <td>{cpsCount}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default InventoryContainer;
