import './signIn.scss'
import Google from '../images/Google.png'
import Linkedin from '../images/Linkedin.png'
import GitHub from '../images/GitHub.png'
import background from '../images/rain.jpg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function Sign_in(){
    const navigate = useNavigate()

    function fetchData(e){
        const form = e.target
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries())
        axios.post('http://localhost:4000/sign-in',formJson)
        .then(res => {
            if(res.data.role == "Admin"){
                navigate("/Admin")
            }else if(res.data.role == "User"){
                navigate('/User')
            }
            console.log(res.data)
        })
    }



    return(
        <div className="main-div">
            <div className="image-div">
                <img src={background} alt="" />
            </div>
            <div className="form-div">
                <h2>sign in</h2>
                <form action="" method='dialog' onSubmit={fetchData} className="sign-in-form">
                    <label htmlFor="username">username :</label><br />
                    <input type="text" name="username" id="username" className='form-control' /><br />
                    <label htmlFor="password">password : </label><br />
                    <input type="text" name="password" id="password" className='form-control' /><br />

                    <input type="submit" value="sign in" className='btn btn-primary' />
                </form>
                <p className='haveAccount text-capitalize'>i do not have an <strong><Link to='/register'>account</Link></strong> </p>
                <div className='other-div'>
                    <hr />
                    <p className='or'>or</p>
                    <button><img src={Google} alt="" /></button>
                    <button><img src={GitHub} alt="" /></button>
                    <button><img src={Linkedin} alt="" /></button>
                </div>
            </div>
        </div>
    )
}
