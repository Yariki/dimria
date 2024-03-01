import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchAdvertDetailsStart} from "../../redux/adverts/advertSlices";
import {
    Bar,
    BusyIndicator, Button,
    Dialog,
    DynamicPageTitle, ExpandableText,
    Form, FormItem, Label,
} from "@ui5/webcomponents-react";
import {selectDetails, selectDetailsLoading} from "../../redux/adverts/selectors";


export interface AdvertDetailsModalProps {
    isOpen: boolean;
    advertId: string;
    onClose: () => void;
}

export const AdvertDetailsModal = (props: AdvertDetailsModalProps) => {

    const dispatch = useDispatch();
    const {advertId, onClose, isOpen} = props;

    const isDetailsLoading = useSelector(selectDetailsLoading);
    const advertDetailsDto = useSelector(selectDetails);

    useEffect(() => {
        dispatch(fetchAdvertDetailsStart(advertId));
    },[advertId])

    return (
        <>
            <Dialog open={isOpen}
                    footer={<Bar design="Footer" endContent={<Button onClick={onClose}>Close</Button>}/>}
                    header={<DynamicPageTitle header={advertDetailsDto?.advert_id} />}
            >

                {isDetailsLoading && <BusyIndicator active delay={0} /> }

                {!isDetailsLoading && (
                    <>
                        <Form>
                            <FormItem label={<Label>City</Label>}>
                                <Label>{advertDetailsDto?.city_name}</Label>
                            </FormItem>
                            <FormItem label={<Label>Room Count</Label>}>
                                <Label>{advertDetailsDto?.rooms_count}</Label>
                            </FormItem>
                            <FormItem label={<Label>Description</Label>}>
                                <ExpandableText maxCharacters={50}>
                                    {advertDetailsDto?.description}
                                </ExpandableText>
                            </FormItem>
                        </Form>
                    </>
                )}
            </Dialog>
        </>
    );

}

