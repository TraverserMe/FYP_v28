import React from 'react'
import interactItem from './interactItem';

export default function itemList({ item, index }) {
    const { buyitem, confirmDelivery, confirmReceipt} = interactItem();
    // console.log(item);
  return (
    <>
        <div className='grid grid-cols-8 gap-4 py-4 border-solid border-2 hover:border-y-cyan-200'>
            <div className='col-span-1'>{item.id}</div>
            <div className='col-span-2'>{item.name}</div>
            <div className='col-span-1'>{item.price}</div>
            <div className='col-span-2'>{item.description}</div>
            <div className='col-span-2'>
                {item.currentState == 1 && <>Waiting delivery</>}
                {item.currentState == 2 && <>
                  <button 
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                    onClick={async()=> await confirmReceipt(item.address)}>Confirm received</button>
                    </>}
                {item.currentState == 3 && <>Complete</>}
            </div>
        </div>
    </>
  )
}
