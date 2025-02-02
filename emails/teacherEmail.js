const nodemailer = require('nodemailer');
const path = require('path');

const sendEmailToTeacher = (teacherInviteInfo) => {
    console.log('sending mail to teacher',teacherInviteInfo);
    const ATTACHMENT_PATH = path.join(process.cwd(), 'assets/Coral Academy Background.png');
   
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Use your email service provider
        auth: {
          user: 'support@coralacademy.com',
          pass: 'xcvf sxnm yctg jvte',
        },
      });


      const emailContent = `
      <html>
      <head>
        <title>Demo Registration Confirmation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
      
          .container {
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin: 0 auto;
            width: 80%;
          }
      
          h1 {
            color: #333;
            font-size: 24px;
          }
      
          p {
            color: #666;
            font-size: 16px;
            line-height: 1.6;
          }
      
        </style>
      </head>
      <body>
        <div class="container">
          <p>Hi ${teacherInviteInfo[1]},</p>
          <p>Hope you are doing well!</p>
          <p>Excited to inform you that ${teacherInviteInfo[0]} Class for ${teacherInviteInfo[6]} has been successfully scheduled!</p>
          <p>Kindly find the class Zoom link details below:</p>
          <p>Zoom Meeting Link : https://zoom.us/j/3294240234?pwd=ajdsWWlDWHpialdXUklxME1UVzVrUT09</p>
          <p>Meeting ID :  329 424 0234 </p>
          <p>Passcode : 123456</p>

          <p>Additional details : </p>

          <p>- We will let you know the final number of enrolments before class begins :)</p>
          <p>- We would request you to verify your learners by carrying out a quick live video check-in at the beginning of each class, for you to visually confirm that the learner in question is a child. The learner can then disable video after their check-in. If you’ve never seen a learner on video before, and they’re unable or unwilling to enable their video, please remove them from the class.</p>
          <p>- Kindly inform students to stay back after you exit the class post 50 minutes - We will be spending 10 minutes with the students to understand their topic preferences and availability to plan for more classes.</p>
          <p>- We have also blocked your calendar.</p>
          <p>- If possible, It would be great if you could use the Coral Academy background :) (The PNG file is attached to this mail)</p>

          <p>Please feel free to email me or text/call on (872)-222-8643 for any assistance required.</p>
          <p>Looking forward to class!</p>
          
          <p>Best,</p>
          <p>Coral Academy</p>
        
        </div>
      </body>
      </html>
      `;
      
      // Email content
      const mailOptions = {
        from: 'support@coralacademy.com', // Sender's email address
        to:teacherInviteInfo[2].split(',')[0],
        subject: `Coral Academy: Class Confirmed - ${teacherInviteInfo[0]}`,
        html:emailContent,
        attachments: [
            {
                filename: 'coral_academy_background.png',
                path: ATTACHMENT_PATH,
                cid: 'unique@coralacademy.com' // Optional content ID for embedding in the email
            }
        ],
      };
      
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent to teacher:', info.response);
        }
      });

  };
  
  module.exports = sendEmailToTeacher;