export default function Privacy() {
  return (
    <main dir="rtl" style={{ fontFamily: 'Arial', minHeight: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
      <div style={{ background: 'white', borderRadius: 12, padding: 32, width: '100%', maxWidth: 600, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>سياسة الخصوصية</h1>

        <h2 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>جمع البيانات</h2>
        <p style={{ color: '#444', lineHeight: 1.8, marginBottom: 20 }}>
          موقع لَيَزيد لا يجمع أي بيانات شخصية من المستخدمين. لا نطلب تسجيل أو إنشاء حساب.
        </p>

        <h2 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>الملفات المرفوعة</h2>
        <p style={{ color: '#444', lineHeight: 1.8, marginBottom: 20 }}>
          جميع عمليات ضغط الصور تتم على جهازك مباشرةً داخل المتصفح. ملفاتك لا تُرفع أو تُحفظ على أي سيرفر خاص بنا. ملفاتك خاصة تماماً.
        </p>

        <h2 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>الإعلانات</h2>
        <p style={{ color: '#444', lineHeight: 1.8, marginBottom: 20 }}>
          يستخدم الموقع Google AdSense لعرض الإعلانات. قد تستخدم Google ملفات تعريف الارتباط (cookies) لعرض إعلانات مناسبة بناءً على زياراتك السابقة. يمكنك الاطلاع على سياسة خصوصية Google على موقعهم الرسمي.
        </p>

        <h2 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>ملفات تعريف الارتباط</h2>
        <p style={{ color: '#444', lineHeight: 1.8, marginBottom: 20 }}>
          يستخدم الموقع ملفات تعريف الارتباط فقط للأغراض الإعلانية عبر Google AdSense. لا نستخدم أي ملفات تعريف ارتباط لتتبع المستخدمين بشكل شخصي.
        </p>

        <h2 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>التواصل</h2>
        <p style={{ color: '#444', lineHeight: 1.8 }}>
          لأي استفسار يخص الخصوصية تواصل معنا على: <a href="mailto:charliemonkey680@gmail.com" style={{ color: '#2563eb' }}>charliemonkey680@gmail.com</a>
        </p>
      </div>
      <a href="/" style={{ marginTop: 24, color: '#2563eb', textDecoration: 'none' }}>← العودة للرئيسية</a>
    </main>
  );
}