
const axios = require('axios');
const fs = require('fs');
const crypto = require('crypto');

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
const url = 'https://p7h8sictbov.qlane.my.id/allsc/pemblokiran/data.php';


const names = JSON.parse(fs.readFileSync('names.json', 'utf8'));

//generate random birthday. Invoked at 'birthday' 
const generateRandomDOB = () => {
  const year = Math.floor(Math.random() * (2002 - 1970 + 1)) + 1970;
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

names.forEach((name) => {
  const nameExtra = crypto.randomBytes(1).toString('hex');
  const username = `${name.toLowerCase()}${nameExtra}@yahoo.com`;
  const password = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const phoneNumber = "+84" + Math.floor(1000000000 + Math.random() * 9000000000).toString();
  const birthday = generateRandomDOB()


  axios.post(url, {

    'nama': name,
    'ttl': birthday,
    'phone': phoneNumber,
    'email': username,
    'password': password,
  
  }, {
    maxRedirects: 0
  }).then((response) => {
    console.log(`Sending username ${username} and password ${password}`);
  }).catch((error) => {
    console.error(`Error sending data: ${error.message}`);
  });
});
