import { useContext } from 'react';
import styles from './BackButton.module.scss';
import { navContext } from '../../../App';
type BackButtonProps = {
  className?: string;
  to?: string;
  onClick?: () => void;
};

export default function BackButton({ className, to = "/", onClick }: BackButtonProps) {
  const { goToPage } = useContext(navContext);

  const handleClick = () => {
    if (onClick) {
      onClick(); // custom behavior
    } else if (goToPage) {
      goToPage(to); // default goToPage
    }
  };

  return (
    <div
      className={`${className ?? ""} ${styles.backButton}`}
      onClick={handleClick}
    />
  );
}
