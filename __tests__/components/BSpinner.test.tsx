
import React from "react"
import "@testing-library/jest-dom"
import { screen } from "@testing-library/react"
import { createRoot, Root } from "react-dom/client"
import { act } from "react-dom/test-utils"
import BSpinner from "../../components/BSpinner"

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
    root.render(<BSpinner />)
}

it("BTableRow shows all the labels in the values prop", async () => {
    act(renderComponent)
    const spinner = await screen.findByTestId("bspinner")
    expect(spinner).toBeInTheDocument()
})
