import os
import logging
import uuid
import azure.cosmos.documents as documents
import azure.cosmos.cosmos_client as cosmos_client
import azure.cosmos.exceptions as exceptions
from azure.cosmos.partition_key import PartitionKey
import datetime

from dimria.models import AdvertDetails

settings =  {
    'host': os.environ.get('COSMOS_ACCOUNT_HOST'),
    'master_key': os.environ.get('COSMOS_MASTER_KEY'),
    'db_id': os.environ.get('COSMOS_DB_ID'),
    'container_id': os.environ.get('COSMOS_CONTAINER_ID')
}



def process_advert(advert: AdvertDetails):

    client = cosmos_client.CosmosClient(settings['host'], {'masterKey': settings['master_key']}, user_agent="DimRia", user_agent_overwrite=True)
    try:
        # setup database for this sample
        try:
            db = client.get_database_client(settings['db_id'])
        except exceptions.CosmosResourceExistsError:
            logging.error('Database with id \'{0}\' was not found'.format(settings['db_id']))

        # setup container for this sample
        try:
            container = db.get_container_client(settings['container_id'])

        except exceptions.CosmosResourceExistsError:
            logging.error('Container with id \'{0}\' was not found'.format(settings['container_id']))

        advert_from_db = get_advert(container, advert.advert_id, advert.price)
        if advert_from_db is None:
            insert_advert(container, advert)

    except exceptions.CosmosHttpResponseError as e:
        logging.error('\nrun_sample has caught an error. {0}'.format(e.message))

    finally:
            logging.info(f"\n Processed advert: {advert.advert_id}")


def get_advert(container, advertId: int, price: int):

    try:

        items = list(container.query_items(
            query='SELECT * FROM adverts a WHERE a.advert_id = @advertId and a.price = @price',
            parameters=[
                {"name": "@advertId", "value": advertId},
                {"name": "@price", "value": price}
            ],
            enable_cross_partition_query=True
        ))

    except exceptions.CosmosHttpResponseError as e:
        logging.error(e.message)

    return items[0] if items is not None and len(items) > 0 else None


def insert_advert(container,  advert:AdvertDetails):

    try:
        item =  create_item(advert)
        container.create_item(body=item)

    except exceptions.CosmosHttpResponseError as e:
        logging.error(e.message)


def create_item(advert: AdvertDetails):

    return {
        "id": str(uuid.uuid4()),
        "advert_id": advert.advert_id,
        "city_name": advert.city_name,
        "state_id": advert.state_id,
        "city_id": advert.city_id,
        "currency_type_id": advert.currency_type_id,
        "price": advert.price,
        "rooms_count": advert.rooms_count,
        "currency_type_uk": advert.currency_type_uk,
        "created_at": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

def get_adverts():

    client = cosmos_client.CosmosClient(settings['host'], {'masterKey': settings['master_key']}, user_agent="DimRia", user_agent_overwrite=True)
    try:
        # setup database for this sample
        try:
            db = client.get_database_client(settings['db_id'])
        except exceptions.CosmosResourceExistsError:
            logging.error('Database with id \'{0}\' was not found'.format(settings['db_id']))

        # setup container for this sample
        try:
            container = db.get_container_client(settings['container_id'])

        except exceptions.CosmosResourceExistsError:
            logging.error('Container with id \'{0}\' was not found'.format(settings['container_id']))

        items = list(container.query_items(
            query='SELECT * FROM adverts a',
            enable_cross_partition_query=True
        ))

        return items

    except exceptions.CosmosHttpResponseError as e:
        logging.error('\nrun_sample has caught an error. {0}'.format(e.message))

    finally:
            logging.info(f"\n Get Adverts")

def get_adverts_filtered(cityId: int):

    client = cosmos_client.CosmosClient(settings['host'], {'masterKey': settings['master_key']}, user_agent="DimRia", user_agent_overwrite=True)
    try:
        # setup database for this sample
        try:
            db = client.get_database_client(settings['db_id'])
        except exceptions.CosmosResourceExistsError:
            logging.error('Database with id \'{0}\' was not found'.format(settings['db_id']))

        # setup container for this sample
        try:
            container = db.get_container_client(settings['container_id'])

        except exceptions.CosmosResourceExistsError:
            logging.error('Container with id \'{0}\' was not found'.format(settings['container_id']))

        items = list(container.query_items(
            query='SELECT * FROM adverts a WHERE a.city_id = @cityId',
            parameters=[
                {"name": "@cityId", "value": cityId}
            ],
            enable_cross_partition_query=True
        ))

        return items

    except exceptions.CosmosHttpResponseError as e:
        logging.error('\nrun_sample has caught an error. {0}'.format(e.message))

    finally:
            logging.info(f"\n Get Adverts")


