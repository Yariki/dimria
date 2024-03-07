import {useDispatch, useSelector} from "react-redux";
import React, {forwardRef, useEffect} from "react";
import {fetchAdvertDetailsStart} from "../../redux/adverts/advertSlices";
import {
    BusyIndicator,
    Button,
    Dialog, ExpandableText,
    FlexBox,
    FlexBoxAlignItems,
    Label,
    Title,
    TitleLevel,
} from "@ui5/webcomponents-react";
import {selectDetails, selectDetailsLoading} from "../../redux/adverts/selectors";


export interface AdvertDetailsModalProps {
       advertId: string;
    onClose: () => void;
}

const AdvertDetailsModal = forwardRef<typeof Dialog, AdvertDetailsModalProps>((props: AdvertDetailsModalProps, ref: any) => {

    const dispatch = useDispatch();
    const {advertId, onClose} = props;

    const isDetailsLoading = useSelector(selectDetailsLoading);
    const advertDetailsDto = useSelector(selectDetails);

    useEffect(() => {
        dispatch(fetchAdvertDetailsStart(advertId));
    },[advertId]);

    return (
            <Dialog
                ref={ref}
                footer={<FlexBox alignItems={FlexBoxAlignItems.Center}><Button onClick={onClose}>Close</Button></FlexBox>}
                header={<FlexBox alignItems={FlexBoxAlignItems.Center}><Title level={TitleLevel.H4}>{advertDetailsDto?.advert_id}</Title></FlexBox>}
            >

                { isDetailsLoading && <BusyIndicator active delay={0} /> }

                { !isDetailsLoading && (
                    <>
                        <FlexBox alignItems={FlexBoxAlignItems.Center}>
                            <Label>City:</Label><Title level={TitleLevel.H6}> {advertDetailsDto?.city_name}</Title>
                        </FlexBox>
                        <FlexBox alignItems={FlexBoxAlignItems.Center}>
                            <Label>Rooms Count:</Label><Title level={TitleLevel.H6}> {advertDetailsDto?.rooms_count}</Title>
                        </FlexBox>
                        <FlexBox alignItems={FlexBoxAlignItems.Center}>
                            <ExpandableText  maxCharacters={50}>
                                {advertDetailsDto?.description}
                            </ExpandableText>
                        </FlexBox>
                    </>
                )}
            </Dialog>
    );

});

export default AdvertDetailsModal;
