export const calculateLoan = (amount: number, tenure: number) => {
  const R = 12;

  const days = tenure * 30; // convert months → days

  const SI = (amount * R * days) / (365 * 100);

  return {
    interest: SI,
    totalRepayment: amount + SI
  };
};