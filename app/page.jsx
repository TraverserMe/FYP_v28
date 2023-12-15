"use client"
import chectMeta from "./components/chectMeta";
import ItemGallery from "./components/itemGallery";

export default function Page() {
  const {isConnected, isConnectedRef, shownText, account, checkConnection } = chectMeta();  
  return (
    <>

      <main className="w-sreen relative grid justify-items-center">
        <div  className="w-4/5">
          {!isConnectedRef.current && <h1 className='text-xl'>Welcome, connect Metamask to buy or or sell item (Dashboard too)</h1>}
          {isConnectedRef.current && 
            <>
              <h1 className='text-xl'>Welcome, enjoy!</h1>
              <ItemGallery/>
            </>
          }
        </div>
      </main>
    
    </>
    
  )
}
