import React from "react"
import apiProvider, { AppAPIs } from "./apiProvider"
import { IOCContainer } from "./iocContainer"
import restProvider, { AppRest } from "./restProvider"
import i18nProvider, { Appi18n } from "./i18nProvider"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"

export interface IOCServices extends IOCContainer {
    rest: AppRest
    api: AppAPIs
    i18n: Appi18n
}

type ContainerProviderProps = {
    container: IOCServices
}

const ioc = new IOCContainer() as IOCServices
ioc.put("i18n", i18nProvider)
ioc.put("rest", restProvider)
ioc.put("api", apiProvider)


type ExtendedContainerProps = {
    children: JSX.Element
} & ContainerProviderProps

export const ContainerContext = React.createContext<ContainerProviderProps>(
    void undefined as any
)

export const ContainerProvider = (props: ExtendedContainerProps) => {
    return (
        <ContainerContext.Provider value={{ container: props.container }}>
            {props.children}
        </ContainerContext.Provider>
    )
}

export const useContainer = () => {
    const result = React.useContext<ContainerProviderProps>(ContainerContext)

    return result.container
}

export function withContainer<P extends {}>(
    BaseComponent: React.ComponentType<P>
) {
    const hof = (props: P) => {
        return (
            <ContainerContext.Consumer>
                {({ container }) => (
                    <BaseComponent container={container} {...props} />
                )}
            </ContainerContext.Consumer>
        )
    }

    return hof
}

interface AppGetServerSidePropsContext extends GetServerSidePropsContext {
    container: IOCServices
}

export const withServerSideContainer =
    (
        fn: (ctx: AppGetServerSidePropsContext) => GetServerSidePropsResult<any>
    ) =>
    (props: GetServerSidePropsContext) => {
        return fn({ ...props, container: ioc })
    }

export default ioc
