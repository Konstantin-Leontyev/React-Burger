import React from 'react';

import { Modal } from '../modal';
import { RingLoader } from 'react-spinners';

export function ModalPreloader({ title }: { title: string }) {

  return (
    <Modal
      title={title}
      closeIcon={false}
    >
      <div className="mt-20 mb-30">
        <RingLoader color="#4c4cff" size="200px" />
      </div>
    </Modal>
  );
}
