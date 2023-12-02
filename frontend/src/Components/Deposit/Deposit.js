import {React,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './Deposit.css'
import axios from "axios";

const Deposit = () => {
    const [inputs , setInputs] = useState({
        money:''
    })
    const [balance,setBalance] = useState({})
    useEffect(()=>{
        async function fetchbalance(){
            const account_no = localStorage.getItem('account_no')
            const request = await axios.get(`http://localhost:3000/accounts/?account_no=${account_no}`)
            let temp = request.data[0]
            setBalance(temp)
        }
        fetchbalance()
    })
    const navigate = useNavigate();
    const handleInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({...inputs,[name] : value})
      }

    const handleSubmit1 = async(event)=>{
        event.preventDefault()
        const newRecord = {...inputs,"phone_no":localStorage.getItem('phone_no')}
        if (newRecord.money==''){
            window.alert("Enter the amount to be deposited");
        }
        else{
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let currentDate = `${year}-${month}-${day}`;
            newRecord["date"] = currentDate
            newRecord["account_no"] = localStorage.getItem('account_no')
            newRecord["type"] = "deposit"
            console.log(newRecord)
            try {
                const temp1 = await axios.post('http://localhost:3000/deposit',newRecord);
                const temp2 = temp1.data
                if(temp2.error=="No balance"){
                    window.alert("Inavalid amount");
                }
                else{
                    window.alert("Successfull deposit");
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
        <form class="form" id="form2">
            <h2 class="form__title">Deposit money</h2>
            <input type="number" placeholder="Enter amount to be deposited" class="input" name='money' onChange={handleInputs} value={inputs.money} />
            <button class="btn" onClick={handleSubmit1}>Deposit</button>
        </form>
    </div>

    <div class="container__overlay">
        <div class="overlay">
            <div class="overlay__panel overlay--right">
                <h1 id='heading'>Your balance</h1>
                <h1 id='heading'> ₹ {balance.balance}</h1><br/>
                <button class="btn" onClick={handleSubmit2}>Return home</button>
            </div>
        </div>
    </div>
</div>
  )
}

export default Deposit
