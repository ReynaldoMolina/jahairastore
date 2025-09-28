import { Card } from '../ui/card';

export default function EmptyList() {
  return (
    <Card className="inline-flex justify-center items-center text-sm text-muted-foreground">
      No hay resultados.
    </Card>
  );
}
