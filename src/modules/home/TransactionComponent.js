import styled from "styled-components";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { ref, remove } from "firebase/database"; // Import the correct functions
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 22px;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;
  color: #ffffff;

  & input {
    padding: 10px 12px;
    border-radius: 12px;
    background: #e6e8e9;
    border: 1px solid #e6e8e9;
    outline: none;
    width: 90%;
  }
`;

const Title = styled.text`
  font-weight: bold;
  text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
`;

const TransactionList = styled.div`
  width: 100%;
  margin-top: 20px;
  max-height: 195px;
  min-height: 195px;
  overflow-y: scroll;
  color: black;

  &::-webkit-scrollbar {
    width: 15px !important;
    border-top-left-radius: 10px !important;
    border-top-right-radius: 10px !important;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #3a3a3a !important;
    border-radius: 10px !important;
    border: 1px solid black !important;
  }
`;

const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e6e8e9;
  &:last-child {
    border-bottom: none;
  }
`;

const Button = styled.div`
  display: inline-block;
  color: grey;
  cursor: pointer;
  transition: color 0.3s ease;
  margin-left: 10px;
  margin-right: 5px;
  &:hover {
    color: black;
  }
`;

const Amount = styled.span`
  color: ${(props) => (props.type === "EXPENSE" ? "red" : "green")};
  font-weight: bold;
  margin-left: auto;
`;

const TransactionComponent = ({ transactions, fetchTransactions }) => {
  const handleDelete = async (id) => {
    try {
      const transactionRef = ref(db, `transactions/${id}`);
      await remove(transactionRef);
      toast.success("Transaction Deleted");
      fetchTransactions(); 
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const [searchText, updateSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredTransactions, updateFilteredTransactions] = useState(transactions);

  useEffect(() => {
    const results = transactions.filter((transaction) => {
      const matchesSearch = transaction.desc.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" ||
        (selectedCategory === "Expenses" && transaction.type === "EXPENSE") ||
        (selectedCategory === "Income" && transaction.type === "INCOME");

      return matchesSearch && matchesCategory;
    });
    updateFilteredTransactions(results);
  }, [searchText, selectedCategory, transactions]);

  return (
    <Container>
      <Title>Transactions</Title>
      <input
        placeholder="Search"
        value={searchText}
        onChange={(e) => updateSearchText(e.target.value)}
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{
          padding: '10px',
          borderRadius: '12px',
          marginTop: '10px',
          width: '97%',
          backgroundColor: '#e6e8e9',
          color: 'black',
          fontSize: '14px',
          border: '1px solid #e6e8e9',
          appearance: 'none',
        }}
      >
        <option value="All">All</option>
        <option value="Expenses">Expenses</option>
        <option value="Income">Income</option>
      </select>

      <TransactionList>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction, index) => (
            <TransactionItem key={index}>
              <div>{transaction.desc}</div>
              <Amount type={transaction.type}>
                ₹{transaction.amount.toFixed(2)}
              </Amount>
              <Button>
                <FaTrash
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDelete(transaction.id)}
                />
              </Button>
            </TransactionItem>
          ))
        ) : (
          "No transactions found."
        )}
      </TransactionList>
    </Container>
  );
};

export default TransactionComponent;
