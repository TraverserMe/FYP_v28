'use client'
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react'

export default function ItemCard({ item, index }) {
  return (
    <>
    <div key={index} className="max-w-md mx-auto my-2 bg-white rounded-xl shadow-md overflow-hidden lg:max-w-8xl">
        <Link href={`/item/${index}`}>
          <div className="lg:flex lg:w-full w-75 ">
              <div className="lg:shrink-0">
                  <Image
                    src={`https://ipfs.io/ipfs/${item.image}`}
                    alt={item.name}
                    width={100}
                    height={100}
                    priority={true}
                    className="h-40 w-100 object-cover lg:h-full lg:w-full"
                  />
              {/* <img className="h-48 w-full object-cover md:h-full md:w-48" src="../public/images/dao.png" alt="Modern building architecture"> */}
              </div>
              <div className="py-4 mx-2">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{item.name}</div>
                <span className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">ETH {item.price}</span>
                <span className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{item.isSold ? "Sold": "OnSale" }</span>
                <p className="mt-2 text-slate-500">{item.type}</p>
              </div>
          </div>
        </Link>
    </div>
    </>
  )
}
