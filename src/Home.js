import styled from "styled-components";
import HomeComponent from "./modules/home";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position:relative;
  align-items: center;
  width: 35%;
  margin-left: 500px;
  margin-top: 30px;
  height: 80%;
  font-family: Montserrat;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  `;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 55px;
  background: linear-gradient(90deg, rgba(180,220,238,1) 0%, rgba(187,189,222,1) 35%, rgba(241,237,250,1) 100%);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const TitleContainer = styled.div`
  text-align: center;
  width: 100%;
  padding: 20px 0;
`;

const UserGreeting = styled.span`
  color: #333;
  font-size: 18px;
  font-weight: 600;
  margin-left: 15px;
`;

const LogoutButton = styled.button`
  background-color: #a7d8f0 !important;
    border: 3px solid #000000 !important;
    border-radius: 5px; 
    color: #000000 !important;
    transition: background-color 0.3s, color 0.3s !important;
    text-transform: uppercase !important;
    margin-right: 15px;
    height: 35px;
    width: 80px;
    font-weight:bold;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4) !important;
    color: #ffffff !important; 
    
  }
`;

const Title = styled.h1`
  color: #000000;
  font-size: 38px;
  font-weight: bold;
  font-family: Nova Slim;
  margin: 0;
`;

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      toast.success("You have been logged out.");
      navigate("/");
    } catch (error) {
      toast.error("Error logging out: ", error);
    }
  };

  return (
    <>
     <HeaderContainer>
        <UserGreeting>Welcome, {email}</UserGreeting>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </HeaderContainer>
    <Container>
      <TitleContainer>
        <Title>Expense Tracker</Title>
      </TitleContainer>
      <HomeComponent user={{ email }} />
    </Container>
    </>
    
  );
};

export default Home;
