'use client';

import Image from 'next/image';
import Chat from './components/Chat';

export default function Home() {
  return (
    <main className="App">
      <div className='container'>
        <div className='logoBox'>
          {/* <Image src="/logo.png" alt="SuperViral.ai logo" width="100" height="100" /> */}
          {/* <Image src="/logo.png" alt="SuperViral.ai logo" width="100" height="100" /> */}
          <h1 className="text-3xl font-bold mb-10">QRaken<Image src="/logo.png" alt="SuperViral.ai logo" width="110" height="110" /></h1> 
          <p>This isn&apos;t just a QR code. it&apos;s your digital signature. Elevate it. Make it iconic.</p>
        </div>
        <Chat />
      </div>
    </main>
  )
}
