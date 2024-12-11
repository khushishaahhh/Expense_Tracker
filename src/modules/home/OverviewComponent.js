import { useState } from "react";
import styled from "styled-components";
import { db } from '../../firebase';
import { ref, push } from 'firebase/database';
import { toast } from "react-toastify";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  font-family: Montserrat;
  width: 100%;
`;


const BalanceBox = styled.div`
  font-size: 18px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
`;


const BalanceText = styled.text`
font-weight: bold;
text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
`;


const AddTransaction = styled.div`
  background: #a7d8f0;
  border: 2px solid #5a07ce !important;
  color: black;
  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  font-family:  ABeeZee;
  font-size: 15px;
`;


const AddTransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #5a07ce;
  gap: 10px;
  width: 100%;
  padding: 15px 20px;
  margin: 20px;
 
  & input {
    outline: none;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #5a07ce;
  }
`;


const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;


  & input {
    margin: 0 10px;
  }
`;


const ExpenseContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 20px;
`;


const ExpenseBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background-color: rgba(0,0,0,0.1);
  border: 1px solid #5a07ce;
  padding: 15px 20px;
  width: 130px;
  font-size: 15px;


  & span {
    font-weight: bold;
    font-size: 20px;
    color: ${(props) => (props.isIncome ? 'green' : 'red')}
  }
`;


const AddTransactionView = (props) => {
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState("EXPENSE");


  const addTransaction = async () => {
    if (!amount || !desc) {
      toast.error("Please fill in all fields.");
      return;
    }


    try {
      await push(ref(db, 'transactions'), {
        amount: Number(amount),
        desc,
        type,
        email: props.email,
        createdAt: new Date(),
      });
      toast.success("Transaction added")
      props.toggleAddTxn();
      setAmount('');
      setDesc('');
    } catch (error) {
      toast.error('Error adding transaction ', error);
    }
  };


  return (
    <AddTransactionContainer>
      <input
        placeholder="Amount"
        value={amount}
        type="number"
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <RadioBox>
        <input
          type="radio"
          id="expense"
          name="type"
          value="EXPENSE"
          checked={type === "EXPENSE"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="expense">Expense</label>
        <input
          type="radio"
          id="income"
          name="type"
          value="INCOME"
          checked={type === "INCOME"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="income">Income</label>
      </RadioBox>
      <AddTransaction onClick={addTransaction}>Add Transaction</AddTransaction>
    </AddTransactionContainer>
  );
};


const OverviewComponent = (props) => {
  const [isAddTxnVisible, toggleAddTxn] = useState(false);


  return (
    <Container>
      <BalanceBox >
        <BalanceText>Balance: ₹{props.income - props.expense}</BalanceText>
        <AddTransaction onClick={() => toggleAddTxn(!isAddTxnVisible)}>
          {isAddTxnVisible ? "Cancel" : "ADD"}
        </AddTransaction>
      </BalanceBox>
      {isAddTxnVisible && (
        <AddTransactionView
          toggleAddTxn={toggleAddTxn}
          email={props.email}
        />
      )}
      <ExpenseContainer>
        <ExpenseBox isIncome={false}>
          Expense<span>₹{props.expense}</span>
        </ExpenseBox>
        <ExpenseBox isIncome={true}>
          Income<span>₹{props.income}</span>
        </ExpenseBox>
      </ExpenseContainer>
    </Container>
  );
};


export default OverviewComponent;