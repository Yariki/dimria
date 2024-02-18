import {selectAdverts} from "../redux/adverts/selectors";
import {useSelector} from "react-redux";
import {AnalyticalTable, Grid} from "@ui5/webcomponents-react";
import React from "react";

export const AdvertList = () => {

    const adverts = useSelector(selectAdverts);

    const columns = [
        {
            Header: 'Advert ID',
            accessor: 'advert_id'
        },
        {
            Header:'City',
            accessor: 'city_name'
        },
        {
            Header: 'Price',
            accessor: 'price'
        },
        {
            Header: 'Rooms',
            accessor: 'rooms_count'
        },
        {
            Header: 'Created',
            accessor: 'created_at'
        }
    ];

    return (
        <Grid>
            { adverts && adverts.map((advert) => (
                <div data-layout-indent="XL1 L1 M1 S0"
                     data-layout-span="XL8 L8 M8 S8">
                    <AnalyticalTable columns={columns} data={advert.adverts} />
                </div>
            ))}
        </Grid>
    );

};