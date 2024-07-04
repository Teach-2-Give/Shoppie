import { User } from "./interfaces/user.interface";

const express = require('express');
const bodyParser = require('body-parser');
const cryptty = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

// Use body-parser middleware
app.use(bodyParser.json());

// Example User model (in-memory for simplicity)
let users: any[] = []; // This should be a proper database in a real application

app.post('/api/request-password-reset', (req: { body: { email: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    const { email } = req.body;
    const token = cryptty.randomBytes(32).toString('hex');
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).send('User not found');
    }
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour

    const transporter = nodemailer.createTransport(/* email config */);
    const mailOptions = {
        from: 'no-reply@example.com',
        to: user.email,
        subject: 'Password Reset',
        text: `You requested a password reset. Click this link to reset your password: http://localhost:4200/reset-password/${token}`
    };
    transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            return res.status(500).send('Error sending email');
        }
        res.status(200).send('Reset link sent');
    });
});

app.post('/api/reset-password', (req: { body: { token: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    const { token, password } = req.body;
    const user = users.find(user => user.resetToken === token && user.resetTokenExpiry > Date.now());
    if (!user) {
        return res.status(400).send('Invalid or expired token');
    }
    bcrypt.hash(password, 10, (err: any, hash: any) => {
        if (err) {
            return res.status(500).send('Error hashing password');
        }
        user.password = hash;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        res.status(200).send('Password reset successful');
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
