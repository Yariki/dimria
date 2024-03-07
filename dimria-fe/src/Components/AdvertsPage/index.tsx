import {

    CommonProps,
    FlexBox, FlexBoxJustifyContent,
} from "@ui5/webcomponents-react";
import {AdvertList} from "../AdvertList";
import {AdvertDto} from "../../models/AdvertDto";
import React, {useEffect, useState, useRef} from "react";
import {AdvertPrices} from "../AdvertPrices";
import AdvertDetailsModal from "../AdvertDetails";
import { createUseStyles } from 'react-jss';

export interface AdvertsPageProps  extends CommonProps {
}

interface SelectedAdvert {
    advertId: string;
    isOpened: boolean;
}

export const AdvertsPage = (props: AdvertsPageProps) => {

    const classes = useStyles();

    const dialogRef = useRef<any>(null);

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
        dialogRef?.current?.show();
    }

    const onClose = () => {
        dialogRef?.current?.close();
        setShowAdvert({advertId: '', isOpened: false});
    }

    return (
        <>
            <FlexBox className={classes.container}>
                <FlexBox className={classes.sidebar} justifyContent={FlexBoxJustifyContent.Center}>
                    <AdvertList onSelectedAdvert={onSelectedAdvert} onLinkClick={onLinkClicked}/>
                </FlexBox>
                <FlexBox className={classes.details} >
                    {renderAdvertPrices()}
                </FlexBox>
            </FlexBox>
            <AdvertDetailsModal ref={dialogRef} advertId={showAdvert.advertId} onClose={onClose} />
        </>
    );
}

const useStyles = createUseStyles({
    container: {
      height: 'calc(100vh - 5rem)', // to compensate headers and bottom margin
    },
    sidebar: {
      flex: '1',
      margin: {
        left: '1rem',
        right: '1rem',
      },
      backgroundColor: 'white',

    },
    details: {
      flex: '2',
      marginRight: '1rem',
    },
  });