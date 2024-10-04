"use client";  // クライアントサイドで動作するコンポーネント

import React, { useState } from 'react';
import RegisterUser from '@/components/Register';

const NewRegisterPage: React.FC = () => {
  const [message, setMessage] = useState<string>('');  // メッセージ用のステート

  const handleRegisterComplete = (message: string) => {
    setMessage(message);  // 新規登録完了時のメッセージをステートにセット
  };

  return (
    <div>
      <RegisterUser onRegisterComplete={handleRegisterComplete} />  {/* 必須プロパティを渡す */}
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}  {/* メッセージ表示 */}
    </div>
  );
};

export default NewRegisterPage;
