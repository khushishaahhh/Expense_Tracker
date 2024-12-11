import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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

const SignupButton = styled.button`
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

const LoginLink = styled.p`
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

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account is created successfully");
      navigate("/Home", { state: { email } });
    } catch (error) {
      toast.error("Signup failed: ", error.message);
    }
  };

  return (
    <Container>
      <FormBox>
        <Title>Sign Up</Title>
        <form onSubmit={handleSignup}>
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
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <SignupButton type="submit">Sign Up</SignupButton>
        </form>
        <LoginLink>
          Already have an account? <a href="/Login">Login</a>
        </LoginLink>
      </FormBox>
    </Container>
  );
};

export default Signup;
