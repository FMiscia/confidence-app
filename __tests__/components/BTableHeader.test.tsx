import React from "react"
import "@testing-library/jest-dom"
import { screen, render } from "@testing-library/react";
import { act } from "react-dom/test-utils"
import BTableHeader from "../../components/BTableHeader"

const testThis = globalThis as any
testThis.IS_REACT_ACT_ENVIRONMENT = true

const renderComponent = () => {
    render(<BTableHeader values={["title1", "title2", "title3"]} />)
}

it("BTableHeader shows all the titles in the values prop", async () => {
    act(renderComponent)
    const row = await screen.findByTestId("btableheader")
    expect(row.childNodes.length).toBe(3)
    expect(row.childNodes.item(0)).toHaveTextContent("title1")
    expect(row.childNodes.item(1)).toHaveTextContent("title2")
    expect(row.childNodes.item(2)).toHaveTextContent("title3")
})
