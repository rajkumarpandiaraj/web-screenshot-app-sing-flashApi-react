import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const handleSubmit = (e) =>{
    e.preventDefault();
    setUrl('');
    setImg('');
    setErr('');
    setLoading(true)
    axios.get(`https://api.apiflash.com/v1/urltoimage?access_key=6ed355c3c886479fb4d20bd8de27ede2&url=${url}&fresh=true&full_page=true`)
    .then(res => {
      setLoading(false);
      setImg(res.config.url)
    })
    .catch(error => {
      setLoading(false);
      setErr(true)
    })

  }
  return (
    <div className="App">
      <div className='nav-container'>
        <div className='nav'>
            <form onSubmit={handleSubmit}>
              <input type='text' className='url' value={url} onChange={(e) => setUrl(e.target.value)} />
              <button className='btn' type='submit'>Take ScreenShot</button>
            </form>
        </div>
      </div>
      <div className='container'>
        {
          img && <img src={img} alt='Screenshot'/>
        }
        {
          err && <p>Please Enter thr valid Url or check your internet</p>
        }
        {
          loading && <p>loading....</p>
        }
      </div>
    </div>
  );
}

export default App;
