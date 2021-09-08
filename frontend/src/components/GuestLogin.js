import React,{useState} from 'react'

const GuestLogin = ({Login,changeView}) => {

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
                    <label className="input-label" htmlFor="Name">Name:</label><br/><br/>
                    <input required className="inputbox" type="text" placeholder="Your Full Name..." onChange={e=> setDetails({...details,name:e.target.value})}  value={details.name} />
                </div>
                <button className="submit-button" onClick={()=>setDetails({...details,as_guest:true})} type="submit">Play</button>
            </div>
        </form>

        <div className="form">
            <h3>OR</h3>
            <button className="submit-button" onClick={()=> changeView(false)} type="submit">Login As Employee</button>
        </div>
    </div>
    )
}

export default GuestLogin;
