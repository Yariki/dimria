import {AnalyticalTable, CommonProps} from "@ui5/webcomponents-react";
import {AdvertDto} from "../../models/AdvertDto";
import {render} from "@testing-library/react";


export interface AdvertPricesProps  extends CommonProps {
    advertDto: AdvertDto | null;
}


export const AdvertPrices = (props: AdvertPricesProps) => {

    const {advertDto} = props;
    const prices = advertDto?.prices ?? [];

    const columns = [
        {
            Header: 'Price',
            accessor: 'price',
            width: 100
        },
        {
            Header:'Date',
            accessor: 'date',
            width: 150
        },
        {
            Header: 'Currency',
            accessor: 'currency',
            width: 100
        },
    ];

    const renderPrices = () => {
        return (
            <>
                <AnalyticalTable columns={columns}
                                 data={prices}
                                 header="Prices"

                                />
            </>
        );
    }

    return (

        <>
            { advertDto && advertDto.prices &&  renderPrices()}
        </>
    );

}
