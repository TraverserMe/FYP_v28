import React from 'react'
import interactItem from './interactItem';

export default function itemList({ item, index }) {
    const { buyitem, confirmDelivery, confirmReceipt } = interactItem();
    // console.log(item);
  return (
    <>
        <div className='grid grid-cols-8 gap-4 py-4 border-solid border-2 hover:border-y-cyan-200'>
            <div className='col-span-1'>{item.id}</div>
            <div className='col-span-2'>{item.name}</div>
            <div className='col-span-1'>{item.price}</div>
            <div className='col-span-2'>{item.isSold ? "Sold": "OnSale" }</div>
            <div className='col-span-2'>
                {item.currentState == 0 && item.isSold && <>Wating Payment</>}
                {item.currentState == 1 && <>
                  <button 
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                    onClick={async()=> await confirmDelivery(item.address)}>
                      Confirm delivery
                  </button>
                  </>}
                {item.currentState == 2 && <>Wating received confirm</>}
                {item.currentState == 3 && <>Complete</>}
            </div>
        </div>
    </>
  )
}
