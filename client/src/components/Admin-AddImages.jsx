import axios from 'axios'
import { useState } from 'react'
export default function AddImages() {
    const [res, setRes] = useState()
    function fetchData(e) {
        const form = e.target
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries())
        axios.post('http://localhost:4000/add-images', formData)
            .then(res => {
                if (res.data) {
                    setRes(true);
                    document.querySelector('.alert-success').classList.toggle('d-none')
                    setTimeout(() => {
                        document.querySelector('.alert-success').classList.toggle('d-none')
                    }, 2000);
                } else {
                    setRes(false);
                    document.querySelector('.alert-danger').classList.toggle('d-none')
                    setTimeout(() => {
                        document.querySelector('.alert-dangeer').classList.toggle('d-none')
                    }, 2000);
                }
            })
    }

    return (
        <div className="container ">

            {
                res ? (<div className="alert alert-success position-absolute w-50 text-center d-none text-capitalize">
                    <strong>images successfuly uploaded</strong>
                </div>) : (<div className="alert alert-danger position-absolute w-50 text-center d-none text-capitalize">
                    <strong>upload images fail</strong>
                </div>)
            }
            <form action="" method="dialog" onSubmit={fetchData}>

                <input type="text" name='category' className='form-control' placeholder='rain,buildings,.....' />
                <div className="mb-3">
                    <label htmlFor="formFileMultiple" className="form-label">Multiple files input example</label>
                    <input className="form-control" type="file" name="images" id="formFileMultiple" multiple />
                </div>

                <input type="submit" className='btn btn-primary' value="Add" />
            </form>
        </div>
    )
}