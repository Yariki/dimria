import {selectAdverts, selectCities, selectCitiesLoading} from "../../redux/adverts/selectors";
import {useDispatch, useSelector} from "react-redux";
import {AnalyticalTable, Link, Select, Option} from "@ui5/webcomponents-react";
import React, { useEffect } from "react";
import {Icon} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/AllIcons.js"
import {AdvertDto} from "../../models/AdvertDto";
import { fetchAdvertsStart } from "../../redux/adverts/advertSlices";


export interface AdvertListProps {
    onSelectedAdvert: (advert: AdvertDto) => void;
    onLinkClick: (advertId: string) => void;
}


export const AdvertList = (props: AdvertListProps) => {

    const dispatch = useDispatch();
    const adverts = useSelector(selectAdverts);
    const cities = useSelector(selectCities);
    const citiesLoading = useSelector(selectCitiesLoading);

    const [selectedCity, setSelectedCity] = React.useState<number | null>(null);

    const options = [{city_id: -1, city_name: 'All'}, ...cities || []];

    const {onLinkClick} = props;

    useEffect(() => {

        if(selectedCity === null ||  isNaN(selectedCity)){
            return;
        }

        dispatch(fetchAdvertsStart(selectedCity));
    },[selectedCity, dispatch])

    const columns = [
        {
            Header: 'Advert ID',
            accessor: 'advert_id',
            Cell: (props: any) => {

                return (
                    <>
                        <Link design="Default" onClick={() => onLinkClick(props.value)}>{props.value}</Link>
                    </>
                );
            },
            width: 150
        },
        {
            Header:'City',
            accessor: 'city_name',
            width: 150
        },
        {
            Header: 'Room Count',
            accessor: 'rooms_count',
            width: 150
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
            },
            width: 100
        }
    ];

    const onRowSelected = (event: any) => {
        const currentRow = event?.detail?.row?.original as AdvertDto;
        if(!currentRow){
            return;
        }
        const {onSelectedAdvert} = props;
        console.log(currentRow);

        onSelectedAdvert(currentRow);
    }

    return (
        <>
            {
                !citiesLoading &&
                (<div>
                    <label>City</label>
                    <Select onChange={(e) =>
                            {
                                setSelectedCity(parseInt(e.detail.selectedOption.getAttribute('data-id') ?? '-1'));
                            }
                        }>
                        {options.map((city) => {
                            return <Option key={city.city_id} data-id={city.city_id}>{city.city_name}</Option>
                        })}
                    </Select>
                </div>)
            }
            { adverts && <AnalyticalTable
                header="Adverts"
                selectionMode="SingleSelect"
                selectionBehavior="Row"
                columns={columns}
                data={adverts}
                onRowSelect={(e) => onRowSelected(e)} />}
        </>
    );

};
