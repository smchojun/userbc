//api.js

const axios = require('axios');

exports.getData = async (req, res) => {
  try {
    const { endpoint } = req.body;
 
    const response = await axios.post(endpoint);    
    res.json(response.data);    
  } catch (error) {
    console.log('Error api fetching data:', error); // 에러 로그 출력
    res.status(500).json({ error: 'Error 500 api fetching data' });
  }
};
