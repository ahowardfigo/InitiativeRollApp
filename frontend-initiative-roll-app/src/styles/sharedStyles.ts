export const COLORS = {
    yellow: '#ECFFB0',
    blue: '#4A7B9D',
    darkRed: '#9AA899',
    veryDark: '#54577C',
    offWhite: '#FAFFD8',
  };

  export const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: `1.5px solid ${COLORS.darkRed}`,
    marginBottom: '1rem',
    outlineColor: COLORS.blue,
  };
  
  export const selectStyle: React.CSSProperties = {
    ...inputStyle,
    backgroundColor: 'white',
    color: "black",
    appearance: 'none',
  };
  
  export const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '1rem',
    color: COLORS.darkRed,
    fontWeight: 'bold',
  };
  
  export const buttonStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: COLORS.blue,
    border: 'none',
    padding: '0.75rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '6px',
    color: "white",
    transition: 'background-color 0.3s',
    marginTop: '1rem',
    cursor: 'pointer',
  };
  
  export const modalStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      backgroundColor: COLORS.offWhite,
      padding: '2rem',
      borderRadius: '10px',
      width: '90%',
      maxWidth: '400px',
      zIndex: 1001,
      boxShadow: `0 0 15px ${COLORS.blue}`,
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: 1000,
    },
  };

  export const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: COLORS.veryDark,
    display: 'flex',
    flexDirection: 'column',
    color: COLORS.offWhite,
    fontFamily: 'Georgia, serif',
    padding: '1rem',
}

export const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '2rem',
}

export const h1Style: React.CSSProperties = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: COLORS.offWhite,
    textShadow: `1px 1px ${COLORS.blue}`,
}

export const mainStyle: React.CSSProperties = {
    display: 'flex',
    flex: 1,
    gap: '1rem',
    flexDirection: 'row',
    flexWrap: 'wrap',
}