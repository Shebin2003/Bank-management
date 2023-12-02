import React from 'react'
import './Home.css'
import '../../assets/images/bank6.jpg'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import  bank3 from '../../assets/images/bank3.jpg' 
import  bank6 from '../../assets/images/bank6.jpg' 

const Home = () => {
  const navigate = useNavigate();
const submit = async()=>{
    navigate('/login')
}
  return (
    <div>
        <section className="header">
        <div className="text-box" >
            <h1>BHARATH BANK</h1>
            <h3>Empowering Your Financial Journey</h3><br/>
        <Button variant="outline-success" size='lg' className="hero-btn" onClick={submit} >Get Started</Button>
        </div>
       </section>

<section class="about-us">
    <div class="row">
    <div class="about-col">
            <img src={bank3}/>
        </div>
        <div class="about-col">
            <h1>Our History</h1>
            <p>Established in 1900, Bharath bank has a rich history rooted in a commitment to integrity, reliability, and community support. Over the years, we have evolved to meet the changing needs of our customers while staying true to our core values</p>
            
        </div>
        
        
    </div>
</section>
<section class="about-us">
    <div class="row">
        <div class="about-col">
        <h1>Our Mission</h1>
            <p>Our mission is to be a beacon of financial stability, guiding our customers towards a secure and prosperous future. We strive to foster a culture of trust, transparency, and financial education, ensuring that our customers make informed decisions for their financial well-being</p>
            
        </div>
        
        <div class="about-col">
            <img src={bank6}/>
        </div>
    </div>
</section>
    </div>
  )
}

export default Home
