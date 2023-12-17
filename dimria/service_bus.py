import json
from azure.servicebus import ServiceBusClient, ServiceBusMessage
import logging

import os

from dimria.models import AdvertDetails, AdvertsList


connstr = os.environ['SERVICE_BUS_CONNECTION_STRING_SEND']
queue_name = os.environ['ADVERTSLIST_QUEUE_NAME']
advert_details_queue_name = os.environ['ADVERTDETAILS_QUEUE_NAME']


def send_advert_list_message(items: AdvertsList):
    service_bus_client = ServiceBusClient.from_connection_string(connstr, logging_enable=True)
    with service_bus_client:
        sender = service_bus_client.get_queue_sender(queue_name=queue_name)
        with sender:
            data = items.model_dump_json()
            message = ServiceBusMessage(data)
            try:
                sender.send_messages(message)
                logging.info(f"Sent {message}")
            except Exception as e:
                logging.error(f"Error: {e}")


def send_advert_detail_message(item: AdvertDetails):
    service_bus_client = ServiceBusClient.from_connection_string(connstr, logging_enable=True)
    with service_bus_client:
        sender = service_bus_client.get_queue_sender(queue_name=advert_details_queue_name)
        with sender:
            data = item.model_dump_json()
            message = ServiceBusMessage(data)
            try:
                sender.send_messages(message)
                logging.info(f"Sent {message}")
            except Exception as e:
                logging.error(f"Error: {e}")