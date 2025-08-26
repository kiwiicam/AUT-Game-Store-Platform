import React, { useRef, useState, useEffect } from 'react';
import '../css/VerifyEmail.css';
import '../css/Signup.css'
import axios from 'axios';
import { useNavigate } from 'react-router';

const VerifyEmail = () => {
    const [timeLeft, setTimeLeft] = useState(30);
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

    useEffect(() => {
        if (timeLeft === 0) return;

        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);


    async function resendCode() {
        //check if there is still time left before allowing code resend
        if (timeLeft > 0) return;
        try {
            const email = localStorage.getItem('email');
            const response = await axios.post('http://localhost:8000/api/auth/resend', { email });
            setTimeLeft(30);
            setOtp(Array(6).fill(''));
            inputsRef.current[0].focus();
        } catch (error) {
            alert(error.message);
        }
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
            if (localStorage.getItem('uid') === null) {
                alert("email verified please sign in now")
                navigate("/signin");
                return;
            }
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
                <p></p>
                <p className={timeLeft === 0 ? 'resend' : 'resend-countdown'} onClick={() => resendCode()}>{timeLeft !== 0 ? timeLeft : "Resend Code"}</p>
                <button onClick={() => verifyEm()}>Verify Email</button>
            </div>
        </div>
    );
};

export default VerifyEmail;
