import { useGetIdentity } from 'react-admin';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const Footer = () => {
  const date = new Date();
  const { loaded, identity } = useGetIdentity();
  let color;

  if (identity) {
    identity.config.color === 'red' ? color = red : identity.config.color === 'green' ? color = green : color = '#2196f3';
  }
  
  return loaded ? (
    <div
      style={{
        position: "fixed",
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
        padding: 6,
        backgroundColor: color,
        textAlign: "center",
        color: "white",
      }}
    >
      <strong> Company Name &copy; {date.getFullYear()} </strong>
    </div>
  ) : null
};

export default Footer;
