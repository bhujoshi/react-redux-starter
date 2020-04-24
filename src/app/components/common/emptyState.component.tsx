import React from 'react';
import { Center } from '../../components';

export const EmptyState = () => (
  <div>
    <Center>
      <br />
      <img
        src={
          'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/empty-data.png'
        }
        alt="no-data-available"
      />
      <p>
        It seems that no data is available for now. Please refresh/get <br />
        in touch with your Account Manager if problem still persists.
      </p>
      <br />
    </Center>
  </div>
);
