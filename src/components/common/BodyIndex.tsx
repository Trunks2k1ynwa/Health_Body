import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import React from 'react';

type BodyIndexProps = {
  setValue: (val: A) => void;
  handleChangeInput: (e: any) => void;
  value: any;
  title: string;
  unit: string;
};

const BodyIndex = (props: BodyIndexProps) => {
  const { setValue, handleChangeInput, value, title, unit } = props;
  return (
    <div className='p-2 rounded-md bg-blue-50 '>
      <h3 className='font-semibold text-xl text-blue-400 text-center'>{title}</h3>
      <div className='flex justify-between gap-x-2'>
        <Button
          onClick={() => setValue((age: number) => age - 1)}
          variant='outline'
          size={'icon'}
          className='rounded-full border-blue-300 border'
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-4'>
            <path
              fillRule='evenodd'
              d='M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z'
              clipRule='evenodd'
            />
          </svg>
        </Button>
        <Input
          onChange={handleChangeInput}
          value={value}
          type='number'
          className='border-none max-w-20 font-bold text-2xl text-center focus-visible:border-none'
        />
        <Button
          onClick={() => setValue((age: number) => age + 1)}
          variant='outline'
          size={'icon'}
          className='rounded-full border-blue-300 border'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-4'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </Button>
      </div>
      <span className='text-center text-xs inline-block w-full'>{unit}</span>
    </div>
  );
};

export default BodyIndex;
