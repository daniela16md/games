import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        &copy; {new Date().getFullYear()} Daniela Games. All rights reserved.
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
    position: 'absolute',
    width: '100%',
    bottom: '0',
  },
  text: {
    margin: '0',
    fontSize: '14px',
  },
};

export default Footer;
