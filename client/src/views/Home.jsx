import { Link, Outlet } from 'react-router-dom';

import './Home.scss'
import axios from 'axios'
import React, { useState, useEffect, useMemo, lazy,Suspense } from 'react';

function Home() {
    const [data, setData] = useState([])
    let moreImage = true
    useEffect(() => {
        axios.get('http://localhost:4000/')
            .then(res => {
                setData(res.data)
            })
        document.querySelector('.pagination').style.visibility = "visible"
        document.querySelector('.status').classList.toggle('d-none')

    }, [])

    function next_images() {
        const imagesLenght = data.length
        axios.post('http://localhost:4000/more-images', { "imagesLenght": imagesLenght })
            .then(res => {
                if (res.data != 404) {
                    setData((prevItems) => [
                        ...prevItems,
                        ...res.data
                    ]);
                } else {
                    document.querySelector('.pagination').style.visibility = "hidden"
                    // document.querySelector('.status').classList.toggle('d-none')
                    moreImage = false
                }
            })
        console.log(data);
    }

    function search(e) {
        const form = e.target
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries());
        axios.post('http://localhost:4000/search', formJson)
            .then(res => {
                if (res.data) {
                    setData(prevItems => [
                        ...res.data
                    ])
                    console.log(res.data)
                }
            })
    }

    return (
        <div className="App" onLoad={console.log("loaded")}>
            <header className='main-header'>
                <div className="logo-div">
                    <h3 className='p-0 m-0'><span>i</span>magesWorld</h3>
                </div>
                <ul className='p-0 m-0'>
                    <li>categoryes</li>
                    <li>all images</li>
                    <li className='register'><Link to='/register'>register</Link></li>
                    <li className='sign-in'><Link to='/sign-in'>sign in</Link></li>
                </ul>
            </header>

            <section className='images-main-section '>
                <section className='intro'>
                    <div>
                        <h1>start your with nice view</h1>
                        <p>
                            with more than 1000+ photo
                        </p>
                    </div>
                </section>
                <header className='filter'>
                    <form action="" method="dialog" onSubmit={search}>
                        <input type="submit" placeholder='search' className='btn btn-primary' />
                        <input type="search" name="searchWord" className='form-control' id="" />
                    </form>
                </header>
                <section className='images-section h-100'>
                    <Suspense fallback={() => <h2>loading...</h2>}>
                        {data.map(data => (
                            <a href='#' className='link-img' key={data._id}>
                                <img src={new URL(`../images/uploaded_images/${data.file_name}`, import.meta.url).href}  alt="" />
                                <div className='download-img-div'>
                                    <Link href={new URL(`../images/uploaded_images/${data.file_name}`, import.meta.url).href} className='btn btn-primary' target='_blank' download>
                                        Donwload
                                    </Link>
                                </div>
                            </a>
                        ))}
                    </Suspense>
                </section>
                <footer className='images-footer'>
                    <nav aria-label="Page navigation example ">
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                            <li className="page-item" ><a className="page-link" onClick={next_images}>Next</a></li>
                        </ul>
                        {moreImage ? (<p className='status text-center text-transform-capitalize'>no more pictures</p>):(<p className='status text-center d-none text-transform-capitalize'></p>)}
                    </nav>
                </footer>
            </section>
            <footer className='main-footer'>
                <ul>
                    <li>about the author</li>
                    <li>connect with the author</li>
                    <li>support this website</li>
                    <li>support team</li>
                </ul>
                <p className='text-center'>all copyright for <a href='https://bilal-sweidan.github.io/Bilalsweidan/' target='_blank'>bilal sweidan</a> 2024</p>
            </footer>
        </div>
    );
}

export default React.memo(Home);
