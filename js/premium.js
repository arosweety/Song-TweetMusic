// PAYMENT HANDLER
const qrModal = document.getElementById('qrModal');
const qrImg = document.getElementById('qrCode');
const closeBtn = document.querySelector('.close');

function pay(plan){
    const upiLinks = {
        'basic':'upi://pay?pa=yourupiid@upi&pn=MuSiCTwEEt&am=99&cu=INR',
        'pro':'upi://pay?pa=yourupiid@upi&pn=MuSiCTwEEt&am=149&cu=INR',
        'family':'upi://pay?pa=yourupiid@upi&pn=MuSiCTwEEt&am=249&cu=INR'
    };
    const qrCodes = {
        'basic':'img/qr-basic.png',
        'pro':'img/qr-pro.png',
        'family':'img/qr-family.png'
    };

    if(/Mobi|Android/i.test(navigator.userAgent)){
        window.location.href = upiLinks[plan];
    } else {
        qrImg.src = qrCodes[plan];
        qrModal.style.display = 'block';
    }
}

closeBtn.onclick = () => qrModal.style.display='none';
window.onclick = e => { if(e.target==qrModal) qrModal.style.display='none'; }

// FAQ Accordion
document.querySelectorAll('.faq-item button').forEach(btn => {
    btn.addEventListener('click', ()=>{
        const item = btn.parentElement;
        item.classList.toggle('active');
    });
});