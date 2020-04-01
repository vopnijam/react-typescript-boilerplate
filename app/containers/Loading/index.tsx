import * as React from 'react';

import { UnauthenticatedContainer } from 'components/UnauthenticatedContainer';

class Loading extends React.PureComponent {
  public render = () => (
    <UnauthenticatedContainer
      title="Loading"
      isLoading={true}
      mainContent={(
        <div>
          Loading...
        </div>
      )}
    />
  )
}

export default Loading;
