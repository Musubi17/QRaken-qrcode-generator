import { useState } from 'react';
import Image from 'next/image';

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
      setLoading(true);
      setImageUrl("");
      getImageData().then();
  };
  

  const renderResponse = () => {
      return (
        <div className="response">
          {loading && <div className="loading-spinner"></div>}
          {imageUrl && <Image src={imageUrl} className="image-box" alt="Generated image" width="480" height="480" />}
        </div>
      )
  }

  return (
    // <div className="Main">
      <>{renderResponse()}
      <form onSubmit={onSubmit} className="mainForm">
        {/* <div className="small-containers-group"> */}
          <input name="input-field" placeholder="Put your url here" onChange={(e) => setUrl(e.target.value)}  value={url_input} />
    
    
          <input name="input-field" placeholder="Put your prompt here" onChange={(e) => setPrompt(e.target.value)}  value={prompt_input} />
    
    
          <button type="submit" className="secondaryButton" disabled={loading} onClick={() => setSubmitType('image')}>
          ⚡GENERATE⚡
          </button>
        {/* </div> */}
      </form></>  
    // </div>
   );
} 

export default Chat;









