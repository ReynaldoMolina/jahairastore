import { Card, CardContent } from '../ui/card';

export default function EmptyList({ query }) {
  return (
    <Card className="w-full">
      <CardContent>
        <span className="text-muted-foreground text-xs block w-full text-center">{`No hay resultados para "${query}"`}</span>
      </CardContent>
    </Card>
  );
}
