import styled from "styled-components";
import TransactionComponent from "./TransactionComponent";
import OverviewComponent from "./OverviewComponent";
import { useEffect, useState, useCallback } from "react";
import { db } from "../../firebase";
import { ref, push, onValue } from "firebase/database";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
  margin: 20px 0 25px;
  font-family: Montserrat;
  width: 360px;
`;

const HomeComponent = ({ user }) => {
  const [transactions, updateTransaction] = useState([]);
  const [expense, updateExpense] = useState(0);
  const [income, updateIncome] = useState(0);

 
  const addTransaction = async (payload) => {
    const transactionArray = [...transactions, payload];
    updateTransaction(transactionArray);

    try {
      await push(ref(db, "transactions"), {
        ...payload,
        email: user.email,
      });
    } catch (error) {
      console.error("Error adding transaction: ", error);
    }
  };

 
  const fetchTransactions = useCallback(() => {
    const transactionsRef = ref(db, "transactions");
    onValue(transactionsRef, (snapshot) => {
      const fetchedTransactions = [];
      snapshot.forEach((childSnapshot) => {
        const transactionData = childSnapshot.val();
        if (transactionData.email === user.email) {
          fetchedTransactions.push({ ...transactionData, id: childSnapshot.key });
        }
      });
      updateTransaction(fetchedTransactions);
    });
  }, [user.email]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const calculateBalance = useCallback(() => {
    let exp = 0;
    let inc = 0;
    transactions.forEach((payload) => {
      payload.type === "EXPENSE" ? (exp += payload.amount) : (inc += payload.amount);
    });
    updateExpense(exp);
    updateIncome(inc);
  }, [transactions]);

  useEffect(() => {
    calculateBalance();
  }, [calculateBalance]);

  return (
    <Container>
      <OverviewComponent
        addTransaction={addTransaction}
        expense={expense}
        income={income}
        email={user.email}
      />
      <TransactionComponent transactions={transactions} />
    </Container>
  );
};

export default HomeComponent;
