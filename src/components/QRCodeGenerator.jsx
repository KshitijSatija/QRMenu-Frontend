import { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = ({ url }) => {
  const qrRef = useRef();

  const downloadQR = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const pngUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = 'menu_qr_code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white mt-8">
      <h2 className="text-lg font-semibold mb-4">Your Menu QR Code</h2>

      {url ? (
        <div ref={qrRef} className="flex flex-col items-center">
          <QRCodeCanvas value={url} size={200} />
          <button
            onClick={downloadQR}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Download QR Code
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Submit the menu to generate a QR code.</p>
      )}
    </div>
  );
};

export default QRCodeGenerator;
