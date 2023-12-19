"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import interactAllItems from '../components/interactAllItems';
import chectMeta from "../components/chectMeta";
import ItemListB from '../components/itemListB';

export default function BuyerDashboard() {
    const router = useRouter();
    const {isConnected, isConnectedRef, shownText, account, checkConnection } = chectMeta();  

    const { items, loading } = interactAllItems();
    const [ search, setSearch ] = useState('');
    const [ type, setType ] = useState('All');

    const types = ['All', ...new Set(items.map(item => item.type))];

    const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        (type === 'All' || item.type === type) && item.buyer.toLowerCase() === account 
    );

    return (
        <>
            {!isConnectedRef.current && <h1 className='text-xl'>Welcome, connect Metamask to buy or or sell item (Dashboard too)</h1>}
            {isConnectedRef.current && 
            <>
                {items && !loading ? 
                    <div className='container mx-auto w-100 text-center'>
                        <h2>Buyer History</h2>
                        <select onChange={e => setType(e.target.value)} className="w-1/6 h-16 px-2 mx-2 rounded border-4 border-slate-700 justify-self-center text-2xl">
                            {types.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                        <input 
                            type="text" 
                            name="search" 
                            id="searchbar" 
                            className="w-1/3 h-16 px-2 mx-2 rounded border-4 border-slate-700 justify-self-center text-2xl"
                            onChange={e => setSearch(e.target.value)}
                        />
                        <button 
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full'
                            onClick={() => {router.push('/')}}
                        >Home</button>
                        
                        <div className='grid grid-cols-8 gap-4'>
                            <div className='col-span-1'>Item id</div>
                            <div className='col-span-2'>Item name</div>
                            <div className='col-span-1'>Item price</div>
                            <div className='col-span-2'>Item about</div>
                            <div className='col-span-2'>Action</div>
                        </div>
                        {filteredItems.map((item, index) => (
                            <ItemListB item={item} index={index} />
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
    