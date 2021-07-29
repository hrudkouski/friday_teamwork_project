import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useFormik } from 'formik';
import { loginTC, ProfileType } from "./login-reducer";
import { AppRootStateType } from "../../../n1-main/m2-bll/store/redux-store";
import style from './Login.module.css';

export const Login = () => {
    
    
    type FormikErrorType = { 

        email?: string 
        password?: string 
        rememberMe?: boolean 
     } 
    
    
        const dispatch = useDispatch();
        const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    





        const formik = useFormik({
            initialValues: {
                email: '',
                password: '',
                rememberMe: false
            },
            validate: (values) => { 
    
                const errors: FormikErrorType = {}; 
                if (!values.email) { 
                    errors.email = 'Required'; 
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) { 
         
                    errors.email = 'Invalid email address'; 
                } 
    
                if(!values.password){
                    errors.password = 'Required';
                } else if (values.password.length < 4) {
         
                    errors.password = 'Password to short'; 
                }
    
                return errors; 
            }, 
            onSubmit: values => {
                
                //alert(JSON.stringify(values, null, 2))
                
                const loginProfile = {
                    email: values.email,
                    password: values.password,
                    rememberMe: values.rememberMe
                }
                dispatch(loginTC(loginProfile))
                formik.resetForm();
            },
        });
    
        if(isLoggedIn) {
            return <Redirect to={'/profile'}/>
        }
    
       return <>


                <div className={style.loginFormContainer}>
                    Login
                    <form className={style.loginForm}
                            onSubmit={formik.submitForm}>

                        {/* required  - validating form but need to refactor this */}
                        <input type="text" 
                                placeholder='Email*' 
                                name='email'
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                onBlur={formik.handleBlur} 
                                required/>
                        
                        {formik.touched.email && formik.errors.email && 
                        <div className={style.error}>{formik.errors.email}</div>}


                        <input type="password" 
                                placeholder='Password*' 
                                name='password'
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}  
                                required/>
                        
                        {formik.touched.password && formik.errors.password && 
                        <div className={style.error}>{formik.errors.password}</div>}

                        {/* Checkbox start */}
                        <div className={style.checkBoxContainer}>
                            <input  className={style.checkBox}
                                    type="checkbox" 
                                    //placeholder='E-mail*' 
                                    name='Remember Me'
                                    id="rememberMe" 
                                    />
                            <label className={style.checkBoxLabel} htmlFor="rememberMe">Remember me</label>

                            
                        </div>
                        {/* Checkbox end */}
                        
                        <input  className={style.submitButton}
                                    type="submit" value="Login" />

                    </form>
                </div>
                
       </> 
    //    <Grid container justify="center"> 
    
    //        <Grid item xs={4}> 
    //            <FormControl> 
    //                <FormLabel> 
    //                    <p>To log in get registered  
    //                      <a style={{'textDecoration': 'none'}} href={'https://social-network.samuraijs.com/'} 
    //                         target={'_blank'}> here 
    //                      </a> 
    //                    </p> 
    //                    <p>or use common test account credentials:</p> 
    //                    <p>Email: free@samuraijs.com</p> 
    //                    <p>Password: free</p> 
    //                </FormLabel> 
                   
    //                <form onSubmit={formik.handleSubmit}>
    //                         <FormGroup> 
    //                             <TextField 
    //                                 label="Email" 
    //                                 margin="normal" 
    //                                 // name="email"
    //                                 // onChange={formik.handleChange}
    //                                 // value={formik.values.email}
    //                                 // onBlur={formik.handleBlur}
    //                                 {...formik.getFieldProps('email')}
    //                             />
    //                              {/* Show error if field has touched and has error */}
    //                             {formik.touched.email && formik.errors.email && 
    //                             <div style={{'color': 'red'}}>{formik.errors.email}</div>}
    
    //                             <TextField 
    //                                 type="password" 
    //                                 label="Password" 
    //                                 margin="normal"
    //                                 // name="password"
    //                                 // onChange={formik.handleChange}
    //                                 // value={formik.values.password} 
    //                                 // onBlur={formik.handleBlur}
    //                                 {...formik.getFieldProps('password')}
    //                             /> 
    //                             {/* Show error if field has touched and has error */}
    //                             {formik.touched.password && formik.errors.password && 
    //                             <div style={{'color': 'red'}}>{formik.errors.password}</div>}
    
    //                             <FormControlLabel 
    //                                 label={'Remember me'} 
    //                                 control={<Checkbox  {...formik.getFieldProps('rememberMe')}/>} 
    //                             /> 
    
    //                             <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button> 
    //                         </FormGroup> 
    //                </form>
    
    //            </FormControl> 
    //        </Grid> 
    
    //    </Grid> 
    
    


}