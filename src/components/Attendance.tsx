import React, { useState } from "react";
import CameraCapture from "./CameraCapture";  // CameraCaptureの正しいパス
import UserIdInput from "./UserIdInput";

const RegisterAttendance: React.FC = () => {
  const [userId, setUserId] = useState<string>('');  // ユーザーIDのステート管理
  const [image, setImage] = useState<string | null>(null);  // 画像データのステート管理
  const [message, setMessage] = useState<string>('');  // メッセージ表示用ステート

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!image || !userId) {
      setMessage('画像とユーザーIDの両方が必要です');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register-attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          image: image.split(',')[1], // base64データ部分だけを送信
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || 'エラーが発生しました');
      }
    } catch (error) {
      setMessage('サーバーとの通信中にエラーが発生しました');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">出席登録</h1>
      <form onSubmit={handleSubmit}>
        {/* ユーザーID入力コンポーネント */}
        <UserIdInput userId={userId} onUserIdChange={setUserId} />
      
        {/* カメラキャプチャコンポーネント */}
        <CameraCapture onImageSelect={setImage} />

        <button 
          type="submit" 
          className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          送信
        </button>

        {/* メッセージ表示 */}
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default RegisterAttendance;
