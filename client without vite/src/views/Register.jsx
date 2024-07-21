import './signIn.scss'
import './Register.scss'
import Google from '../images/Google.png'
import Linkedin from '../images/Linkedin.png'
import GitHub from '../images/GitHub.png'
import background from '../images/green.jpg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Register(){
    const navigate = useNavigate()
    function fetchData(e){
        const form = e.target
        const formData = new FormData(form)
        formData.append('role','user')
        const formJson = Object.fromEntries(formData.entries())
        axios.post('http://localhost:4000/register',formJson)
        .then(res => {
            console.log(res.data)
            if(res.data){
                if(res.data == "OK"){
                    document.querySelector('.alert-success').classList.toggle('d-none')
                    setTimeout(() => {
                        document.querySelector('.alert').classList.toggle('d-none')
                    }, 1000);
                    setTimeout(() => {
                        navigate('/sign-in')
                    }, 1200);
                }else{
                    document.querySelector('.alert-danger').classList.toggle('d-none')
                }
                
            }else{
                console.log('error')
            }
        })
    }
    return(
        <div className="main-div">
            <div className="alert alert-success position-absolute w-50 text-center d-none">
                <strong>Success!</strong> Indicates a successful or positive action.
            </div>
            <div className="alert alert-danger position-absolute w-50 text-center d-none text-capitalize">
                this account is already exist !!<strong> try another way </strong>
            </div>
            <div className="image-div">
                <img src={background} alt="" />
            </div>
            <div className="form-div">
                <h2>register</h2>
                <form action="" method='dialog' className="sign-in-form" onSubmit={fetchData}>
                    <label htmlFor="username">username :</label><br />
                    <input type="text" name="username" id="username" className='form-control' /><br />
                    <label htmlFor="password">password : </label><br />
                    <input type="text" name="password" id="password" className='form-control' /><br />

                    <input type="submit" value="Register" className='btn btn-primary' />
                </form>
                <p className='haveAccount text-capitalize'>i have <strong><Link to='/sign-in'>account</Link></strong></p>
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
