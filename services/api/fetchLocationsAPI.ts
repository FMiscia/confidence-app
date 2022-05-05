import { json } from "stream/consumers"
import { IOCServices } from ".."

export type Location = {
    id: number
    locationId: string
    locationName: string
    locationDetails: string
    locationType: string
    numberofMyTasks?: number
    numberofDevices: number
    address: {
        addressLine1: string
        addressLine2?: string
        city: string
        state: string
        zip: string
    }
    locationUserRole: string
    active: boolean
    subscriptionActive: boolean
    longitude?: number
    latitude?: number
}

const fetchLocationsAPI = async (
    params: { start: number; limit?: number },
    container?: IOCServices
): Promise<Array<Location>> => {
    if (!container) {
        return Promise.reject(
            "Container is null. API must be called from api service"
        )
    }

    const result = await container.rest.fetch("confidence/locations", {
        method: "post",
        headers: {
            "content-type": "application/json",
            Username: "amitphatak$r5labs.com",
        },
        body: JSON.stringify(params),
    })

    const locations = await result.json()
    return locations.locations
}

export default fetchLocationsAPI