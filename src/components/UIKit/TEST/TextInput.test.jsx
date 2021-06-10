import React from 'react';
import { render, screen } from '@testing-library/react';
import TextInput from '../TextInput';

test('TextInput test', () => {
  const { getByText, getByDisplayValue  } = render(<TextInput fullWidth={true} 
    label={'お名前'} multiline={false} rows={1} required={true} value={'秋山'} 
    type={'text'} onChange={() => {}}/>
  );
  const element = screen.getByText(/お名前/i);
  const input = screen.getByDisplayValue(/秋山/i);
  expect(element).toBeInTheDocument();
  expect(input).toBeInTheDocument();
});