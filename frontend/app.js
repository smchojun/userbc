//app.js

async function fetchData() {
  const username = document.getElementById('username').value;
  //   const password = document.getElementById('password').value;
  const resultElement = document.getElementById('result');
  const balanceElement = document.getElementById('balance');
  const operatorcode = 't33k'; //e11k / t33k
  const providercode = 'GE';
  //const secretKey = 'J6pzVv24uQ53wSeWCx7kKdjHYAtfZN98'; //e11k
  const secretKey = `a50c1b546725a5c4d33328f51896eb24`; //t33k

  /*
  if (!username || !password) {
    resultElement.textContent = '아이디와 패스워드를 입력해 주세요!';
    return;
  }
  */

  const password = username; //패스워드를 아이디와 동일하게 설정

  //MD5 해시 성성
  const hash = CryptoJS.MD5(operatorcode + password + providercode + username + secretKey);
  const signature = hash.toString(CryptoJS.enc.Hex).toUpperCase();

  const endpoint = `http://gsmd.336699bet.com/getBalance.aspx?operatorcode=${operatorcode}&providercode=${providercode}&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&signature=${signature}`;

  try {
    const response = await fetch(`http://localhost:3000/api`, { // for local
    //const response = await fetch(`https://userbc-f2a66.web.app/api`, { // for deploy
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ endpoint })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    if (data && data.balance != undefined) {
      const formattedBalance = parseFloat(data.balance).toLocaleString();
      balanceElement.textContent = formattedBalance; // 헤더 옆에 보유 금액 표시
      //resultElement.textContent = `Balance: ${data.balance}`;
      //showMessage(`조회 완료`);
      resultElement.textContent = '조회 완료';
    } else {
      resultElement.textContent = `보유금이 없습니다. `;
    }
  } catch (error) {
    resultElement.textContent = 'Error fetching data from the API.';    
  }
}

//전액 출금 action
async function withdrawAll() {
  const username = document.getElementById('username').value;
  const resultElement = document.getElementById('result');
  const balanceElement = document.getElementById('balance');
  const operatorcode = 't33k'; //e11k / t33k
  const providercode = 'GE';
  //const secretKey = 'J6pzVv24uQ53wSeWCx7kKdjHYAtfZN98'; //e11k
  const secretKey = `a50c1b546725a5c4d33328f51896eb24`; //t33k

  if (!username) {
    resultElement.textContent = '아이디를 입력해 주세요!';
    return;
  }

  const password = username; // 패스워드를 아이디와 동일하게 설정

  const amount = balanceElement.textContent.replace(/,/g, ''); // 보유 금액에서 콤마 제거하고 amount로 설정
  const referenceID = Date.now().toString(); // 고유한 참조 ID 생성
  const type = '1'; // 1: withdraw, 0: deposit

  // MD5 해시 생성
  const hash = CryptoJS.MD5(amount + operatorcode + password + providercode + referenceID + type + username + secretKey);
  const signature = hash.toString(CryptoJS.enc.Hex).toUpperCase();


  const endpoint = `https://gsmd.336699bet.com/makeTransfer.aspx?operatorcode=${operatorcode}&providercode=${providercode}&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&referenceID=${referenceID}&type=${type}&amount=${amount}&signature=${signature}`;

  try {
     const response = await fetch(`http://localhost:3000/api`, { // for local
     //const response = await fetch(`https://userbc-f2a66.web.app/api`, { // for deploy
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ endpoint })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    if (data || data.success) {
      await fetchData();      
      resultElement.textContent = '출금 완료';
    } else {
      resultElement.textContent = data.error || '출금이 완료되지 않았습니다.';
    }
  } catch (error) {
    resultElement.textContent = 'Error withdrawal data from the API.';
  }
}