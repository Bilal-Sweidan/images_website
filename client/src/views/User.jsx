import imagesArray from '../functions/ImportImages';
import { Link, Outlet } from 'react-router-dom';

import './Home.scss'
import axios from 'axios'
import { useState, useEffect } from 'react';

function Home() {
    const [data, setData] = useState([])
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
                    document.querySelector('.status').classList.toggle('d-none')
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
        <div className="App" >
            <header className='main-header'>
                <div className="logo-div">
                    <h3 className='p-0 m-0'><span>i</span>magesWorld</h3>
                </div>
                <ul className='p-0 m-0'>
                    <li>categoryes</li>
                    <li>all images</li>
                    <li className='register'><Link to='/User/upload-image'>upload image</Link></li>
                    <li className='sign-in'><Link to='/sign-in'>log out</Link></li>
                </ul>
            </header>
            <Outlet/>
        </div>
    );
}

export default Home;
