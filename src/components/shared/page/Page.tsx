import React from 'react';

const Page = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return <div className='full-page-wrapper'>{children}</div>;
};

export default Page;
