import styled from "styled-components";

// Styled button component
export const StyledButton = styled.button`
  background-color: #007bff; /* Bootstrap primary color */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  height: 38px;
  transition: background-color 0.3s;
  padding: 0px 18px;
  &:hover {
    background-color: #0056b3; /* Darker shade on hover */
  }
`;
export const Card = styled.div`
  background-color: #e9f3f6;
  padding: 2rem;
  border: none;
  border-radius: 42px;
`;
export const Content = styled.div`
  display: flex;
  gap: 12px;
  align-items: end;
  flex-wrap: wrap;
`;
