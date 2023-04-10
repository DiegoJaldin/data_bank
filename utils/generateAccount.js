function generateAccountNumber(){
  const randomNumber = Math.floor(Math.random() * 999999) + 1;
  return randomNumber.toString().padStart(6, '0');
}

module.exports = generateAccountNumber;