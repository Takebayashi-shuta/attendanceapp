"use client";  // クライアントサイドで動作するコンポーネント

import React from 'react';
import RegisterAttendance from '@/components/Attendance';  // 正しいパスに合わせてインポート

const AttendancePage: React.FC = () => {
  return (
    <div>
      <RegisterAttendance />
    </div>
  );
};

export default AttendancePage;
