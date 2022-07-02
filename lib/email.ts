import sgMail from "@sendgrid/mail";
import { IEmailParams } from "../interface/email";

sgMail.setApiKey(process.env?.SHOEB_ILYAS_APP_KEY || "");

export const sendNewSubscriberEmail = ({ to, name, id }: IEmailParams) => {
  const msg = {
    to, // Change to your recipient
    from: "shoebilyas432@gmail.com", // Change to your verified sender
    subject: "Newsletter subscription!",
    text: "and easy to do anywhere, even with Node.js",
    html: `
    <!DOCTYPE html>
<html lang="en">

    <body style="width:768px !important;">
      <!-- <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"></td> -->
      <table
        style="
          width: 100% !important;
          font-family: 'Courier New', Courier, monospace;
          padding: 8em;
          padding-bottom: 0em;
        "
      >
        <tr style="text-align: center; color: #2e2942; font-size: 50px">
          <td><h1>Thank You!</h1></td>
        </tr>
      </table>

      <table
        style="
          width: 100% !important;
          text-align: center;
          font-size: 3em;
          padding: 2em;
          padding-top: 1em;
          font-family: 'Courier New', Courier, monospace;
        "
      >
        <tr style="text-align: center; color: #292929">
          <td>
            <h4>
              Hi ${name}. Thanks for subscribing to my newsletter! You will
              stay upto date with my latest articles. Enjoy reading ;)
            </h4>
          </td>
        </tr>
        <tr></tr>
      </table>
      <table
        style="
          width: 100% !important;
          text-align: center;
          font-size: 1em;
          padding: 1em;
          background: linear-gradient(-45deg, #eb5757, #f2994a);
          padding-top: 1em;
          font-family: 'Courier New', Courier, monospace;
        "
      >
        <tr style="text-align: center; color: rgb(221, 221, 221)">
          <td>
            <h4>
              You can
              <a href="${`https://shoebilyas-writes.vercel.app/unsubscribe/${name
                .replaceAll(" ", "-")
                .toLowerCase()}-${id}`}" style="color: beige" target="_blank"
                >Unsubscribe</a
              >
              here.
            </h4>
          </td>
        </tr>
        <tr></tr>
      </table>
  </body>
</html>
`,
  };

  sgMail
    .send({
      ...msg,
    })
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
      console.error(error.body);
    });
};

export const sendUnsubscribeEmail = ({ to, name }: IEmailParams) => {
  console.log({ to, name });
  const msg = {
    to, // Change to your recipient
    from: "shoebilyas432@gmail.com", // Change to your verified sender
    subject: "Newsletter unsubscribe confirmation!",
    text: "and easy to do anywhere, even with Node.js",
    html: `<strong>Hi ${name}. I am sorry to see you go. You have been unsubscribed from my articles. Keep reading :).</strong>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
