"use client";  // クライアントサイドで動作するコンポーネント

import React, { useState } from "react";
import CameraCapture from './CameraCapture';
import UserIdInput from './UserIdInput';

interface RegisterUserProps {
  onRegisterComplete?: (message: string) => void;  // オプショナルに変更
}

const RegisterUser: React.FC<RegisterUserProps> = ({ onRegisterComplete }) => {
  const [userId, setUserId] = useState<string>('');  
  const [image, setImage] = useState<string | null>(null);  
  const [message, setMessage] = useState<string>('');  

  const handleRegisterUser = async () => {
    if (!image || !userId) {
      setMessage('画像とユーザーIDの両方が必要です');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register-face', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          image: image.split(',')[1],  // base64データ部分のみ送信
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('新規ユーザーが登録されました');
        if (onRegisterComplete) {  // if文でonRegisterCompleteが存在するか確認
          onRegisterComplete('新規ユーザーが登録されました');
        }
      } else {
        setMessage(data.error || 'エラーが発生しました');
      }
    } catch (error) {
      setMessage('サーバーとの通信中にエラーが発生しました');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">新規ユーザー登録</h1>
      <UserIdInput userId={userId} onUserIdChange={setUserId} />
      <CameraCapture onImageSelect={setImage} />

      <button 
        onClick={handleRegisterUser} 
        className="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded"
      >
        新規登録
      </button>

      {/* メッセージ表示 */}
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default RegisterUser;
