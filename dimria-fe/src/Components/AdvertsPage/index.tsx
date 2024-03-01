import {CommonProps, SplitterElement, SplitterLayout} from "@ui5/webcomponents-react";
import {AdvertList} from "../AdvertList";
import {AdvertDto} from "../../models/AdvertDto";
import React, { useState} from "react";
import {AdvertPrices} from "../AdvertPrices";
import {AdvertDetailsModal} from "../AdvertDetails";

export interface AdvertsPageProps  extends CommonProps {
}

interface SelectedAdvert {
    advertId: string;
    isOpened: boolean;
}

export const AdvertsPage = (props: AdvertsPageProps) => {

    const [selectedAdvert, setSelectedAdvert] = useState<AdvertDto | null>(null);
    const [showAdvert, setShowAdvert] = useState<SelectedAdvert>({advertId: '', isOpened: false});

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
        setShowAdvert({advertId, isOpened: true});
    }

    const onClose = () => {
        setShowAdvert({advertId: '', isOpened: false});
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
            {showAdvert.isOpened && <AdvertDetailsModal isOpen={showAdvert.isOpened} advertId={showAdvert.advertId} onClose={onClose} />}
        </>
    );
}