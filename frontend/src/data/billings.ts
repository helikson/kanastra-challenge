export async function getBillings() {
   await new Promise(resolve => setTimeout(resolve, 1000));

   return [
      {"name": "John", "governmentId": "12345", "email": "john@example.com", "debtAmount": 1000, "debtDueDate": "2022-12-31", "debtId": "A001"},
      {"name": "Alice", "governmentId": "67890", "email": "alice@example.com", "debtAmount": 1500, "debtDueDate": "2022-11-30", "debtId": "B002"},
      {"name": "Bob", "governmentId": "24680", "email": "bob@example.com", "debtAmount": 800, "debtDueDate": "2023-01-15", "debtId": "C003"},
      {"name": "Eva", "governmentId": "13579", "email": "eva@example.com", "debtAmount": 1200, "debtDueDate": "2022-10-20", "debtId": "D004"},
      // {"name": "Michael", "governmentId": "10101", "email": "michael@example.com", "debtAmount": 2000, "debtDueDate": "2023-02-28", "debtId": "E005"},
      // {"name": "Sophia", "governmentId": "24681", "email": "sophia@example.com", "debtAmount": 950, "debtDueDate": "2022-09-15", "debtId": "F006"},
      // {"name": "William", "governmentId": "54321", "email": "william@example.com", "debtAmount": 1800, "debtDueDate": "2022-08-31", "debtId": "G007"},
      // {"name": "Olivia", "governmentId": "98765", "email": "olivia@example.com", "debtAmount": 600, "debtDueDate": "2023-03-31", "debtId": "H008"},
      // {"name": "Liam", "governmentId": "19283", "email": "liam@example.com", "debtAmount": 1300, "debtDueDate": "2023-04-30", "debtId": "I009"},
      // {"name": "Emma", "governmentId": "56789", "email": "emma@example.com", "debtAmount": 700, "debtDueDate": "2022-07-31", "debtId": "J010"},
      // {"name": "Noah", "governmentId": "11223", "email": "noah@example.com", "debtAmount": 1700, "debtDueDate": "2022-06-30", "debtId": "K011"},
      // {"name": "Ava", "governmentId": "45678", "email": "ava@example.com", "debtAmount": 850, "debtDueDate": "2023-05-31", "debtId": "L012"},
      // {"name": "Logan", "governmentId": "87654", "email": "logan@example.com", "debtAmount": 1100, "debtDueDate": "2023-06-30", "debtId": "M013"},
      // {"name": "Mia", "governmentId": "54327", "email": "mia@example.com", "debtAmount": 950, "debtDueDate": "2022-05-31", "debtId": "N014"},
      // {"name": "James", "governmentId": "98765", "email": "james@example.com", "debtAmount": 1200, "debtDueDate": "2023-07-31", "debtId": "O015"},
      // {"name": "Amelia", "governmentId": "19283", "email": "amelia@example.com", "debtAmount": 750, "debtDueDate": "2022-04-30", "debtId": "P016"},
      // {"name": "Benjamin", "governmentId": "56789", "email": "benjamin@example.com", "debtAmount": 1600, "debtDueDate": "2022-03-31", "debtId": "Q017"},
      // {"name": "Charlotte", "governmentId": "11223", "email": "charlotte@example.com", "debtAmount": 900, "debtDueDate": "2023-08-31", "debtId": "R018"},
      // {"name": "Elijah", "governmentId": "45678", "email": "Elijah@example.com", "debtAmount": 3400, "debtDueDate": "2023-08-31", "debtId": "R019"}
   ];
}

export async function createBilling(data: any) {
   await new Promise(resolve =>  setTimeout(resolve, 1000));
   return [];
}