'use client';

import Image from 'next/image';
import Chat from './components/Chat';

export default function Home() {
  return (
    <main className="App">
      <div className='container'>
        <div className='logoBox'>
          {/* <Image src="/logo.png" alt="SuperViral.ai logo" width="500" height="500" /> */}
          {/* <p>Qronos-Code</p> */}
          <h1 className="text-3xl font-bold mb-10">Qronos-Code</h1>
          <p>This isn't just a QR code. it's your digital signature. Elevate it. Make it iconic.</p>
        </div>
        <Chat />
      </div>
    </main>
  )
}