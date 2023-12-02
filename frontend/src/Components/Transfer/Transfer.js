import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Transfer.css'
import axios from "axios";

const Transfer = () => {
    const [inputs , setInputs] = useState({
        receiver_phone_no:'',
        money:''
    })
    const navigate = useNavigate();
    const handleInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({...inputs,[name] : value})
      }
    
    const handleSubmit1 = async(event)=>{
        event.preventDefault()
        const newRecord = {...inputs,"sender":localStorage.getItem('account_no')}
        if (newRecord.money==''){
            window.alert("Enter the amount to be transferred");
        }
        else{
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let currentDate = `${year}-${month}-${day}`;
            newRecord["date"] = currentDate
            try {
                const temp1 = await axios.post('http://localhost:3000/transfer',newRecord);
                const temp2 = temp1.data
                if(temp2.error=="No balance"){
                    window.alert("Account does not have sufficient balance");
                }
                else if(temp2.error =="Account does not exists"){
                    window.alert("Account does not exist");
                }
                else{
                    window.alert("Transfer successfull")
                    navigate('/services')
                }
                
              } catch (error) {
                console.log(error);
              } 
        }
    }
    const handleSubmit2 = async()=>{
        navigate('/services')}
  return (
    <div>
        <div class="container__form container--signin">
            <form  class="form" id="form2">
                <h1 class="form__title">Transfer money</h1>
                <h2 id='transfer-to'>Transfer to </h2>
                <input type="number" placeholder="Enter phone_no" class="input" name='receiver_phone_no' onChange={handleInputs} />
                <h2 id='transfer-amount'>Amount </h2>
                <input type="number" placeholder="Enter amount" class="input" name='money' onChange={handleInputs} />
                <button class="btn" onClick={handleSubmit1}>Transfer</button>
            </form>
        </div>

        <div class="container__overlay">
            <div class="overlay">
                <div class="overlay__panel overlay--right">
                    <h1 id='heading'>Your balance</h1><br/>
                    <button class="btn" onClick={handleSubmit2}>Return home</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Transfer
