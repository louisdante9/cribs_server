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
// eslint-disable-next-line import/prefer-default-export
export const sendVerificationEmail = (email, firstname, activationCode) => {
  console.log(process.env.EMAIL, 'hello')
  const transporter = nodemailer.createTransport({
    // service: 'zoho mail',
    host: 'smtp.zoho.com',
    port: 465,
    // secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: '"Rezerve Homes" <support@rezervehomes.com>',
    to: email,
    subject: 'ACCOUNT VERIFICATION CODE',
    html: `
    <body>
    <div>
    <div style="background-color:#f2f3f5;padding:20px">
      <div style="max-width:600px;margin:0 auto">
       <div 
        style="
          background:#fff;
          font:14px sans-serif;
          color:#686f7a;
          border:2px solid #6c4af2;
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
              Rezerve Homes</h4>
        </div>
        <div style="padding:10px 20px;line-height:1.5em;color:#686f7a">
          <p 
            style="
              padding-bottom:20px;
              margin:20px 0;
              color:#686f7a">
             Hi ${firstname}, <br/> <br/>
             Your account has been successfully created!.<br/>
             Here is your activation code <b>${activationCode}</b>. Copy and paste in your browser.
          </p>
          <p 
            style="
              padding-bottom:15px;
              margin-top:10px;
              color:#686f7a">
              If you haven't made this request, kindly ignore this message.
          </p>
          <p 
            style="padding-bottom:10px;
              margin-top:20px;
              color:#686f7a">
              Best regards, <br>
              Rezerve Homes.<br>
            <a href="rezervehome.com"
              style="color: #6c4af2">rezervehome.com
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
    if (error) {
      console.log(error);
      return error;
    }
  });
};
