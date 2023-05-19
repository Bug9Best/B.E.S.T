import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.createMany({
        data: [
            {
                id: 1,
                username: "bundit",
                password: "bundit",
                email: "bundit@it.kmitl.ac.th",
                fullname: "ผศ.ดร.บัณฑิต ฐานะโสภณ",
                generation: "2563",
                degree: "Ph.D.",
                role: "Staff",
            },
            {
                id: 2,
                username: "boonprasert",
                password: "boonprasert",
                email: "boonprasert@it.kmitl.ac.th",
                fullname: "ผศ.ดร.บุญประเสริฐ สุรักษ์รัตนสกุล",
                generation: "2563",
                degree: "Ph.D.",
                role: "Staff",
            },
            {
                id: 3,
                username: "pattarachai",
                password: "pattarachai",
                email: "pattarachai@it.kmitl.ac.th",
                fullname: "ผศ.ดร.ภัทรชัย ลลิตโรจน์วงศ์",
                generation: "2563",
                degree: "Ph.D.",
                role: "Staff",
            },
            {
                id: 4,
                username: "kanokwan",
                password: "kanokwan",
                email: "kanokwan@it.kmitl.ac.th",
                fullname: "ผศ.ดร.กนกวรรณ อัจฉริยะชาญวณิช",
                generation: "2563",
                degree: "Ph.D.",
                role: "Staff",
            },
            {
                id: 5,
                username: "teerapong",
                password: "teerapong",
                email: "teerapong@it.kmitl.ac.th",
                fullname: "ผศ.ดร.ธีรพงศ์ ลีลานุภาพ",
                generation: "2563",
                degree: "Ph.D.",
                role: "Staff",
            },
        ]
    });

    await prisma.course.createMany({
        data: [
            {
                id: 1,
                code: "06016322",
                title: "WEB PROGRAMMING",
                description: "การพัฒนาไดนามิกเว็บเพจ โพรโทคอลเอชทีทีพี แม่ข่ายเว็บ การพัฒนาโปรแกรมเว็บฝั่งแม่ข่าย การจัดการคุ้กกี้ การติดตามเซสชัน การพัฒนาโปรแกรมเว็บติดต่อกับฐานข้อมูล จาวาสคริปต์และเทคโนโลยีเอ แจ๊กซ์",
            },
            {
                id: 2,
                code: "06016306",
                title: "INFORMATION SYSTEMS ANALYSIS AND DESIGN",
                description: "การพัฒนาระบบเชิงอ็อบเจกต์ การวิเคราะห์และออกแบบ การเลือกโครงการและการจัดการ โครงการสารสนเทศ กำหนดความต้องการระบบ การวิเคราะห์ด้วยยูสเคส แบบจำลองกระบวนการ แบบจำลองข้อมูล การออกแบบสถาปัตยกรรมและกลยุทธการออก การออกแบบส่วนติดต่อกับผู้ใช้ การออกแบบส่วนจัดเก็บข้อมูล การออกแบบโปรแกรม คลาสและเมธอด การสร้างและการติดตั้งระบบ",
            },
            {
                id: 3,
                code: "06016308",
                title: "DATABASE SYSTEM CONCEPT",
                description: "แนะนำฐานข้อมูลและระบบจัดการฐานข้อมูล ระบบแฟ้มข้อมูล ระบบฐานข้อมูลและสภาพ แวดล้อม ระบบจัดการฐานข้อมูล ชนิดของฐานข้อมูล แบบจำลองข้อมูล แบบจำลองฐานข้อมูลเชิงสัมพันธ์ ตาราง คีย์ กฎบูรณภาพ พจนานุกรมข้อมูล แบบจำลองความสัมพันธ์ระหว่างเอนทิตี นอร์มัลไลซ์เซชัน เอสคิวแอล แนะนำการจัดการทรานแซคชันและการบริหารฐานข้อมูล ปฏิบัติการด้านการจำลองข้อมูลและภาษาฐานข้อมูล แนะนำข้อมูลสนันสนุนการตัดสินใจสำหรับระดับบริหารและระบบคลังข้อมูล",
            },
            {
                id: 4,
                code: "06016321",
                title: "SOFTWARE ENGINEERING",
                description: "ความรู้เบื้องต้นเกี่ยวกับวิศวกรรมซอฟต์แวร์ กลุ่มซอฟต์แวร์และแนวโน้มความเปลี่ยนแปลง กรอบงานของกระบวนการวิศวกรรมซอฟต์แวร์ กระบวนการพัฒนาซอฟต์แวร์แบบอไจล์ แม่แบบสำหรับการ ออกแบบ วิธีปฏิบัติด้านวิศวกรรมซอฟต์แวร์ สภาพแวดล้อมการพัฒนาซอฟต์แวร์โดยใช้เวอร์ชั่นคอนโทรล แบบจำลองวุฒิภาวะและความสามารถเชิงบูรณาการ (ซีเอ็มเอ็มไอ) วิศวกรรมความต้องการ วิศวกรรมการวิเคราะห์และออกแบบ ความรู้เบื้องต้นเกี่ยวกับการทดสอบซอฟต์แวร์ กระบวนการยูนิฟาย์ การประเมินกระบวนการ และแบบจำลองกระบวนการเชิงบัญญัติและเชิงวิวัฒน์",
            }
        ]
    });

    await prisma.ownerCourse.createMany({
        data: [
            {
                id: 1,
                courseId: 1,
                userId: 1
            },
            {
                id: 2,
                courseId: 2,
                userId: 2
            },
            {
                id: 3,
                courseId: 3,
                userId: 3
            },
            {
                id: 4,
                courseId: 3,
                userId: 4
            },
            {
                id: 5,
                courseId: 4,
                userId: 5
            }
        ]
    });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
    })