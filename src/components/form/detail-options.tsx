import { DeleteDetailButton } from '../form-element/delete-detail-button';
import { EditDetailButton } from '../form-element/edit-detail-button';

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
    <div className="inline-flex gap-1">
      <EditDetailButton href={`/${path}/${registerId}/detalle/${detailId}`} />
      <DeleteDetailButton handleDelete={() => handleDelete(detailId)} />
    </div>
  );
}
