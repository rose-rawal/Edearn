import React, { useContext } from "react";
import { packages } from "./component/PackageArr.js";
import context from "../context/mainContext.js";
import Layout from "./Layout/layout.js";

import done from "../assests/done.png";
import SubscriptionCard from "./component/subsCard.js";
import DarkHome from "./homeTheme/DarkHome.js";

const Payment = () => {
  const { paymentDo } = useContext(context);
  const handleSubscription = (e, pack) => {
    e.preventDefault();
    paymentDo(pack);
  };
  return (
    <Layout>
      <div className="relative h-screen overflow-hidden">
        <DarkHome />
        <div>
          <div className="flex items-center justify-center mt-7 text-white text-7xl">
            PURCHASE
          </div>
          <div className="flex justify-evenly h-full m-10">
            {packages.map((n) => {
              return (
                // <div
                //   key={n.name}
                //   onClick={(e) => handleSubscription(e, n)}
                //   className="bg-slate-300 px-10 py-20"
                // >
                //   <h2>{n.name}</h2>
                //   <p>{n.price}</p>
                //   <p>{n.Currency}</p>
                // </div>
                <div onClick={(e) => handleSubscription(e, n)}>
                  <SubscriptionCard
                    key={n.name}
                    name={n.name}
                    price={n.price}
                    currency={n.Currency}
                    desc={n.desc}
                    color={n.color}
                    image={n.image}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
