import Username from '@/app/ui/icons/username.svg';
import Password from '@/app/ui/icons/password.svg';

const icons = {
  username: <Username className='size-5 ml-3' />,
  password: <Password className='size-5 ml-3' />,
};

export default function LoginInput({name, placeholder, type = 'text' }) {
  return (
    <div
      className="flex justify-center items-center bg-white dark:bg-neutral-800 rounded-lg shadow-sm focus-within:outline-1 focus-within:outline-neutral-500 dark:focus-within:outline-neutral-400 hover:outline hover:outline-neutral-500 dark:hover:outline-neutral-400">
      {icons[name]}
      <input
        type={type}
        name={name}
        className=" border-none text-black dark:text-white h-10 px-3 w-full focus-within:outline-none text-sm"
        placeholder={placeholder}
        required
        autoComplete='off'
        ></input>
    </div>
  );
};