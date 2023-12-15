'use client'
import { useState , useEffect } from 'react'
const ethers = require("ethers");

export default function FetchItem(index) {
    const [item, setItem] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchItem = async () => {
            setLoading(true);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(process.env.NEXT_PUBLIC_MAIN_CONTRACT_ID, process.env.NEXT_PUBLIC_MAIN_ABI, signer);
            if (index !== undefined && index !== null && index !== '') {
                try {
                    const itemAddress = await contract.getItemContractAddress(index);
                    const itemContract = new ethers.Contract(itemAddress, process.env.NEXT_PUBLIC_ITEM_ABI, signer);
                    const details = await itemContract.getAll();
                    setItem({
                        id: index,
                        address: itemAddress,
                        name: details[1],
                        description: details[2],
                        type: details[3],
                        image: details[4],
                        seller: details[5],
                        buyer: details[6],
                        price: ethers.utils.formatEther(details[7]),
                        isSold: details[8],
                        buyerReceived: details[9],
                        currentState: details[10]
                    });
                    setLoading(false);
                } catch(e) {
                    console.log(e);
                }
            }
        };
        fetchItem();
    }, []);

    async function buyitem(index, address, price) {
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        if (accounts.length === 0) {
            return;
        }else{
            const balance = await provider.getBalance(accounts[0]);
            if (balance < price) {
                alert("Insufficient balance");
                return;
            }
        }
        const signer = provider.getSigner();
        if (address !== undefined && address !== null && address !== '') {
            try {
                const contract = new ethers.Contract(address, process.env.NEXT_PUBLIC_ITEM_ABI, signer);
                
                const priceInWei = ethers.utils.parseEther(price);
                const ItemContractTx = await contract.paySeller({ value: priceInWei });
                const transactionHash = await ItemContractTx.wait();
                
                // // Wait for the deployment transaction to be confirmed
                // const confirmedTxReceipt = await waitForTransactionConfirmation(provider, transactionHash);
                console.log(`Completed with ${transactionHash} confirmations.`);
                // console.log(transactionHash)
                window.location.reload();
            } catch(e) {
                console.log(e);
            }
        }
    }

    async function waitForTransactionConfirmation(provider, transactionHash) {
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const maxRetries = 12; // Number of retries (each with 5 seconds delay) to wait for confirmations
        let retries = 0;
        while (retries < maxRetries) {
          try {
            const transactionReceipt = await provider.getTransactionReceipt(transactionHash);
            if (transactionReceipt && transactionReceipt.confirmations > 0) {
              return transactionReceipt;
            }
          } catch (error) {
            // Ignore error and continue retrying
          }
          await delay(5000); // Wait for 5 seconds before checking again
          retries++;
        }
        throw new Error('Transaction not confirmed within the expected time.');
    }

    async function confirmDelivery(itemAddress) {
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const account = await provider.send("eth_requestAccounts", []);
            if (account.length === 0) {
                return;
            }
            const signer = provider.getSigner();
            if (itemAddress !== undefined && itemAddress !== null && itemAddress !== '') {
                try {
                    const contract = new ethers.Contract(itemAddress, process.env.NEXT_PUBLIC_ITEM_ABI, signer);
                    const ItemContractTx = await contract.confirmDelivery();
                    const message = await ItemContractTx.wait();
                    console.log(message);
                    window.location.reload();
                } catch(e) {
                    console.log(e);
                }
            }
        }catch(e) {
            console.log(e);
        }

    }

    async function confirmReceipt(itemAddress) {
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const account = await provider.send("eth_requestAccounts", []);
            if (account.length === 0) {
                return;
            }
            const signer = provider.getSigner();
            if (itemAddress !== undefined && itemAddress !== null && itemAddress !== '') {
                try {
                    const contract = new ethers.Contract(itemAddress, process.env.NEXT_PUBLIC_ITEM_ABI, signer);
                    const ItemContractTx = await contract.confirmReceipt();
                    const message = await ItemContractTx.wait();
                    console.log(message);
                    window.location.reload();
                } catch(e) {
                    console.log(e);
                }
            }
        }catch(e) {
            console.log(e);
        }
    }

    return { item, loading, buyitem, confirmDelivery, confirmReceipt};
}
