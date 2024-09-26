import React, { useRef } from 'react';
import { Camera } from 'react-camera-pro';

// Cameraインスタンスの型定義
interface CameraRef {
  takePhoto: () => string;  // takePhotoはbase64形式の画像データを返す
}

// CameraCaptureコンポーネントで受け取るプロパティの型定義
interface CameraCaptureProps {
  onImageSelect: (image: string) => void;  // 撮影した画像を親コンポーネントに渡す関数
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onImageSelect }) => {
  const camera = useRef<CameraRef | null>(null);  // CameraRef型の参照を保持

  const takePhoto = () => {
    if (camera.current) {
      const photo = camera.current.takePhoto();  // 撮影した画像（base64データ）
      onImageSelect(photo);  // 親コンポーネントに画像データを渡す
    } else {
      console.warn('カメラが準備されていません');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Camera
        ref={camera}
        aspectRatio={16 / 9}
        errorMessages={{
          noCameraAccessible: "カメラにアクセスできません。",
          permissionDenied: "カメラのアクセスが拒否されました。",
          switchCamera: "カメラの切り替えに失敗しました。",
          canvas: "カメラの描画エラーが発生しました。",
        }}  // 必須プロパティの追加
      />
      <button onClick={takePhoto} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        撮影する
      </button>
    </div>
  );
};

export default CameraCapture;
