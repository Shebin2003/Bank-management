import React from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';

const Services = () => {
    const navigate = useNavigate();
    const submit1 = async()=>{
        navigate('/deposit')
    }
    const submit2 = async()=>{
        navigate('/withdraw')
    }
    const submit3 = async()=>{
        navigate('/transfer')
    }
  return (
    <div>
        <section class="services">
    <h1>Choose your option</h1>
     <div class="row">
        <div class="services-col">
            <h3>Deposit</h3>
            <p>Deposit money into your account</p><br/>
            <Button  variant="outline-success" size='lg' className="hero-btn" onClick={submit1} >Get Started</Button>
        </div>
        <div class="services-col">
            <h3>Withdraw</h3>
            <p>Withdraw money from your account</p><br/>
            <Button  variant="outline-success" size='lg' className="hero-btn" onClick={submit2} >Get Started</Button>
        </div>
        <div class="services-col">
            <h3>Transfer</h3>
            <p>Transfer money to other account</p><br/>
            <Button  variant="outline-success" size='lg' className="hero-btn" onClick={submit3} >Get Started</Button>
        </div>
        <br/>
     </div>
</section>
    </div>
  )
}

export default Services
