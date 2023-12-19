'use client'
import React, { useState, useEffect } from 'react'

import chectMeta from './chectMeta'
import interactAllItems from './interactAllItems';
import ItemCard from './ItemCard';
import { useRouter } from 'next/navigation';

export default function itemGallery() {
    const { isConnected, isConnectedRef, shownText, account, checkConnection } = chectMeta();
    const { items, loading } = interactAllItems();
    const [ search, setSearch ] = useState('');
    const [ type, setType ] = useState('All');
    const [ soldState, setSoldState ] = useState('All');
    const router = useRouter();

    const types = ['All', ...new Set(items.map(item => item.type))];

    const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        (type === 'All' || item.type === type) &&
        (soldState === 'All' || (soldState === 'Sold' ? item.isSold : !item.isSold))
    );

  return (
    <>
        {!loading ? 
            <div className='container mx-auto w-100 text-center'>
                <select onChange={e => setType(e.target.value)} className="w-1/6 h-16 px-2 mx-2 rounded border-4 border-slate-700 justify-self-center text-2xl">
                    {types.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>
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
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full'
                    onClick={() => {router.push('/buyer')}}
                >Buyer Dashboard</button>
                <div className='grid grid-cols-3 my-3'>
                    {filteredItems.map((item, index) => (
                        <ItemCard item={item} index={index} />
                    ))}
                </div>
            </div>
            :
            <div className='text-center'>
                <h2 className='text-primary'>Loading...</h2>
                <p>Hopefully not for too long :)</p>
            </div>
        }
    </>
  )
}
