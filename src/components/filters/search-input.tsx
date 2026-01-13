'use client';

import { Search, X, ScanBarcode } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../ui/input-group';
import { cn } from '@/lib/utils';
import BarcodeScanner from '../barcode-scanner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';

interface SearchInputProps {
  className?: string;
  showScanButton?: boolean;
}

export function SearchInput({
  className,
  showScanButton = false,
}: SearchInputProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const queryParam = searchParams.get('query') || '';
  const [searchValue, setSearchValue] = useState(queryParam);
  const [open, setOpen] = useState(false);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) params.set('query', term);
    else params.delete('query');

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 400);

  const handleScan = (value: string) => {
    setOpen(false);
    setSearchValue(value);
    handleSearch(value);
  };

  return (
    <div className="inline-flex gap-1">
      <InputGroup className={cn('w-full sm:max-w-60', className)}>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>

        <InputGroupInput
          type="search"
          placeholder="Buscar"
          value={searchValue}
          onChange={(e) => {
            const term = e.target.value;
            setSearchValue(term);
            handleSearch(term);
          }}
        />

        {searchValue && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              onClick={() => {
                setSearchValue('');
                handleSearch('');
              }}
            >
              <X />
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>

      {/* Scanner Dialog */}
      {showScanButton && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="icon" variant="outline">
              <ScanBarcode />
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Escanear código</DialogTitle>
              <DialogDescription>
                Enfoca el código en el centro
              </DialogDescription>
            </DialogHeader>

            <BarcodeScanner onScan={handleScan} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
