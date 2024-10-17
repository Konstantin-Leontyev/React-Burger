import React, { useState } from 'react';

type TUseForm<T> = {
  formData: T
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function useForm<T>(initialState: T): TUseForm<T> {
  const [formData, setFormData] = useState(initialState);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setFormData({
      ...formData,
      [event.target.name]: event.target.value}
    );
  }

  return { formData, handleOnChange };
}
