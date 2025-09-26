import { LoaderCircle } from 'lucide-react';

export default function LoadingIcon() {
  return (
    <div className="flex bg-transparent m-auto animate-spin">
      <LoaderCircle />
    </div>
  );
}
