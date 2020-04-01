import * as React from 'react';

import { unicodeEscape } from 'utils/converter';

import { UnauthenticatedContainer } from 'components/UnauthenticatedContainer';

class Maintenance extends React.PureComponent {
  public render = () => (
    <UnauthenticatedContainer
      title="Maintenance"
      subtitle="Be right back!"
      isLoading={false}
      mainContent={(
        <div>
          We{unicodeEscape.singleQuote}re upgrading our systems.<br />Please try again shortly.
        </div>
      )}
    />
  )
}

export default Maintenance;
