import React from 'react';
import CameraCapture from '@/components/CameraCapture';  // カメラキャプチャコンポーネントを使用

interface AttendanceProps {
  userId: string | null;  // propsでユーザーIDを受け取る
}

const Attendance: React.FC<AttendanceProps> = ({ userId }) => {
  if (!userId) {
    return <p>ユーザーIDが見つかりません。最初にIDを入力してください。</p>;
  }

  return (
    <div>
      <h2>出席登録</h2>
      <p>ユーザーID: {userId}</p>
      {/* CameraCaptureコンポーネントにuserIdを渡す */}
      <CameraCapture userId={userId} />
    </div>
  );
};

export default Attendance;
