const nodemailer = require("nodemailer");
const sparkPostTransporter = require("nodemailer-sparkpost-transport");
const path = require("path");
const pug = require("pug");


class Email {
  constructor() {

    this.from = "Dyma projects &#60;no-reply@dyma-projects.site>";
    this.sparkPostApiKey = process.env.SPARK_POST_API_KEY;
    this.endpoint = process.env.SPARK_POST_API_ENDPOINT;
    this.host = process.env.NODEMAILER_API_HOST;
    this.user = process.env.NODEMAILER_API_USER;
    this.password = process.env.NODEMAILER_API_PASSWORD;

    if (process.env.NODE_ENV === "production") {
      this.transporter = nodemailer.createTransport(
        sparkPostTransporter({
          sparkPostApiKey: this.sparkPostApiKey,
          endpoint: this.endpoint
        })
      );
    } else {
      this.transporter = nodemailer.createTransport({
        host: this.host,
        port: 2525,
        auth: {
          user: this.user,
          pass: this.password
        }
      });
    }
  }

  async sendEmailVerification(options) {
    try {
      const email = {
        from: this.from,
        subject: "Email verification",
        to: options.to,
        html: pug.renderFile(
          path.join(__dirname, "templates/email-verification.pug"),
          {
            username: options.username,
            url: `https://${options.host}/users/email-verification/${options.userId}/${options.token}`
          }
        )
      };
      const response = await this.transporter.sendMail(email);
      console.log(response);
    } catch (e) {
      throw e;
    }
  }

  async sendResetPasswordLink(options) {
    try {
      const email = {
        from: this.from,
        subject: "Password reset",
        to: options.to,
        html: pug.renderFile(
          path.join(__dirname, "templates/password-reset.pug"),
          {
            url: `https://${options.host}/users/reset-password/${options.userId}/${options.token}`
          }
        )
      };
      const response = await this.transporter.sendMail(email);
      console.log('response from sendResetPasswordLink =', response);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new Email();