"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import styles from "@/styles/Home.module.css";
import { Bean } from "@web3uikit/icons";

import { moonPayImg, searchImg } from "../../public";
import SearchResults from "./search-result";

export default function Search() {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = async () => {
    const inputField = document.querySelector(
      "#inputField"
    ) as HTMLInputElement | null;
    if (inputField) {
      inputField.value = "";
    }

    const response = await axios.get("http://localhost:5001/address", {
      params: { address: searchInput },
    });

    console.log("response:", response);

    setResult(response.data.result);
    setShowResult(true);
  };

  return (
    <section className={styles.searchContainer}>
      <section className={`${styles.searchHeader} px-10`}>
        <section className={styles.searchSection}>
          <h3>The Ethereum Blockchain Explorer</h3>
          <section className={styles.input_section}>
            <input
              className={styles.inputField}
              type="text"
              id="inputField"
              name="inputField"
              maxLength={120}
              placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
              required
              onChange={changeHandler}
            />
            <button className={`${styles.btn}`} onClick={handleSearch}>
              <Image src={searchImg} alt="img" />
            </button>
          </section>
          <section className={styles.sponsored}>
            Sponsored:{" "}
            <span className={styles.bean}>
              <Bean fontSize="20px" />
            </span>{" "}
            <span className="font-semibold mx-2">MetaWin: </span>
            Exclusive Winback, 30 ETH Instant Withdrawals, Max Payout!
            <div className="flex flex-col">
              <span className={styles.claim}>Play Now!</span>
            </div>
          </section>
        </section>
        <section className={styles.adSection}>
          <Image src={moonPayImg} alt="img" className="w-full rounded-lg" />
        </section>
      </section>
      {showResult && <SearchResults result={{ result, searchInput }} />}
    </section>
  );
}
