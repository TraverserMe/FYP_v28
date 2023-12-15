"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import interactAllItems from '../components/interactAllItems';
import chectMeta from "../components/chectMeta";
import ItemList from '../components/itemList';

export default function BuyerDashboard() {
    const router = useRouter();
    const {isConnected, isConnectedRef, shownText, account, checkConnection } = chectMeta();  

    const { items, loading } = interactAllItems();
    const [ search, setSearch ] = useState('');
    const [ soldState, setSoldState ] = useState('All');

    const types = ['All', ...new Set(items.map(item => item.id))];
    
    const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        (soldState === 'All' || (soldState === 'Sold' ? item.isSold : !item.isSold)) && item.seller.toLowerCase() === account 
    );

    return (
        <>
            {!isConnectedRef.current && <h1 className='text-xl'>Welcome, connect Metamask to buy or or sell item (Dashboard too)</h1>}
            {isConnectedRef.current && 
            <>
                {items && !loading ? 
                    <div className='container mx-auto w-100 text-center'>
                        <h2>Seller Dashboard</h2>
                        <select className="w-1/6 h-16 px-2 mx-2 rounded border-4 border-slate-700 justify-self-center text-2xl" onChange={e => setSoldState(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Sold">Sold</option>
                            <option value="OnSale">On Sale</option>
                        </select>
                        <input 
                            type="text" 
                            name="search" 
                            id="searchbar" 
                            className="w-1/3 h-16 px-2 mx-2 rounded border-4 border-slate-700 justify-self-center text-2xl"
                            onChange={e => setSearch(e.target.value)}
                        />
                        <button 
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full right-10'
                            onClick={() => {router.push('/')}}
                        >Home</button>
                        
                        <div className='grid grid-cols-8 gap-4'>
                            <div className='col-span-1'>Item id</div>
                            <div className='col-span-2'>Item name</div>
                            <div className='col-span-1'>Item price</div>
                            <div className='col-span-2'>Item state</div>
                            <div className='col-span-2'>Action</div>
                        </div>
                        {filteredItems.map((item, index) => (
                            <ItemList item={item} index={index} />
                        ))}
    
                        
                    </div>
                    :
                    <div className='text-center'>
                        <h2 className='text-primary'>Loading...</h2>
                        <p>Hopefully not for too long :)</p>
                    </div>
                }
            </>}
        </>
      )
    }
    