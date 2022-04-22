
import React from "react"
import "@testing-library/jest-dom"
import { screen } from "@testing-library/react"
import { createRoot, Root } from "react-dom/client"
import { act } from "react-dom/test-utils"
import BTableRow from "../../components/BTableRow"

const testThis = globalThis as any
testThis.IS_REACT_ACT_ENVIRONMENT = true

let container: HTMLDivElement
let root: Root
beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
})

afterEach(() => {
    container.remove()
})

const renderComponent = () => {
    root = createRoot(container!)
    root.render(<BTableRow values={["value1", "value2", "value3"]} />)
}

it("BTableRow shows all the labels in the values prop", async () => {
    act(renderComponent)
    const row = await screen.findByTestId("btablerow")
    expect(row.childNodes.length).toBe(3)
    expect(row.childNodes.item(0)).toHaveTextContent("value1")
    expect(row.childNodes.item(1)).toHaveTextContent("value2")
    expect(row.childNodes.item(2)).toHaveTextContent("value3")
})
