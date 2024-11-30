import { Suspense } from "react";
import Checkout from "./checkout";

const CheckoutPage: React.FC = () => {
  return (
    <div>
      <Suspense>
        <Checkout />
      </Suspense>
    </div>
  );
};

export default CheckoutPage;
