import { MoreVertical } from 'lucide-react';
import { DeleteDetailButton } from '../form-elements/delete-detail-button';
import { EditDetailButton } from '../form-elements/edit-detail-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

interface DetailOptionsProps {
  path: string;
  registerId: number;
  detailId: number;
  handleDelete: (productId: number) => void;
}

export function DetailOptions({
  path,
  registerId,
  detailId,
  handleDelete,
}: DetailOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <EditDetailButton
            href={`/${path}/${registerId}/detalle/${detailId}`}
          />
          <DeleteDetailButton handleDelete={() => handleDelete(detailId)} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
