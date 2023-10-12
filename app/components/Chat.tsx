import { useState } from 'react';
// import { useChat } from 'ai/react';
import Image from 'next/image';
// import { url } from 'inspector';

const Chat = () => {
  const [submitType, setSubmitType] = useState<'text'|'image'>("text");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [prompt_input, setPrompt] = useState('');
  const [url_input, setUrl] = useState('');

  
  const getImageData = async () => {
    try {
      const response = await fetch('/api/replicate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: prompt_input, url: url_input })
      });

      const { imageUrl } = await response.json();
      setImageUrl(imageUrl);
      setError("");
    } catch (e) {
      setError(`An error occurred calling the API: ${e}`);
    }
    setLoading(false);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  //   if (submitType === 'text') {
  //     handleSubmit(event);
  //   } else {
      setLoading(true);
      setImageUrl("");
      getImageData().then();
  //   }
  };
  

  // const userColors = {
  //   user: '#00c0ff',
  //   assistant: '#e02aff',
  //   function: '#fff',
  //   system: '#fff',
  // }

  const renderResponse = () => {
    // if (submitType === 'text') {
    //   return (
    //     <div className="response">
    //       {messages.length > 0
    //       ? messages.map(m => (
    //           <div key={m.id} className="chat-line">
    //             <span style={{color: userColors[m.role]}}>{m.role === 'user' ? 'User: ' : '⚡️Last Codebender: '}</span>
    //             {m.content}
    //           </div>
    //         ))
    //       : error}
    //     </div>
    //   );
    // } else {
      return (
        <div className="response">
          {loading && <div className="loading-spinner"></div>}
          {imageUrl && <Image src={imageUrl} className="image-box" alt="Generated image" width="640" height="640" />}
        </div>
      )
      // }
  }

  return (
    <div className="flex justify-center items-center flex-col w-full lg:p-0 p-4 sm:mb-28 mb-0">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-10">
        <div className="col-span-1">
    <>{renderResponse()}
      <form onSubmit={onSubmit} className="mainForm">
        <input name="input-field" placeholder="Put your url here" onChange={(e) => setUrl(e.target.value)}  value={url_input} />
        <input name="input-field" placeholder="Put your prompt here" onChange={(e) => setPrompt(e.target.value)}  value={prompt_input} />
        <button type="submit" className="secondaryButton" disabled={loading} onClick={() => setSubmitType('image')}>
          IMAGE
        </button>
      </form></>
        </div>
      </div>
    </div>
  );
}

export default Chat;