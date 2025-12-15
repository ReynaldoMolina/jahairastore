import { Card, CardContent } from '../ui/card';

interface EmptyList {
  query?: string;
}

export default function EmptyList({ query }: EmptyList) {
  return (
    <Card className="w-full">
      <CardContent>
        <span className="text-muted-foreground text-sm block w-full text-center">
          {query ? `No hay resultados para "${query}"` : 'No hay resultados'}
        </span>
      </CardContent>
    </Card>
  );
}
