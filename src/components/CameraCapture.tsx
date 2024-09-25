'use client';  // クライアントコンポーネントとして宣言

import React, { useRef, useState } from 'react';
import { Camera } from 'react-camera-pro';
import axios from 'axios';

// Cameraインスタンスの型定義
interface CameraRef {
  takePhoto: () => string;  // takePhotoは画像データ（base64）を返す
}

interface CameraCaptureProps {
  userId: string;  // userIdをプロパティとして受け取る型を定義
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ userId }) => {
  const camera = useRef<CameraRef | null>(null);  // CameraRef型を持つことを明示
  const [image, setImage] = useState<string | null>(null);  // 型を明示

  const takePhoto = () => {
    if (camera.current) {  // camera.currentがnullでないことを確認
      const photo = camera.current.takePhoto();
      setImage(photo);  // base64形式の画像データを保存
    } else {
      console.warn('カメラが準備されていません');
    }
  };

  const sendImageToAPI = async () => {
    if (!image) return;

    try {
      const response = await axios.post('/api/register-attendance', {
        image: image.split(',')[1],  // base64のヘッダーを除去
        user_id: userId,  // ユーザーIDを送信
      });
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error sending image to API:', error);
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

      {image && (
        <div className="mt-4">
          <img src={image} alt="Captured" className="mb-4" />
          <button onClick={sendImageToAPI} className="bg-green-500 text-white px-4 py-2 rounded">
            APIに送信
          </button>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
