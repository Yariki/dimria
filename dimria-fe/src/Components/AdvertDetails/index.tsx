import {useDispatch, useSelector} from "react-redux";
import {forwardRef, useEffect} from "react";
import { fetchAdvertDetailsStart} from "../../redux/adverts/advertSlices";
import {
    BusyIndicator,
    Button,
    Carousel,
    Dialog, ExpandableText,
    FlexBox,
    FlexBoxAlignItems,
    Label, Link, MediaGallery, MediaGalleryItem,
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

        if(advertId === '' || advertId === null || advertId === undefined){
            return;
        }

        dispatch(fetchAdvertDetailsStart(advertId));
    },[advertId, dispatch]);

    return (
            <Dialog
                ref={ref}
                footer={<FlexBox alignItems={FlexBoxAlignItems.Center}><Button onClick={onClose}>Close</Button></FlexBox>}
                header={<FlexBox alignItems={FlexBoxAlignItems.Center}><Link href={advertDetailsDto?.url} target="_blank">{advertDetailsDto?.advert_id}</Link></FlexBox>}
            >

                { isDetailsLoading && <BusyIndicator active delay={0} /> }

                { !isDetailsLoading && (
                    <>
                        <FlexBox alignItems={FlexBoxAlignItems.Center}>
                            <Label>City:</Label><Title level={TitleLevel.H6}> {advertDetailsDto?.city_name}</Title>
                        </FlexBox>
                        <FlexBox alignItems={FlexBoxAlignItems.Center}>
                            <Label>Price:</Label><Title level={TitleLevel.H6}> {advertDetailsDto?.price}</Title>
                        </FlexBox>
                        <FlexBox alignItems={FlexBoxAlignItems.Center}>
                            <Label>Currency:</Label><Title level={TitleLevel.H6}> {advertDetailsDto?.currency}</Title>
                        </FlexBox>
                        <FlexBox alignItems={FlexBoxAlignItems.Center}>
                            <Label>Rooms Count:</Label><Title level={TitleLevel.H6}> {advertDetailsDto?.rooms_count}</Title>
                        </FlexBox>
                        <FlexBox alignItems={FlexBoxAlignItems.Center}>
                            <Label>Floor:</Label><Title level={TitleLevel.H6}> {advertDetailsDto?.floor}</Title>
                        </FlexBox>
                        <FlexBox alignItems={FlexBoxAlignItems.Center}>
                            <Label>Building name:</Label><Title level={TitleLevel.H6}> {advertDetailsDto?.building_name}</Title>
                        </FlexBox>
                        <FlexBox alignItems={FlexBoxAlignItems.Center}>
                            <ExpandableText  maxCharacters={50} >
                                {advertDetailsDto?.description}
                            </ExpandableText>
                        </FlexBox>

                        <FlexBox alignItems={FlexBoxAlignItems.Center}>
                            <Carousel arrowsPlacement="Content">
                                {
                                    advertDetailsDto?.photos.map((photo, index) => {
                                        return (
                                            photo.map((item) => (

                                                    <img key={index}
                                                        src={item} alt={item} />

                                            ))
                                        );
                                    })
                                }
                            </Carousel>
                        </FlexBox>


                    </>
                )}
            </Dialog>
    );

});

export default AdvertDetailsModal;
