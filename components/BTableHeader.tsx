import styles from "./BTableRow.module.css"

const BTableHeader = ({ values, basis, ...rest }: BTableHeaderProps) => {
    const defaultBasis = 100 / values.length
    return (
        <div
            {...rest}
            data-testid="btableheader"
            className={`${styles.BTableHeaderContainer} flex-row ${rest.className}`}
        >
            {values.map((it, index) => (
                <div
                    key={index}
                    style={{
                        flexBasis: `${basis?.[index] ?? `${defaultBasis}%`}`,
                    }}
                >
                    <span className="font-bold">{it}</span>
                </div>
            ))}
        </div>
    )
}

export default BTableHeader

interface BTableHeaderProps extends React.HTMLAttributes<HTMLElement> {
    values: Array<String>
    basis?: Array<Number>
}
