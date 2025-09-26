import { KeyRound, User } from 'lucide-react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Control } from 'react-hook-form';
import { LoginUserType } from '@/types/types';

const icons = {
  username: <User className="size-5 absolute ml-3 text-muted-foreground" />,
  password: <KeyRound className="size-5 absolute ml-3 text-muted-foreground" />,
  redirectTo: <></>,
};

type IconsType = keyof typeof icons;

interface LoginInputProps {
  control: Control<LoginUserType>;
  name: IconsType;
  label: string;
  placeholder?: string;
  type?: string;
  hidden?: boolean;
}

export default function LoginInput({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  hidden = false,
}: LoginInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem hidden={hidden}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex relative w-full items-center">
              {icons[name]}
              <Input
                className="pl-10"
                placeholder={placeholder ?? label}
                type={type}
                {...field}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
