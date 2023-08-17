import React from 'react'
import { useState, useEffect } from 'react';
import { linkIcon, loader, tick, copy,thrash } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article';
const Content = () => {
    const [article, setArticle] = useState({
        url: "",
        summary: "",
    })
    const [allArticles, setAllArticles] = useState([]);
    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
    const [copied, setCopied] = useState("")
    useEffect(() => {
        const articleFromLocalStorage = JSON.parse(
            localStorage.getItem('article')
        )
        if (articleFromLocalStorage) {
            setAllArticles(articleFromLocalStorage);
        }
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await getSummary({ articleUrl: article.url });
        if (data?.summary) {
            const newArticle = { ...article, summary: data.summary };
            const updatedAllArticles = [newArticle, ...allArticles];

            setArticle(newArticle);
            setAllArticles(updatedAllArticles);
            localStorage.setItem('article', JSON.stringify(updatedAllArticles))
            console.log(newArticle)
        }
    }
    const handleCopy = (copyUrl) => {
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => setCopied(''), 3000);
        window.alert("Link Copied");
      };
    const handleDelete = (index) => {
        const confirmation = window.confirm('Are you sure you want to delete this link?');
        if (confirmation) {
          const updatedArticles = [...allArticles];
          updatedArticles.splice(index, 1);
          setAllArticles(updatedArticles);
          localStorage.setItem('article', JSON.stringify(updatedArticles));
        }
      };
    return (
        <section className='mt-16 w-full max-w-2xl'>
            <div className='flex flex-col w-full gap-2'>
                <form className='relative flex justify-center items-center' onSubmit={handleSubmit}>
                    <img src={linkIcon} alt='linkIcon' className='absolute left-0 my-2 ml-3 w-5' />
                    <input type='url' placeholder='Enter URL' value={article.url} onChange={(e) => setArticle({ ...article, url: e.target.value })} required className='url_input peer' />
                    <button type='submit' className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>
                        ⏩
                    </button>
                </form>
                {/* Broswer Local History */}
                <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
                    {allArticles.map((item, index) => (
                        <div key={`link-${index}`} onClick={() => setArticle(item)} className='link_card'>
                            <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                                <img src={copied === item.url ? tick : copy} alt='copy-icon' className='w-[40%] h-[40%] object-contain' />
                            </div>
                            <div className='delete_btn' onClick={() => handleDelete(index)}>
                                <img src={thrash} alt='delete-icon' className='w-[40%] h-[40%] object-contain' />
                            </div>
                            <p className='flex-1 font-satoshi text-blue-800 font-medium text-sm'>
                                {item.url}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Results section */}
            <div className='my-10 max-w-full flex justify-center items-center'>
                {isFetching ? (<img src={loader} alt='loader' className='w-20 h-20 object-contain' />) : error ? (<p className='text-center'>
                    Something bad occured... or api Quota exceeded
                </p>
                ) : (
                    article.summary && (
                        <div className='flex flex-col gap-3'>
                            <h2 className='font-bold font-satoshi'>
                                Article Summary
                            </h2>
                            <div className='summary_box'>
                                <p className='text-sm'>{article.summary}</p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </section>
    )
}

export default Content