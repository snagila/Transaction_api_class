import Table from "react-bootstrap/Table";

export const TransactionTable = ({ transactions }) => {
  const total = transactions.reduce((acc, item) => {
    return item.type === "income" ? acc + item.amount : acc - item.amount;
  }, 0);
  return (
    <>
      <div>{transactions.length} Transactions found!</div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Income</th>
            <th>Expenses</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item) => (
            <tr key={item._id}>
              <td>{item.date.slice(0, 10)}</td>
              <td>{item.title}</td>
              {item.type === "income" ? (
                <>
                  <td className="text-success"> + {item.amount}</td>
                  <td></td>
                </>
              ) : (
                <>
                  <td></td>
                  <td className="text-danger">- {item.amount}</td>
                </>
              )}
            </tr>
          ))}

          <tr className="fw-bold fs-4">
            <td colSpan={3}>Total balance</td>
            <td className={total < 1 ? "text-danger" : "text-success"}>
              {total}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
