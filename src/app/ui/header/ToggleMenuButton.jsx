import Menu from './menu.svg';

export default function ToggleMenuButton({ setIsMenuOpen }) {
  return (
    <Menu
      className="cursor-pointer size-10 p-1 rounded-xl hover:bg-sky-100 dark:hover:bg-neutral-700"
      // onClick={() => setIsMenuOpen(state => !state)}
    />
  )
}