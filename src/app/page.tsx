"use client"
import React, { useState } from 'react';
import Attendance from '@/components/Attendance';

const Home = () => {
  const [userId, setUserId] = useState<string | null>(null);  // ユーザーIDを状態として保持
  const [isSubmitted, setIsSubmitted] = useState(false);  // ユーザーIDが入力されたかを管理

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div>
      <h1>ホームページ</h1>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="userId">ユーザーIDを入力してください:</label>
          <input
            type="text"
            id="userId"
            value={userId ?? ''}
            onChange={(e) => setUserId(e.target.value)}
            className="border border-gray-300 p-2"
          />
          <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
            進む
          </button>
        </form>
      ) : (
        // AttendanceコンポーネントにuserIdを渡す
        <Attendance userId={userId} />
      )}
    </div>
  );
};

export default Home;
