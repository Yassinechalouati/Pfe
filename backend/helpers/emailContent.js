
const generateLearnerEmailHtml = (verificationUrl) => {
    return `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; font-family: 'Nunito'; background-color: #F9F4F0;">
        <table style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <tr>
                <td style="background-color: #F28585; height: 85px; font-weight: bold; color: white; border-top-left-radius: 10px; border-top-right-radius: 10px; font-size: 25px; text-align: center;">Welcome to Linguify!</td>
            </tr>
            <tr>
                <td style="background-color: white; padding: 20px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                    <img src="https://i.imgur.com/n85QHTn.png" alt="confettis" style="display: block; margin: 0 auto; width: 200px; height: 200px;">
                    <p style="margin-top: 50px; font-size: 19px; font-weight: bold; text-align: left;">Hey Knowledge Seeker,</p>
                    <p style="margin-top: 10px; color: #767676; font-size: 16px; text-align: left;">Congratulations on taking the first step towards mastering a new language! 🎉 Get ready to embark on an exciting journey filled with words, culture, and connections. Your language adventure starts now! Happy learning! 🚀</p>
                    <p style="margin-top: 35px; font-size: 16px; text-align: center;"><a href="${verificationUrl}" target="_blank" style="padding: 10px 20px; background-color: #F28585; border-radius: 10px; text-decoration: none; color: white;">Verify Email</a></p>
                </td>
            </tr>
        </table>
    </body>`;
};

const generateTutorEmailHtml = (verificationUrl) => {
    return `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; font-family: 'Nunito'; background-color: #F9F4F0;">
    <table style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <tr>
    <td style="background-color: #F28585; padding:0; height: 85px; font-weight: bold; color: white; border-top-left-radius: 10px; border-top-right-radius: 10px; font-size: 25px; text-align: center;">Welcome to Linguify!</td>
    </tr>
    <tr>
    <td style="background-color: white; padding: 20px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
    <img src="https://i.imgur.com/n85QHTn.png" alt="confettis" style="display: block; margin: 0 auto; width: 200px; height: 200px;">
    <p style="margin-top: 50px; font-size: 19px; font-weight: bold; text-align: left;">Hey language enthusiast,</p>
    <p style="margin-top: 10px; color: #767676; font-size: 16px; text-align: left;">Welcome aboard 🌍, You're now part of our dynamic community of educators dedicated to shaping linguistic journeys. Your expertise will inspire learners and foster connections. Let's empower individuals to thrive in a world of diverse languages and cultures. Happy teaching! 📚🌟</p>
    <p style="margin-top: 35px; font-size: 16px; text-align: center;"><a href="${verificationUrl}" target="_blank" style="padding: 10px 20px; background-color: #F28585; border-radius: 10px; text-decoration: none; color: white;">Verify Email</a></p>
    </td>
    </tr>
    </table>
    </body>`
}

const generateForgotPasswordHtml = (forgotPasswordUrl) => {
    retun `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; font-family: 'Nunito'; background-color: #F9F4F0;">
    <table style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="background-color: #F28585; height: 85px; font-weight: bold; color: white; border-top-left-radius: 10px; border-top-right-radius: 10px; font-size: 25px; text-align: center;">Welcome to Linguify!</td>
        </tr>
        <tr>
            <td style="background-color: white; padding: 20px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                <img src="https://i.imgur.com/uL6IHem.png" alt="confettis" style="display: block; margin: 0 auto; width: 250px; height: 250px;">
                <p style="margin-top: 50px; font-size: 19px; font-weight: bold; text-align: center;">Password Change Request</p>
                <p style="margin-top: 10px; color: #767676; font-size: 16px; text-align: center;">You have requested to reset your password for your account with Linguify.</p>
                <p style="margin-top: 10px; color: #767676; font-size: 16px; text-align: center;">If you did not request this password reset, please ignore this email. Your password will remain unchanged.</p>
                <p style="margin-top: 10px; color: #767676; font-size: 16px; text-align: center;"> To proceed with the password reset, please click on the following Button:</p>
                <p style="margin-top: 35px; font-size: 16px; text-align: center;"><a href="${forgotPasswordUrl}" target="_blank" style="padding: 10px 20px; background-color: #F28585; border-radius: 10px; text-decoration: none; color: white;">Reset Password</a></p>
            </td>
        </tr>
    </table>
</body>`
}

module.exports = {
    generateTutorEmailHtml,
    generateLearnerEmailHtml,
    generateForgotPasswordHtml
}
