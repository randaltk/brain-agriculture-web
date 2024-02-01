import Image from 'next/image';
import spinner from '../../../public/spinner.gif';

const Spinner = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Image src={spinner} alt="Loading Spinner" />
    </div>
  );
};

export default Spinner;