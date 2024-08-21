import Moralis from "moralis"; // Import Moralis for blockchain interactions

const express = require("express"); // Import Express for creating the server
const app = express(); // Create an instance of Express
const port = 5001; // Define the port to listen on
const moralis = require("moralis").default; // Import Moralis for blockchain interactions
const cors = require("cors"); // Import CORS for enabling cross-origin resource sharing

require("dotenv").config({ path: "env" }); // Load environment variables

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// const { Request, Response } = express; // Import Request and Response types from Express

const MORALIS_API_KEY = process.env.MORALIS_API_KEY; // Get Moralis API key from environment variables

app.get("/getethprice", async (req: express.Request, res: express.Response) => {
  // Define a GET endpoint for getting Ethereum price
  try {
    const response = await Moralis.EvmApi.token.getTokenPrice({
      address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // Ethereum contract address
      chain: "0x1", // Ethereum mainnet
    });

    return res.status(200).json(response.result); // Return the response
  } catch (e) {
    console.log(`something went wrong ${e}`); // Log any errors
    return res.status(400).json(); // Return a 400 error response
  }
});

app.get(
  "/getblockinfo",
  async (req: express.Request, res: express.Response) => {
    // Define a GET endpoint for getting block information
    try {
      const latestBlock = await Moralis.EvmApi.block.getDateToBlock({
        date: Date.now(), // Current date
        chain: "0x1", // Ethereum mainnet
      });

      let blockNrOrParentHash = latestBlock.toJSON().block; // Get the block number or parent hash
      let previousBlockInfo = []; // Initialize an array to store previous block information

      for (let i = 0; i < 5; i++) {
        // Loop to fetch information for the last 5 blocks
        const previousBlockNrs = await Moralis.EvmApi.block.getBlock({
          chain: "0x1", // Ethereum mainnet
          blockNumberOrHash: blockNrOrParentHash, // Use the block number or parent hash
        });

        blockNrOrParentHash = previousBlockNrs.toJSON().parent_hash; // Update the block number or parent hash for the next iteration
        if (i == 0) {
          // For the first block, include transaction details
          previousBlockInfo.push({
            transactions: previousBlockNrs.toJSON().transactions.map((i) => {
              return {
                transactionHash: i.hash, // Transaction hash
                time: i.block_timestamp, // Transaction time
                fromAddress: i.from_address, // From address
                toAddress: i.to_address, // To address
                value: i.value, // Transaction value
              };
            }),
          });
        }
        previousBlockInfo.push({
          blockNumber: previousBlockNrs.toJSON().number, // Block number
          totalTransactions: previousBlockNrs.toJSON().transaction_count, // Total transactions
          gasUsed: previousBlockNrs.toJSON().gas_used, // Gas used
          miner: previousBlockNrs.toJSON().miner, // Miner
          time: previousBlockNrs.toJSON().timestamp, // Timestamp
        });
      }

      const response = {
        latestBlock: latestBlock.toJSON().block, // Latest block number
        previousBlockInfo, // Information about the last 5 blocks
      };

      return res.status(200).json(response); // Return the response
    } catch (e) {
      console.log(`Somthing went wrong ${e}`); // Log any errors
      return res.status(400).json(); // Return a 400 error response
    }
  }
);

app.get("/address", async (req: express.Request, res: express.Response) => {
  // Define a GET endpoint for getting address information
  try {
    const { query } = req; // Get the query parameters
    const chain = "0x1"; // Ethereum mainnet

    const response =
      await Moralis.EvmApi.transaction.getWalletTransactionsVerbose({
        address: query.address, // Address to query
        chain,
      });

    return res.status(200).json(response); // Return the response
  } catch (e) {
    console.log(`Something went wrong ${e}`); // Log any errors
    return res.status(400).json(); // Return a 400 error response
  }
});

Moralis.start({
  apiKey: MORALIS_API_KEY, // Initialize Moralis with the API key
}).then(() => {
  app.listen(port, () => {
    console.log("Listening for API calls"); // Log when the server is listening
  });
});
