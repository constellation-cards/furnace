import { Container } from "@mui/material"
import Head from "next/head"

import ConstellationCardsAppbar from "./ConstellationCardsAppbar"

// TODO: other SEO tags here?
interface SupportedMetaTags {
    title?: string;
    description?: string;
}

interface ConstellationCardsLayoutProps {
    meta?: SupportedMetaTags
    children?: JSX.Element
}

export default (props: ConstellationCardsLayoutProps) => {
    return (
        <>
        <Head>
            <title>{props.meta?.title || 'Constellation Cards'}</title>
            <meta name="description" content={props.meta?.description || 'Constellation Cards'}></meta>
        </Head>
        <Container>
            <ConstellationCardsAppbar />
            {props.children}
        </Container>
        </>
    )
}