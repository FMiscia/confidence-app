import React, { useEffect, useState } from "react"
import BTableRow from "../components/BTableRow"
import BSpinner from "../components/BSpinner"
import BTableHeader from "../components/BTableHeader"
import useIntersect from "../hooks/useIntersect"
import useAppQuery from "../hooks/useAppQuery"
import {
    useContainer,
    withServerSideContainer,
} from "../services"
import useI18n from "../hooks/useI18n"
import { Location } from "../services/api/fetchLocationsAPI"

const PAGINATION_SIZE = 3

function Locations() {
    const [items, setItems] = useState<Array<Location>>([])
    const [hasMore, setHasMore] = useState(false)
    const container = useContainer()
    const i18n = useI18n()
    const [setNode, entry] = useIntersect()
    const [queryLocations, isLoading] = useAppQuery(
        container.api.fetchLocationsAPI
    )

    const fetchLocations = async () => {
        const start = items.length
        const limit = PAGINATION_SIZE
        const newItems = await queryLocations({ start, limit })
        const keeLoading = newItems.length === PAGINATION_SIZE
        setItems([...items, ...newItems])
        setHasMore(keeLoading)
    }

    useEffect(() => {
        if (!entry.isIntersecting || isLoading) {
            return
        }
        fetchLocations()
    }, [entry])

    useEffect(() => {
        fetchLocations()
    }, [])

    return (
        <div className="flex-column">
            <BTableHeader
                className="padding-xl"
                values={[i18n.locationDetails, i18n.address, i18n.locationType]}
            />
            {items.map((it, index) => {
                const isLast = index === items.length - 1
                const street = `${it.address.addressLine1} ${it.address?.addressLine2 ?? ''}`
                const address = `${street}, ${it.address.city}, ${it.address.zip}, ${it.address.state}`
                return (
                    <div key={it.id} ref={(r) => isLast && setNode(r)}>
                        <BTableRow
                            values={[
                                it.locationDetails || "-",
                                address.replace(/ ,/g,','),
                                it.locationType,
                            ]}
                            className="padding-xl fade-in hover"
                        />
                    </div>
                )
            })}
            {(hasMore || isLoading) && (
                <div className="flex-row justify-center margin-m">
                    <BSpinner />
                </div>
            )}
        </div>
    )
}

export const getServerSideProps = withServerSideContainer(({ container }) => {
    return {
        props: {},
    }
})

export default Locations
