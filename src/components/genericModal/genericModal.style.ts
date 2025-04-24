export const modalBoxStyle = (width: any, maxWidth: any) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: width,
    maxWidth: maxWidth,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    maxHeight: '90vh',
    overflowY: 'auto',
    '&:focus-visible': {
      outline: 'none'
    }
  });
  
  export const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    p: 3,
    borderBottom: '1px solid',
    borderColor: 'divider',
    position: 'sticky',
    top: 0,
    bgcolor: 'background.paper',
    zIndex: 1
  };
  
  export const contentStyle = {
    p: 3
  };
  