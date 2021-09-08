import React,{useState} from 'react'

const EmployeeLogin = ({Login,changeView}) => {

    const [details,setDetails] = useState({"email":"","emp_id":"","attempt_no":"","as_guest":false,"name":"","guest_id":""});

    const SubmitHandler = e =>{
        e.preventDefault();
        Login(details);
    }

    return (
    <div >
        <form onSubmit={SubmitHandler}>
            <div className="form">
                <div className="form-input" >
                    <label className="input-label" htmlFor="Email">Email:</label><br/><br/>
                    <input required className="inputbox" type="text" placeholder="e.g John.Doe@ptcl.net.pk" onChange={e=> setDetails({...details,email:e.target.value})}  value={details.email} />
                </div>
                <div className="form-input">
                    <label className="input-label" htmlFor="Employee_ID">Employee ID:</label><br/><br/>
                    <input required className="inputbox" type="text" placeholder="Enter your ID..." onChange={e=> setDetails({...details,emp_id:e.target.value})}  value={details.emp_id} />
                </div>
                <button className="submit-button" onClick={()=>setDetails({...details,as_guest:false})} type="submit">Play</button>
            </div>
        </form>

        <div className="form">
            <h3>OR</h3>
            <button className="submit-button" onClick={()=> changeView(true)} type="submit">Play As Guest</button>
        </div>
    </div>
    )
}

export default EmployeeLogin;
