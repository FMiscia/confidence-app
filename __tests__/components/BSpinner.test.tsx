
import React from "react"
import "@testing-library/jest-dom"
import { screen, render } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import BSpinner from "../../components/BSpinner"

const testThis = globalThis as any
testThis.IS_REACT_ACT_ENVIRONMENT = true

const renderComponent = () => {
    render(<BSpinner />)
}

it("BTableRow shows all the labels in the values prop", async () => {
    act(renderComponent)
    const spinner = await screen.findByTestId("bspinner")
    expect(spinner).toBeInTheDocument()
})
