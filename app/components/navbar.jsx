import Link from "next/link";
import ConnectBtn from './ConnectBtn'

export default function Navbar() {

  return (
    <div className='relative lg:flex lg:flex-wrap items-center p-2 bg-gray-500 mb-3 w-full '>
        <div className='w-1/3 p-2 lg:text-center'>
          <Link href={'/'}>          
            <h1 className='text-3xl'>D.A.O</h1>
          </Link>
        </div>
        <div className='w-1/3 p-2 lg:text-center'>
          <Link href={'/sell'}>          
            <h1 className='text-3xl'>Sell</h1>
          </Link>
        </div>
        <div className='w-1/3 p-2 lg:text-end'>
            {/* <ChectMetaBtn /> */}
            <ConnectBtn /> 
        </div>
    </div>
  )
}

