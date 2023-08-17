import React from 'react';
import { logo } from '../assets';

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <div className='flex items-center'>
          <img src={logo} alt='logo' className='w-28 object-contain mr-2' />
          <h2 className='font-bold text-2xl text-gray-600'>SummarEdge</h2>
        </div>
        <button
          type='button'
          onClick={() =>
            window.open("https://github.com/urz-ahmed/SummarEdge", "_blank")
          }
          className='black_btn'
        >
          GitHub
        </button>
      </nav>

      <h1 className='head_text'>
        Post the link of website and<br className='max-md:hidden' />
        <div className='green_gradient '>get summaries.</div>
        <br/>
      </h1>
      <h2 className='desc'>
        Utilise Summize, an open-source article summarizer, to make reading easier by turning large texts into simple summaries.
      </h2>
    </header>
  );
};

export default Hero;
