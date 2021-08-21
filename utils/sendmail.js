import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @function sendUrgentMail
 * @param {*} token
 * @param {*} email
 * @param {*} host
 * @returns {*} Email notification
 */
export const sendSuccessfulTransfer = (
  email,
  receiverBank,
  receiverName,
  receiverAccountNumber,
  amountToTransfer,
  balance,
  username
) => {
  const transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: '"Abnb" <accounts@abnbfinance.com>',
    to: email,
    subject: 'TRANSFER SUCCESSFUL',
    html: `
    <body><div>
    <div style="background-color:#f2f3f5;padding:20px">
      <div style="max-width:600px;margin:0 auto">
       <div 
        style="
          background:#fff;
          font:14px sans-serif;
          color:#686f7a;
          border:2px solid #f4ab40;
          margin-bottom:10px">
        <div 
          style="
           border-bottom:1px solid #f2f3f5;
           padding-bottom:20px;
           padding-top:20px">
          <h4 
            style="
              padding-top:0; 
              padding-left:20px; 
              margin:0; 
              font-size:30px;
              font-family:'Kurale', serif;">
              ABNB</h4>
        </div>
        <div style="padding:10px 20px;line-height:1.5em;color:#686f7a">
          <p 
            style="
              padding-bottom:20px;
              margin:20px 0;
              color:#686f7a">
             Hi ${username}, your transfer of $${amountToTransfer} to account number ${receiverAccountNumber} was successful.
          </p>
          <p 
          style="
            padding-bottom:20px;
            margin:20px 0;
            color:#686f7a">
           TRANSACTION DETAIL:
        </p>
        <p 
        style="
          padding-bottom:20px;
          margin:20px 0;
          color:#686f7a">
          Account Number: ${receiverAccountNumber}<br/>
          Account Name: ${receiverName}<br/>
          Beneficiaries Bank: ${receiverBank}<br/>
          Amount Transfered: $${amountToTransfer}<br/>
      </p>
      <p
         style=""><a 
            style="
              display:inline-block;
              font-size:15px;color:#ffffff;
              padding:10px 15px;
              text-decoration:none;
              background-color:#f4ab40;
              border-radius:3px" 
              target="_blank">
              ACCOUNT BAL:  $${balance}
          </a>
          </p>
          <p 
            style="
              padding-bottom:15px;
              margin-top:40px;
              color:#686f7a">
              If you haven't made this request please ignore this message.
          </p>
          <p 
            style="padding-bottom:10px;
              margin-top:20px;
              color:#686f7a">
              Best regards, <br>
              ABNB.<br>
            <a href="abnbfinance.com"
              style="color: #f4ab40">abnbfinance.com
            </a>
          </p>
        </div>
     </div>
    </div>
  </body>
    `,
  };

  // eslint-disable-next-line consistent-return
  transporter.sendMail(mailOptions, (error) => {
    console.log(mailOptions, 'mailOptions');
    if (error) {
      console.log(error);
      return error;
    }
  });
};

/**
 * @function sendSuccessfulReset
 * @param {*} email
 * @returns {*} Email notification
 */
export const sendSuccessfulTransfer2 = (email) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"ABNB" <@gmail.com>',
    to: email,
    subject: 'YOUR TRANSFER WAS SUCCESSFUL',
    html: `  <div style="width: 100%; color: white; background-color: #fff; padding: 2%;">
    <div style="width: 60%; background-color: #2c3e56; margin: auto;">
      <div style="height: 8%; background-color: #2c3e56; width:100%; border-bottom: 1.2px solid black">
        <p style="color: palevioletred; font-weight:bold; margin-left: 3%; padding-top: 2%; font-family: kurale serif">POSTIT!!</p>
      </div>
      <div style="padding: 8%">
        <div class="row">
          This email confirms that your new POSTIT password has been updated.
    You can now access your Account.
        </div>
          <br>
          Thanks You.
        <div>
          <br>
        </div>
        <p style="font-weight: bold; font-family:kurale serif; color: palevioletred">POSTIT!!</p>
      </div>
      <div style="height: 8%; background-color: #2c3e56; border-top: 1.2px solid black; width:100%">
        <p><small style="padding-left: 2%; text-align: center; color:white;"> Copyright M.jeck</small></p>
      </div>
    </div>
  </div> `,
  };

  // send mail with defined transport object
  // eslint-disable-next-line consistent-return
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    console.log(`Message ${info.messageId} send: ${info.response}`);
  });
};
