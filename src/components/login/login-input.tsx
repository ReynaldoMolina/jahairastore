import { useState } from 'react';
import { KeyRound, User } from 'lucide-react';

const icons = {
  username: <User className="size-5 ml-3" />,
  password: <KeyRound className="size-5 ml-3" />,
};

export function LoginInput({ name, placeholder, type = 'text' }) {
  const [input, setInput] = useState('');
  return (
    <div className="flex w-full justify-center items-center bg-white dark:bg-neutral-800 rounded-lg shadow-sm focus-within:outline-1 focus-within:outline-neutral-500 dark:focus-within:outline-neutral-400 hover:outline hover:outline-neutral-500 dark:hover:outline-neutral-400">
      {icons[name]}
      <input
        type={type}
        name={name}
        className=" border-none text-black dark:text-white h-10 px-3 w-full focus-within:outline-none text-sm"
        placeholder={placeholder}
        required
        autoComplete="off"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      ></input>
    </div>
  );
}
