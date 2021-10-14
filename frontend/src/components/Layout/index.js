import { useState } from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="max-w-3xl mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
