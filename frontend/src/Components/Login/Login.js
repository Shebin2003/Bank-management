import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from "axios";

function refreshPage() {
    window.location.reload(false);
  }
const Login = () => {
    const [registerinputs , setRegisterInputs] = useState({
        name:"",
        age:"",
        email:'',
        phone_no:'',
        address:'',
        password:''
    })
    const [logininputs , setLoginInputs] = useState({
        phone_no:"",
        password:""
    })
    const navigate = useNavigate();
    const handleRegisterInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setRegisterInputs({...registerinputs,[name] : value})
      }
    const handeLoginInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setLoginInputs({...logininputs,[name] : value})
		
      }
	const handleLoginSubmit = async(event)=>{
        event.preventDefault()
        const newRecord = {...logininputs}
		const data = await axios.get(`http://localhost:3000/sign-in/?password=${newRecord.password}&phone_no=${newRecord.phone_no}`)
		const status = data.data
		if (status.status=="true"){
			localStorage.setItem('phone_no', newRecord.phone_no);
			localStorage.setItem('account_no', status.account_no);
			navigate('/services')
		}
		else if(status.status=="false"){
			window.alert("Incorrect Password");
		}
		else{
			window.alert("User does not exist");
		}

		
		}
    const handleRegisterSubmit = async(event)=>{
        event.preventDefault()
        const newRecord = {...registerinputs}
		const date = new Date();
		let day = date.getDate();
		let month = date.getMonth() + 1;
		let year = date.getFullYear();
		let currentDate = `${year}-${month}-${day}`;
		newRecord["activation_date"] = currentDate
		try {
			await axios.post('http://localhost:3000/register',newRecord);
			console.log("successfully posted")
		  } catch (error) {
			console.log(error);
		  }
		console.log('record :',newRecord)
		refreshPage()
		}
  return (
    <div>
        <div className="login-wrap">
	<div className="login-html">
		<input id="tab-1" type="radio" name="tab" className="sign-in" /><label for="tab-1" className="tab">Sign In</label>
		<input id="tab-2" type="radio" name="tab" className="sign-up" /><label for="tab-2" className="tab">Sign Up</label>
		<div className="login-form">
			<div className="sign-in-htm">
				<div class="group">
					<label for="user" className="label">Phone number</label>
					<input id="user" type="number" name="phone_no" value={logininputs.phone_no} onChange={handeLoginInputs} className="input"/>
				</div>
				<div className="group">
					<label for="pass" className="label">Password</label>
					<input id="pass" type="password" name="password" value={logininputs.password}  onChange={handeLoginInputs} className="input" data-type="password"/>
				</div>
				<div className="group">
					<input type="submit" className="button" value="Sign In" onClick={handleLoginSubmit}/>
				</div>
				<div className="hr"></div>
			</div>
			<div className="sign-up-htm">
				<div class="group">
					<label for="user" className="label">Username</label>
					<input id="user" type="text" className="input" name="name" value={registerinputs.name} onChange={handleRegisterInputs}/>
				</div>
				<div className="group">
					<label for="pass" className="label">date</label>
					<input id="pass1" type="date" className="input" data-type="password" name="age" value={registerinputs.age} onChange={handleRegisterInputs}/>
				</div>
				<div className="group">
					<label for="pass" className="label">Email</label>
					<input id="pass2" type="email" className="input" name="email" value={registerinputs.email} onChange={handleRegisterInputs}/>
				</div>
                <div className="group">
					<label for="pass" className="label">Phone number</label>
					<input id="pass3" type="number" className="input" name="phone_no" value={registerinputs.phone_no} onChange={handleRegisterInputs}/>
				</div>
                <div className="group">
					<label for="pass" className="label">Address</label>
					<input id="pass4" type="text" class="input" name="address" value={registerinputs.address} onChange={handleRegisterInputs}/>
				</div>
                <div className="group">
					<label for="pass" className="label">Password</label>
					<input id="pass5" type="password" className="input" data-type="password" name="password" value={registerinputs.password} onChange={handleRegisterInputs}/>
				</div>
				<div class="group">
					<input type="submit" className="button" onClick={handleRegisterSubmit} value="Sign Up"/>
				</div>
				
			</div>
		</div>
	</div>
</div>
    </div>
  )
}

export default Login
