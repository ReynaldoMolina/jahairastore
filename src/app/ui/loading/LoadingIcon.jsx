import LoadingSvg from '@/app/ui/loading/loading.svg';

export default function LoadingIcon() {
  return (
    <div className="flex bg-transparent m-auto animate-spin">
      <LoadingSvg />
    </div>
  );
}
