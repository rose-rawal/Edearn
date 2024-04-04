/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";

import DarkHome from "./homeTheme/DarkHome";

import Layout from "./Layout/layout";

const Home = () => {
  return (
    <Layout>
      <div className="relative h-screen overflow-hidden">
        <DarkHome />
        <div>
          {
            <div class="h-screen flex justify-center">
              <div class=" pt-80 mt-4 rounded shadow-md">
                <p className="text-9xl font-mono">
                  LEARNING WITH <p className="text-blue-900">FUN</p>
                </p>
              </div>
            </div>
          }
        </div>
      </div>
    </Layout>
  );
};

export default Home;
