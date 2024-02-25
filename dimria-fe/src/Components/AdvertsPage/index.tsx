import {CommonProps, SplitterElement, SplitterLayout} from "@ui5/webcomponents-react";
import {AdvertList} from "../AdvertList";
import {AdvertDto} from "../../models/AdvertDto";
import React, {useState} from "react";
import {AdvertPrices} from "../AdvertPrices";


export interface AdvertsPageProps  extends CommonProps {
}

export const AdvertsPage = (props: AdvertsPageProps) => {

    const [selectedAdvert, setSelectedAdvert] = useState<AdvertDto | null>(null);

    const renderAdvertPrices = ()  => {

        return (
            <>
                { selectedAdvert && <AdvertPrices advertDto={selectedAdvert} /> }
            </>
        );
    }

    const onSelectedAdvert = (advert: AdvertDto) => {
        setSelectedAdvert(advert);
    }

    const onLinkClicked = (advertId: string) => {

    }

    return (
        <>
            <SplitterLayout
                style={{
                    height: '800px',
                    width: '100%'
                }}
            >
                <SplitterElement>
                    <AdvertList onSelectedAdvert={onSelectedAdvert} onLinkClick={onLinkClicked}/>
                </SplitterElement>
                <SplitterElement>
                    {renderAdvertPrices()}
                </SplitterElement>
            </SplitterLayout>

        </>
    );
}