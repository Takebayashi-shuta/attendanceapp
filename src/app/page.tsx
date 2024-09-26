"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

const Home = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/attendance');  // /attendance に遷移
  };

  return (
    <div>
      <h1>ホームページ</h1>
      <Button onClick={handleButtonClick}>出席ページへ</Button>
    </div>
  );
};

export default Home;
