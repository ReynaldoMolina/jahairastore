import { Info, List, Plus } from 'lucide-react';

const iconStyles = 'size-5';

const fieldsetConfig = {
  info: {
    title: 'Información',
    icon: <Info className={iconStyles} />,
  },
  moreinfo: {
    title: 'Más información',
    icon: <Info className={iconStyles} />,
  },
  detail: {
    title: 'Detalle',
    icon: <List className={iconStyles} />,
  },
  add_product: {
    title: 'Agregar productos',
    icon: <Plus className={iconStyles} />,
  },
};

interface FormFieldSetProps {
  children: React.ReactNode;
  name: keyof typeof fieldsetConfig;
}

export function FormFieldSet({ children, name }: FormFieldSetProps) {
  return (
    <fieldset className="flex flex-col gap-5">
      {/* title */}
      <span className="flex items-center gap-2 font-semibold text-sm border-b pb-2">
        {fieldsetConfig[name].icon}
        <legend>{fieldsetConfig[name].title}</legend>
      </span>
      {/* content */}
      <div className="flex flex-col gap-5">{children}</div>
    </fieldset>
  );
}
