import frappe
from pymongo import MongoClient

def get_mongo_client():
    uri = frappe.conf.get("mongo_uri")
    return MongoClient(uri)

def get_db():
    client = get_mongo_client()
    db_name = frappe.conf.get("mongo_db_name")
    return client[db_name]