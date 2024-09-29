"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

const Home = () => {
  const router = useRouter();

  const attendancePage = () => {
    router.push('/attendance');  // /attendance に遷移
  };
  const newRegisterPage = () => {
    router.push('/register');
  };

  return (
    <div>
      <h1>ホームページ</h1>
      <div>
        <Button onClick={attendancePage}>出席ページへ</Button>
        <Button onClick={newRegisterPage}>新規登録ページへ</Button>
      </div>
      
    </div>
  );
};

export default Home;
