'use client';
import { useState, useRef } from 'react';

const SIZE_OPTIONS = [200, 300, 500, 1024, 1536];

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [targetSize, setTargetSize] = useState(300);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [downloadUrls, setDownloadUrls] = useState<{ url: string; name: string }[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatSize = (kb: number) => kb >= 1024 ? (kb / 1024).toFixed(1) + ' MB' : kb + ' KB';

  const handleFiles = async (incoming: FileList) => {
    const arr = Array.from(incoming).slice(0, 10);
    const converted: File[] = [];
    for (const f of arr) {
      if (f.type === 'image/heic' || f.name.toLowerCase().endsWith('.heic')) {
        const heic2any = (await import('heic2any')).default;
        const blob = await heic2any({ blob: f, toType: 'image/jpeg', quality: 0.9 });
        converted.push(new File([blob as Blob], f.name.replace(/\.heic$/i, '.jpg'), { type: 'image/jpeg' }));
      } else {
        converted.push(f);
      }
    }
    setFiles(converted);
    setStatuses([]);
    setDownloadUrls([]);
  };

  const compressImage = (file: File, limitBytes: number): Promise<{ url: string; name: string }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        let quality = 0.92;
        let width = img.width;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        const attempt = () => {
          canvas.width = width;
          canvas.height = (img.height / img.width) * width;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (!blob) return;
            if (blob.size <= limitBytes || quality < 0.05) {
              resolve({ url: URL.createObjectURL(blob), name: `compressed-${file.name.replace(/\.[^.]+$/, '.jpg')}` });
            } else {
              quality -= 0.08;
              width = width * 0.92;
              attempt();
            }
          }, 'image/jpeg', quality);
        };
        attempt();
      };
    });
  };

  const compressAll = async () => {
    if (!files.length) return;
    setIsCompressing(true);
    setDownloadUrls([]);
    const newStatuses = files.map(() => 'Waiting...');
    setStatuses([...newStatuses]);

    const results: { url: string; name: string }[] = [];
    for (let i = 0; i < files.length; i++) {
      newStatuses[i] = 'Compressing...';
      setStatuses([...newStatuses]);
      const result = await compressImage(files[i], targetSize * 1024);
      results.push(result);
      newStatuses[i] = 'Done ✅';
      setStatuses([...newStatuses]);
    }

    setDownloadUrls(results);
    setIsCompressing(false);
  };

  const downloadAll = () => {
    downloadUrls.forEach(({ url, name }) => {
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.click();
    });
  };

  return (
    <main dir="rtl" style={{ fontFamily: 'Arial', minHeight: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
      <h1 style={{ fontSize: 26, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 8 }}>🗜️ ضاغط الملفات</h1>
      <p style={{ color: '#666', marginBottom: 32 }}>اضغط حتى 10 صور دفعة واحدة بالحجم اللي تختاره</p>

      {/* Size Slider */}
      <div style={{ background: 'white', borderRadius: 12, padding: 24, width: '100%', maxWidth: 500, marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 16 }}>
          الحجم المطلوب: <span style={{ color: '#2563eb' }}>{formatSize(targetSize)}</span>
        </label>
        <input
          type="range"
          min={0}
          max={SIZE_OPTIONS.length - 1}
          step={1}
          value={SIZE_OPTIONS.indexOf(targetSize)}
          onChange={(e) => setTargetSize(SIZE_OPTIONS[+e.target.value])}
          style={{ width: '100%', accentColor: '#2563eb' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          {SIZE_OPTIONS.map((s) => (
            <span key={s} style={{ fontSize: 12, color: targetSize === s ? '#2563eb' : '#aaa', fontWeight: targetSize === s ? 'bold' : 'normal' }}>
              {formatSize(s)}
            </span>
          ))}
        </div>
      </div>

      {/* Upload Area */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files) handleFiles(e.dataTransfer.files); }}
        style={{ background: 'white', borderRadius: 12, padding: 40, width: '100%', maxWidth: 500, textAlign: 'center', border: '2px dashed #ccc', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 20 }}>
        <input ref={inputRef} type="file" accept="image/*,.heic" multiple style={{ display: 'none' }} onChange={(e) => { if (e.target.files) handleFiles(e.target.files); }} />
        {files.length > 0 ? (
          <div>
            <p style={{ fontSize: 16, fontWeight: 'bold' }}>📁 {files.length} {files.length === 1 ? 'ملف' : 'ملفات'} محددة</p>
            {files.map((f, i) => (
              <p key={i} style={{ fontSize: 13, color: '#666', margin: '2px 0' }}>
                {f.name} — {(f.size / 1024).toFixed(0)} KB
                {statuses[i] ? <span style={{ marginRight: 8, color: statuses[i] === 'Done ✅' ? '#16a34a' : '#f59e0b' }}>{statuses[i]}</span> : null}
              </p>
            ))}
          </div>
        ) : (
          <div>
            <p style={{ fontSize: 40 }}>📁</p>
            <p style={{ fontSize: 16, color: '#555' }}>اسحب وأفلت حتى 10 ملفات أو اضغط للاختيار</p>
            <p style={{ fontSize: 13, color: '#aaa' }}>JPG, PNG, WebP, HEIC مدعومة</p>
          </div>
        )}
      </div>

      {/* Compress Button */}
      {files.length > 0 && !isCompressing && downloadUrls.length === 0 && (
        <button onClick={compressAll} style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 10, padding: '14px 40px', fontSize: 17, cursor: 'pointer', marginBottom: 20, fontWeight: 'bold' }}>
          🗜️ اضغط {files.length} {files.length === 1 ? 'ملف' : 'ملفات'}
        </button>
      )}

      {isCompressing && <p style={{ color: '#f59e0b', fontWeight: 'bold', marginBottom: 20 }}>⏳ جاري الضغط...</p>}

      {/* Download All */}
      {downloadUrls.length > 0 && (
        <div style={{ background: 'white', borderRadius: 12, padding: 24, width: '100%', maxWidth: 500, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <p style={{ color: '#16a34a', fontWeight: 'bold', fontSize: 16, marginBottom: 16 }}>✅ تم ضغط جميع الملفات!</p>
          <button onClick={downloadAll} style={{ background: '#16a34a', color: 'white', border: 'none', padding: '12px 32px', borderRadius: 8, fontSize: 16, cursor: 'pointer', fontWeight: 'bold' }}>
            ⬇️ تحميل {downloadUrls.length} {downloadUrls.length === 1 ? 'ملف' : 'ملفات'}
          </button>
          <p style={{ marginTop: 12 }}>
            <span onClick={() => { setFiles([]); setDownloadUrls([]); setStatuses([]); }} style={{ color: '#2563eb', cursor: 'pointer', fontSize: 14 }}>
              + اضغط ملفات أخرى
            </span>
          </p>
        </div>
      )}
    </main>
  );
}
