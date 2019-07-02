class Utilities {

  UpdateContacts(contacts) {
    console.log('Update Contacts Hit')
  }



//Once Emails are triggered to be sent use:  Utilities.SendEmail(email);

  SendEmail(contact) {
    "use strict";
    const nodemailer = require("nodemailer");

    // async..await is not allowed in global scope, must use a wrapper
    //async function main() {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      // port: 587,
      // secure: false, // true for 465, false for other ports
      port: 465,
      secure: true,
      proxy: 'http://fisProxy:1234',
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
      }
    });

        // setup e-mail data with unicode symbols
        var mailOptions = {
          from: '"FIS_Connected 👻" <connected@fisglobal.com>', // sender address
          to: `${contact}, baz@example.com`, // list of receivers
          subject: "FIS_Connected ✔", // Subject line
          text: "Connect with your contact Tom Petty!", // plain text body
          html: "<b>Connect with your contact Tom Petty!</b>" // html body
      };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);


    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
   // }

    main().catch(console.error);

  }
}

module.exports = {
  Utilities: Utilities
}


