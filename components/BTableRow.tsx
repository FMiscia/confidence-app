import styles from "./BTableRow.module.css"

const BTableRow = ({
    values,
    footer,
    basis,
    textClasses,
    ...rest
}: BTableRowProps) => {
    const defaultBasis = 100 / values.length
    return (
        <div
            {...rest}
            data-testid="btablerow"
            className={`${styles.BTableRowItem} flex-row justify-between ${rest?.className}`}
        >
            {values.map((it, index) => (
                <div
                    key={index}
                    className="flex-column"
                    style={{
                        flexBasis: `${basis?.[index] ?? `${defaultBasis}%`}`,
                    }}
                >
                    <span className={`font-thin ${textClasses}`}>{it}</span>
                </div>
            ))}
        </div>
    )
}

export default BTableRow

interface BTableRowProps
    extends React.HTMLAttributes<HTMLDivElement>,
        React.ClassAttributes<HTMLDivElement> {
    values: Array<string | number>
    footer?: JSX.Element
    basis?: Array<Number>
    textClasses?: string
}
