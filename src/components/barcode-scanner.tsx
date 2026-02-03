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

export function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    // 1. Expand format support to all common types
    const hints = new Map();
    const formats = [
      BarcodeFormat.QR_CODE,
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.CODE_128,
      BarcodeFormat.CODE_39,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
      BarcodeFormat.ITF,
      BarcodeFormat.DATA_MATRIX,
      BarcodeFormat.PDF_417,
    ];
    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
    // Try harder to find barcodes in low-quality frames
    hints.set(DecodeHintType.TRY_HARDER, true);

    const startScanning = async () => {
      try {
        // 2. Request better camera constraints for focus
        const videoConstraints: MediaStreamConstraints = {
          video: {
            facingMode: 'environment', // Use back camera
            width: { ideal: 1280 },
            height: { ideal: 720 },
            // Some browsers support advanced focus constraints:
            // @ts-ignore
            focusMode: { ideal: 'continuous' },
          },
        };

        await codeReader.decodeFromConstraints(
          videoConstraints,
          videoRef.current!,
          (result, err) => {
            if (result) {
              onScan(result.getText());
            }
          }
        );
      } catch (err) {
        console.error('Camera error:', err);
      }
    };

    startScanning();

    return () => {
      codeReader.reset();
    };
  }, [onScan]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-sm overflow-hidden rounded-lg bg-black aspect-square flex items-center">
        {/* 'playsInline' is vital for iOS focus and playback */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
        />
        {/* Visual Guide: helps users position the code at the right distance */}
        <div className="absolute inset-0 border-2 border-dashed border-white/30 m-12 pointer-events-none rounded" />
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Centra el código en el cuadro.
      </p>
    </div>
  );
}
