import React,{userState} from 'react'
import {Link} from 'react-router-dom';
const Register = ()=>{

    const [username, setUsername]=userState('');
    const [email,setEmail]=userState('');
    const [password,setPassword]= userState('');

    return(
       <div className='formContainer'>
              <div className='smart-hader'>
                <div className='smart-logo'>
                    <h2><link id='smart-logo-h2'to={'/'}>Smart Meet</link></h2>
                </div>
              </div>

              <div className='formWrapper'>
              <span className="title">Register</span>
                <form>
                <div className='mb-3'>
                    <label htmlFor="exampleInputName" className='form-label'>Username</label>
                    <inpute type="text" className="form-control" id="exampleInputName"  onchange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    <div className='mb-3'>
                    <label htmlFor="exampleInputEmail" className='form-label'>Email address</label>
                    <inpute type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" onchange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className='mb-3'>
                    <label htmlFor="exampleInputePassword" className='form-label'>Password</label>
                    <inpute type="password" className="form-control" id="exampleInputePassword" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>

                    <button type="submit" className='btn btn-primary' onClick={handleSubmit}>Register</button>
                </form>
                <p>Already registered?<Link to={'/register'}>Login</Link></p>
              </div>
        </div>
    )
}

export default Register