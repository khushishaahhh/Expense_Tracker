import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";
import { toast } from "react-toastify";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: rgb(241,237,250);
  background: linear-gradient(90deg, rgba(241,237,250,1) 0%, rgba(187,189,222,1) 35%, rgba(180,220,238,1) 100%);
  font-family: Montserrat, sans-serif;
`;


const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;


const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #5a07ce;
  }
`;


const Title = styled.h2`
  color: #333;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;


const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background-color: #5a07ce;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #360f70;
  }
`;


const SignupLink = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #666;
  a {
    color: #5a07ce;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful");
      navigate("/Home", { state: { email } });
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  };

  return (
    <Container>
      <FormBox>
        <Title>Login</Title>
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <LoginButton type="submit"> Login</LoginButton>
        </form>
        <SignupLink>
          Don't have an account? <a href="/">Sign up</a>
        </SignupLink>
      </FormBox>
    </Container>
  );
};

export default Login;
