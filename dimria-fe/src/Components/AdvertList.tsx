import {selectAdverts} from "../redux/adverts/selectors";
import {useSelector} from "react-redux";
import {AnalyticalTable, Grid} from "@ui5/webcomponents-react";
import React from "react";
import {Icon} from "@ui5/webcomponents-react";

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
            Header: 'Room Count',
            accessor: 'rooms_count'
        },
        {
            Header: 'Direction',
            accessor: 'direction',
            Cell: (props: any) => {
                const {value} = props;

                const iconName = value > 0
                    ? 'arrow-top'
                    : value < 0
                        ?  'arrow-bottom'
                        : 'menu2';
                const design = value > 0
                    ? 'Positive'
                    : value < 0
                        ?  'Negative'
                        : 'Information';

                return (
                    <Icon name={iconName} design={design} />
                );
            }
        }
    ];

    return (
        <>
            { adverts && <AnalyticalTable columns={columns} data={adverts} />}
        </>
    );

};