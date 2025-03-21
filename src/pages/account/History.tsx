import { useContext, useState, Fragment } from "react";
import { UserContext } from "../../context";
import { Error, Loader, Text } from "../../components";
import { Payment } from "../../types/Payments";
import useFetch from "../../hooks/useFetch";

const History = () => {
  const { user } = useContext(UserContext);

  const { data, error, loading } = useFetch<Payment[]>(
    `https://mature-halibut-neatly.ngrok-free.app/payments/${user?.id}`
  );

  const [paymentOpened, setPaymentOpened] = useState(-1);

  const handlePaymentOpened = (id: number) =>
    setPaymentOpened((prev) => (prev === id ? -1 : id));

  if (error) return <Error message={error} />;

  if (loading) return <Loader />;

  if (data?.length === 0)
    return (
      <Text tag="h2" className="no-data">
        No hay registro de compras realizadas
      </Text>
    );

  return (
    <table className="history">
      <thead>
        <tr>
          <th>
            <Text tag="h3">FECHA</Text>
          </th>
          <th>
            <Text tag="h3">TIPOS DE CERVEZAS</Text>
          </th>
          <th>
            <Text tag="h3">COSTO TOTAL</Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map(({ date_created, id, items, total_amount }, index) => {
          const DATE = new Date(date_created)
            .toLocaleString()
            .replace(",", " -");
          const OPENED_PAYMENT = paymentOpened === id ? "opened" : "";
          const IS_ODD = index % 2 === 0 ? "odd" : "";

          return (
            <Fragment key={id}>
              <tr
                key={id}
                className={`payment ${IS_ODD} ${OPENED_PAYMENT}`}
                onClick={() => handlePaymentOpened(id)}
              >
                <td>{DATE}</td>
                <td>{items.length}</td>
                <td>{total_amount} $</td>
              </tr>
              <tr className={`payment-item-header ${OPENED_PAYMENT}`}>
                <th>
                  <Text tag="h4">IMAGEN</Text>
                </th>
                <th>
                  <Text tag="h4">NOMBRE</Text>
                </th>
                <th>
                  <Text tag="h4">CANTIDAD X PRECIO</Text>
                </th>
              </tr>
              {items.map(({ id, image, quantity, name, price }, index) => (
                <tr
                  key={id}
                  className={`payment-item ${OPENED_PAYMENT}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <td>
                    <img src={image} />
                  </td>
                  <td>
                    <Text>{name}</Text>
                  </td>
                  <td>
                    <Text>
                      {quantity} x {price}
                    </Text>
                  </td>
                </tr>
              ))}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default History;
