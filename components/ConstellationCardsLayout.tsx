import Head from "next/head"

import ConstellationCardsAppbar from "./ConstellationCardsAppbar"

// TODO: other SEO tags here?
interface SupportedMetaTags {
    title?: string;
    description?: string;
}

interface ConstellationCardsLayoutProps {
    meta?: SupportedMetaTags
    wrapInContent?: boolean;
    children?: JSX.Element
}

export default function ConstellationCardsLayout(props: ConstellationCardsLayoutProps) {
    return (
        <>
        <Head>
            <title>{props.meta?.title || 'Constellation Cards'}</title>
            <meta name="description" content={props.meta?.description || 'Constellation Cards'}></meta>
        </Head>
        <div>
            <ConstellationCardsAppbar />
            <div className="container">
                <div className={props.wrapInContent ? "content" : ""}>
                    {props.children}
                </div>
                <footer></footer>
            </div>
        </div>
        </>
    )
}