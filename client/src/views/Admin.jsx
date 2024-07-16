import './Admin.scss'
import { Link,Outlet } from 'react-router-dom'
export default function Admin() {

    return (
        <div className="main-div">
            <header className="main-header text-bg-dark">
                <div className="header-title">
                    <h3>Admin</h3>
                </div>
                <div>
                    <ul className="m-0">
                        <li><Link to='/Admin/add-images'>add images</Link></li>
                        <li><Link to='/Admin/setting'>account setting</Link></li>
                    </ul>
                </div>
            </header>
            <section className='display-section'>
                <Outlet/>
            </section>
        </div>
    )
}