import React, { useRef, useState, useEffect } from 'react';
import '../css/VerifyEmail.css';
import '../css/Signup.css'
import axios from 'axios';
import { useNavigate } from 'react-router';

const VerifyEmail = () => {
    const [otp, setOtp] = useState(Array(6).fill(''));
    const inputsRef = useRef([]);
    const navigate = useNavigate();
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const value = otp.join('');

    async function resendCode() {

    }
    async function verifyEm() {
        if (value.length < 6) {
            //display error message for code not being 6 digits
            return;
        }
        try {
            const email = localStorage.getItem('email');
            const reponse = await axios.post('http://localhost:8000/api/auth/verify', {
                code: value,
                email: email
            })
            alert(reponse.data.message);
            navigate("/")            
        }
        catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className='outer-background'>
            <div className='inner-container'>
                <h2>Verify your Email Address!</h2>
                <p>Enter the 6-digit code sent to your email address.</p>
                <div className="otp-container">
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            type="text"
                            maxLength="1"
                            value={otp[i]}
                            onChange={(e) => handleChange(e, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            ref={(el) => (inputsRef.current[i] = el)}
                        />
                    ))}
                </div>
                <p className='resend'>Resend Code</p>
                <button onClick={() => verifyEm()}>Verify Email</button>
            </div>
        </div>
    );
};

export default VerifyEmail;
