// src/components/UserIdInput.tsx
import React from 'react';

interface UserIdInputProps {
  userId: string;
  onUserIdChange: (id: string) => void;
}

const UserIdInput: React.FC<UserIdInputProps> = ({ userId, onUserIdChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="userId" className="block text-gray-700 text-sm font-bold mb-2">
        ユーザーID:
      </label>
      <input
        type="text"
        id="userId"
        value={userId}
        onChange={(e) => onUserIdChange(e.target.value)}
        placeholder="ユーザーIDを入力"
        className="border border-gray-300 p-2 rounded w-full"
      />
    </div>
  );
};

export default UserIdInput;
