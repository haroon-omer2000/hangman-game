import React,{useState} from 'react'

const LoginForm = ({Login}) => {

    const [details,setDetails] = useState({"name":""});

    const SubmitHandler = e =>{
        e.preventDefault();
        Login(details);
    }

    return (
        <form onSubmit={SubmitHandler}>
            <div>
                <input type="text" placeholder="Enter any name..." onChange={e=> setDetails({...details,name:e.target.value})}  value={details.name} />
                <input type="submit" value="Login"/>
            </div>
        </form>
    )
}

export default LoginForm;
