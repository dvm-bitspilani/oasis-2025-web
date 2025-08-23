import { useContext } from 'react';
import styles from './BackButton.module.scss';
import { navContext } from '../../../App';

export default function BackButton({ className }: { className?: string }) {
    const { goToPage } = useContext(navContext);

    return (
        <div className={`${className} ${styles.backButton}`} onClick={() => {if(goToPage) goToPage("/")}} />
    )
}