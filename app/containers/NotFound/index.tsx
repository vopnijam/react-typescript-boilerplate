import * as React from 'react';

import { UnauthenticatedContainer } from 'components/UnauthenticatedContainer';

class NotFound extends React.PureComponent {
  public render = () => (
    <UnauthenticatedContainer
      title="404"
      subtitle="Page not found"
      isLoading={false}
      mainContent={(
        <div>
          We're sorry but the page you are looking for could not be found
        </div>
      )}
    />
  )
}

export default NotFound;
