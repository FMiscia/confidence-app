import styles from './BSpinner.module.css'

const BSpinner = (props: BSpinnerProps) => {
    return <div data-testid="bspinner" {...props} className={styles.BSpinner} />
}

interface BSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

export default BSpinner
