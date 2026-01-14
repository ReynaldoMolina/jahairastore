'use client';

import { Search, X, ScanBarcode } from 'lucide-react';
import { useState } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../ui/input-group';
import { cn } from '@/lib/utils';
import { BarcodeScanner } from '../barcode-scanner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { useSearchQuery } from '@/hooks/use-search-query';

interface SearchInputProps {
  className?: string;
  showScanButton?: boolean;
}

export function SearchInput({
  className,
  showScanButton = false,
}: SearchInputProps) {
  const { query, setQuery } = useSearchQuery();
  const [searchValue, setSearchValue] = useState(query);
  const [open, setOpen] = useState(false);

  const handleScan = (value: string) => {
    setOpen(false);
    setSearchValue(value);
    setQuery(value);
  };

  return (
    <div className="inline-flex gap-1">
      <InputGroup className={cn('w-full md:max-w-60', className)}>
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
            setQuery(term);
          }}
        />

        {searchValue && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              onClick={() => {
                setSearchValue('');
                setQuery('');
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
            <Button variant="outline" size="icon">
              <ScanBarcode />
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Escanear producto</DialogTitle>
              <DialogDescription>
                Enfoca el código de barra en el centro
              </DialogDescription>
            </DialogHeader>

            <BarcodeScanner onScan={handleScan} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
