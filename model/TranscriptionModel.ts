const mysql = require('mysql');

const conn = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT,
  database : process.env.DATABASE,
});

const TranscriptionModel = {
  async getReviewed(){
    return new Promise((resolve) => {
      const SQL = `SELECT * FROM transcription where status = 'transmitted'`;
      conn.query(SQL, function (error, results) {
        if (error) throw error;
        resolve(results);
      });
    });
  }
};

export default TranscriptionModel;
