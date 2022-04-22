import React from "react"
import "@testing-library/jest-dom"
import { createRoot, Root } from "react-dom/client"
import { screen, waitFor } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import Locations from "../../pages/locations"

const testThis = globalThis as any
testThis.IS_REACT_ACT_ENVIRONMENT = true

jest.mock("../../services/index", () => {
    const ioc = {
        rest: jest.fn(),
        i18n: (lan: string) => ({
            locationDetails: "Location details",
            address: "Address",
            locationType: "Location Type",
        }),
        api: {
            fetchLocationsAPI: async (params: {
                start: number
                limit: number
            }) => {
                const locations = Array.from(Array(30), (_, x) => {
                    return {
                        id: x,
                        locationId: "HOM49XD6",
                        locationName: "Non Seq - Amit's workspace",
                        locationDetails: "",
                        locationType: "Personal",
                        numberofDevices: 0,
                        address: {
                            addressLine1: "Geng Road",
                            addressLine2: "",
                            city: "Palo Alto",
                            state: "CA",
                            zip: "94303",
                        },
                        locationUserRole: "Owner",
                        active: false,
                        newLocation: false,
                        subscriptionActive: false,
                    }
                })
                return locations.slice(
                    params.start,
                    params.start + params.limit
                )
            },
        },
    }
    return {
        useContainer: () => ioc,
        withServerSideContainer: (fn: any) => (props: any) => {
            return fn({ ...props, container: ioc })
        },
    }
})

jest.mock("../../hooks/useAppQuery", () => {
    return <P, T>(action: (params: P) => Promise<T>) => {
        return [action]
    }
})

let container: HTMLDivElement
let root: Root
let observer: { instance: IntersectionObserver; item: Item } | undefined

function triggerIntersection() {
    const entries = [
        {
            boundingClientRect: null as any,
            intersectionRatio: 0,
            intersectionRect: null as any,
            isIntersecting: true,
            rootBounds: null,
            target: null as any,
            time: Date.now(),
        },
    ]
    observer?.item.callback(entries, observer.instance)
}

type Item = {
    callback: IntersectionObserverCallback
    elements: Set<Element>
    created: number
}

beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
    global.IntersectionObserver = jest.fn((cb, options = {}) => {
        const item = {
            callback: cb,
            elements: new Set<Element>(),
            created: Date.now(),
        }
        const instance: IntersectionObserver = {
            thresholds: [0],
            root: options.root ?? null,
            rootMargin: options.rootMargin ?? "",
            observe: jest.fn((element: Element) => {}),
            unobserve: jest.fn((element: Element) => {}),
            disconnect: jest.fn(() => {}),
            takeRecords: jest.fn(),
        }
        observer = { instance, item }
        return instance
    })
})

afterEach(() => {
    container.remove()
    observer = undefined
})

const renderComponent = () => {
    root = createRoot(container!)
    root.render(<Locations />)
}

it("Locations must show a single BTableHeader with the correct labels", async () => {
    act(renderComponent)
    const header = await screen.findAllByTestId("btableheader")
    expect(header.length).toBe(1)
    expect(header[0]).toHaveTextContent("Location details")
    expect(header[0]).toHaveTextContent("Address")
    expect(header[0]).toHaveTextContent("Location Type")
})

it("Locations must show initially 3 BTableRows", async () => {
    act(renderComponent)
    const rows = await screen.findAllByTestId("btablerow")
    expect(rows.length).toBe(3)
})

it("After triggering the intersection observer, Location items should more than the initial values", async () => {
    act(renderComponent)
    const rows = await screen.findAllByTestId("btablerow")
    expect(rows.length).toBe(3)
    act(triggerIntersection)
    await waitFor(async () => {
        const otherRows = await screen.findAllByTestId("btablerow")
        expect(otherRows.length).toBeGreaterThan(3)
    })
})
