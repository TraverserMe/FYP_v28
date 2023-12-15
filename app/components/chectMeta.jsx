"use client"
import { useState, useEffect, useRef } from 'react'

const ethers = require("ethers");

export default function chectMeta() {
    const [isConnected, setIsConected] = useState(false)
    const [shownText, setShownText] = useState('Connect')
    const [account, setAccount] = useState('')
    const isConnectedRef = useRef(isConnected)
    const [gasfee, setGasfee] = useState("?")
    const gasfeeRef = useRef(gasfee)

    async function checkConnection() {
        if (typeof window.ethereum !== 'undefined') {
            setShownText("Connecting...")
            try{
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                if(!accounts.length){
                    setIsConected(false);
                    setShownText("Not Connected");
                    isConnectedRef.current = false
                }else{
                    setIsConected(true);
                    setAccount(accounts[0]);
                    setShownText("Connected");
                    isConnectedRef.current = true
                }
            }catch(err){
                if(err.code == 4001){
                    setIsConected(false);
                    setShownText("Not Connected");
                }
            }
        }else{
            setShownText("Please install the MetaMask extension")
        }
    }
    
    async function checkConnection2() {
        if (typeof window.ethereum !== 'undefined') {
            try{
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const accounts = await window.ethereum.request({ method: "eth_accounts" });
                const gasPrice = await provider.getGasPrice()
                if(!accounts.length){
                    if(isConnectedRef.current){
                        setShownText("Not Connected");
                        setIsConected(false);
                        isConnectedRef.current = false
                    }
                }else{
                    setShownText("Connected");
                    setIsConected(true);
                    isConnectedRef.current = true
                    setGasfee(ethers.utils.formatUnits(gasPrice, "ether"))
                    gasfeeRef.current = ethers.utils.formatUnits(gasPrice, "ether")
                    // console.log(gasfeeRef.current)
                }
            }catch(err){
                // if(err.code === 4001){
                //     setShownText("Not Connected");
                //     setConection(false);
                // }
            }
        }else{
            setShownText("Please install the MetaMask extension")
        }
    }
    
    useEffect(() => {
        checkConnection()
        const intervalId = setInterval(() => {
            checkConnection2()
        }, 5000)
        return () => clearInterval(intervalId)
    }, [])

    return {
        isConnected,
        isConnectedRef,
        shownText,
        account,
        gasfee,
        gasfeeRef,
        checkConnection
    }
}
