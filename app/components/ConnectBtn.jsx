'use client'
import React from 'react'
import chectMeta from './chectMeta'

export default function ConnectBtn() {
  const {isConnected, isConnectedRef, shownText, account, checkConnection } = chectMeta();
  return (
    <>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => checkConnection()}
        >
          {shownText} 
        </button>
    </>
  )
}

