import { useNavigate } from 'react-router-dom';
import './Header.css'

const Header = () => {
  const navigate = useNavigate();
  const submit = async()=>{
    localStorage.clear();
    navigate('/')
}
  return (
    <div className='heading'>
          <section class="subheader">
        <nav>
            <div class="nav-links" id="navLinks">
                <i class="fa fa-times" onclick="hideMenu()"></i>
                <ul>
                    
                    <li><a onClick={submit}>Log out</a></li>
                </ul>
            </div>
        </nav>
        <h1 className='coet-bank'>BHARATH BANK</h1>
       </section>
        </div>
  )
}

export default Header
