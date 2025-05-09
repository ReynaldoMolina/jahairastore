import Link from 'next/link';
import Image from 'next/image';
import Close from './close.svg';
import Logout from './logout.svg';

export default function HeaderProfile({ user, isProfileOpen, setIsProfileOpen }) {
  return (
    <div className={`flex flex-col absolute p-7 bg-white dark:bg-neutral-700 rounded-2xl justify-center items-center right-0 top-12 gap-4 shadow-sm z-1 ${isProfileOpen || "hidden"}`}>
      <button
        className="flex header-profile-close"
        type="button"
        onClick={() => setIsProfileOpen(false)}
      >
        <Close className="size-6 rounded-full items-center justify-center absolute top-2 right-2 p-1 cursor-pointer bg-neutral-200 dark:bg-neutral-600" />
      </button>
      <Image src={user.pictureUrl} alt="User picture" width={32} height={32} className="size-12 rounded-full" />
      <h2
        className='text-sm'
      >{`¡Hola, ${user.username}!`}</h2>
      <Link
        href={"/login"}
        className="flex p-2 rounded-xl bg-red-200 dark:bg-red-700 gap-2 items-center justify-center cursor-pointer"
        // type="button"
        // onClick={() => setUser({
        //   isAuthenticated: false,
        //   token: '',
        //   username: '',
        //   pictureUrl: ''
        // })}
      >
        <Logout className="logout-icon"/>
        <span className='text-sm'>Cerrar sesión</span>
      </Link>
    </div>
  );
}