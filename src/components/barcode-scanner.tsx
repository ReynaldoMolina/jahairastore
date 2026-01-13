'use client';
import { useEffect, useRef } from 'react';
import {
  BrowserMultiFormatReader,
  BarcodeFormat,
  DecodeHintType,
} from '@zxing/library';

interface BarcodeScannerProps {
  onScan: (value: string) => void;
}

export default function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.EAN_13,
      BarcodeFormat.UPC_A,
      BarcodeFormat.CODE_128,
    ]);

    // Function to start scanning
    const startScanning = () => {
      codeReader
        .decodeFromVideoDevice(null, videoRef.current!, (result, err) => {
          if (result) {
            onScan(result.getText());
            // Keep scanning after a successful scan
            // Remove the following line if you want to stop after the first scan
            // decodeFromVideoDevice automatically stops after a successful scan
            startScanning();
          }
        })
        .catch((err) => console.error('Error al iniciar la cámara:', err));
    };

    startScanning();

    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-full items-center max-w-sm overflow-hidden rounded-lg bg-black">
        <video ref={videoRef} className="w-full h-auto" />
      </div>
    </div>
  );
}
