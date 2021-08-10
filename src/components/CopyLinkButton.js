import React, { useState } from 'react';
import copy from 'clipboard-copy';

import { Image, Button, Alert } from 'react-bootstrap';
import ShareIcon from '../images/shareIcon.svg';

function CopyLinkButton() {
  const [linkCopied, setLinkCopied] = useState(false);

  function handleCopyLink() {
    const url = window.location.href
      .split('/')
      .filter((part) => part !== 'in-progress')
      .join('/');

    copy(url);
    setLinkCopied(true);

    const TWO_SECONDS = 2000;
    setTimeout(() => {
      setLinkCopied(false);
    }, TWO_SECONDS);
  }

  if (linkCopied) {
    return (
      <Alert
        variant="success"
        style={ {
          fontSize: '14px',
        } }
      >
        Link copiado!
      </Alert>
    );
  }

  return (
    <Button
      data-testid="share-btn"
      variant="link"
      onClick={ handleCopyLink }
    >
      <Image
        fluid
        src={ ShareIcon }
      />
    </Button>
  );
}

export default CopyLinkButton;
