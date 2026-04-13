export default function Contact() {
  return (
    <main dir="rtl" style={{ fontFamily: 'Arial', minHeight: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
      <div style={{ background: 'white', borderRadius: 12, padding: 32, width: '100%', maxWidth: 600, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center' }}>
        <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>تواصل معنا</h1>
        <p style={{ color: '#444', lineHeight: 1.8, marginBottom: 24 }}>
          عندك سؤال أو اقتراح؟ يسعدنا نسمع منك!
        </p>
        <a href="mailto:charliemonkey680@gmail.com" style={{ background: '#2563eb', color: 'white', padding: '14px 32px', borderRadius: 10, textDecoration: 'none', fontWeight: 'bold', fontSize: 16 }}>
          📧 charliemonkey680@gmail.com
        </a>
      </div>
      <a href="/" style={{ marginTop: 24, color: '#2563eb', textDecoration: 'none' }}>← العودة للرئيسية</a>
    </main>
  );
}