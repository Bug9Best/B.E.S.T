import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "64070146@it.kmitl.ac.th",
        pass: "avudwzjgnmutfkag",
    },
});

export const onEnroller = async (email, fullname, course) => {
    try {
        let info = await transporter.sendMail({
            from: "Developer of B.E.S.T. Project", // sender address
            to: email,
            subject: "การลงทะเบียนเข้าคอร์สเรียน 👻 👻", // Subject line
            html:
                `
                <html lang="en">
                <head>
                    <style>
                        .container {
                            width: 100%;
                            display: flex;
                            justify-content: center;
                        }

                        .card {
                            padding: 2rem;
                            width: 25rem;
                            background-color: #ededed;
                            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                            border-radius: 8px;
                        }

                        .card-title {
                            font-size: 1.5rem;
                            text-align: center;
                        }
                        .content {
                            margin-top: 1rem;
                            font-size: 1rem;
                        }

                        .text-footer {
                            margin-top: 2rem;
                            text-align: center;
                            font-size: 0.8rem;
                            color: gray;
                        }
                    </style>
                </head>

                <body>
                    <div class="container">
                        <div class="card">
                            <div class="card-title">สวัสดี</div>
                            <div class="content">
                                คุณ <b> ${fullname} </b> ได้ทำการลงทะเบียนเข้าคอร์สเรียน <b> ${course} </b> สำเร็จแล้ว!!!
                            </div>
                            <div class="text-footer">อีเมลนี้ถูกส่งด้วยระบบอัตโนมัติ กรุณาอย่าตอบกลับอีเมลนี้</div>
                        </div>
                    </div>
                </body>
            </html>
            `,
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error);
    }
}



