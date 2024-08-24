"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // {{ edit_1 }}
import { faGasPump } from "@fortawesome/free-solid-svg-icons";

import { ThemeModeToggle } from "./theme-toggle";
import { EthereumDropdownMenu } from "./network-dropdown";

import { Logo } from "../../public";
import { menuArray } from "@/constants";

import React from "react";

export default function Header() {
  const [ethPrice, setEthPrice] = useState("");

  useEffect(() => {
    const getEthPrice = async () => {
      const response = await axios.get("http://localhost:5001/getethprice", {});
      setEthPrice(response.data.usdPrice);
    };
    getEthPrice();
  });

  return (
    <div className={styles.header}>
      <section className={`${styles.topHeader} px-8`}>
        ETH Price:{"  "}
        <span className={styles.blueText}>${Number(ethPrice).toFixed(2)}</span>
        <div className="mx-3 gap-2">
          <FontAwesomeIcon icon={faGasPump} />
          <span className="mx-2">Gas:</span>
          <span className={styles.blueText}>0.97 Gwei</span>
        </div>
        <div className="flex gap-2 lg:ml-[780px]">
          <ThemeModeToggle />
          <EthereumDropdownMenu />
        </div>
      </section>
      <section className={`${styles.navbar} px-10`}>
        <Image src={Logo} alt="Etherscan Logo" className={styles.logo} />
        <section className={styles.menu}>
          {menuArray.map((item, index) => (
            <p
              key={item.id}
              className={`${index === 0 ? "text-[#0784c3e6]" : ""}`}
            >
              {item.name}
              {index !== 0 && (
                <span className={styles.arrow}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </p>
          ))}
          <p>|</p>
          <p className={`${styles.signIn} text-white`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={styles.profile}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Sign In
          </p>
        </section>
      </section>
    </div>
  );
}
