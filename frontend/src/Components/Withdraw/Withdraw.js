import {React,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './Withdraw.css'
import axios from "axios";

const Withdraw = () => {
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
            window.alert("Enter the amount to be withdrawn");
        } 
        else{
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let currentDate = `${year}-${month}-${day}`;
            newRecord["date"] = currentDate
            console.log(newRecord,"reacher here")
            newRecord["account_no"] = localStorage.getItem('account_no')
            newRecord["type"] = "withdraw"
            try {
                const temp1 = await axios.post('http://localhost:3000/withdraw',newRecord);
                const temp2 = temp1.data
                console.log(temp2,"temp2")
                if(temp2.error=="No balance"){
                    window.alert("Account does not have sufficient balance");
                }
                else{
                    window.alert("Successfull withdraw");
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
                <h2 class="form__title">Withdraw money</h2>
                <input type="number" placeholder="Enter amount to be withdrawn" name='money' class="input" onChange={handleInputs}/>
                <button class="btn" onClick={handleSubmit1}>Withdraw</button>
            </form>
        </div>

        <div class="container__overlay">
            <div class="overlay">
                <div class="overlay__panel overlay--right">
                    <h1 id='heading'>Your balance </h1>
                    <h1 id='heading'> ₹ {balance.balance}</h1><br/>
                    <button class="btn" onClick={handleSubmit2}>Return home</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Withdraw
