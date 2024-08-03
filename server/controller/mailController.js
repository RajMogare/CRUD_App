import nodemailer from 'nodemailer';

const sendMail = async (req, res) => {
    const { users, recipient } = req.body;

    if (!users || !recipient) {
        return res.status(400).json({ msg: 'Users and recipient email required' });
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: 'shayna.parker@ethereal.email',
            pass: 'TnFVubK61X1YMRgYH2'
        },
    });

    // Generate HTML content for email
    const userDetails = users.map(user => `
        <tr>
            <td>${user.fname}</td>
            <td>${user.phoneNumber}</td>
            <td>${user.email}</td>
            <td>${user.hobbies}</td>
        </tr>
    `).join('');

    const mailOptions = {
        from: '"Sender Name" <shayna.parker@ethereal.email>', // sender address
        to: recipient, // list of receivers
        subject: "Selected User Records", // Subject line
        html: `
            <h1>Selected User Records</h1>
            <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Hobbies</th>
                    </tr>
                </thead>
                <tbody>
                    ${userDetails}
                </tbody>
            </table>
        `, // html body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        res.json({ msg: 'Email sent successfully' });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ msg: 'Failed to send email' });
    }
};

export { sendMail };
