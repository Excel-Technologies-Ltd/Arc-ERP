from excel_rma.utils.constants import SERIAL_FILTER_KEYS


def parse_serial_filter_query(filter_query):
    """
    Parse and clean the filter query
    Args:
        filter_query (dict): The filter query dictionary
    Returns:
        dict: Cleaned filter query
    """
    # Create a copy to avoid modifying the original
    cleaned_query = filter_query.copy()

    # Remove keys that are not in SERIAL_FILTER_KEYS (except $or)
    keys_to_remove = []
    for key in cleaned_query.keys():
        if key != "$or" and key not in SERIAL_FILTER_KEYS:
            keys_to_remove.append(key)

    for key in keys_to_remove:
        del cleaned_query[key]

    # Remove item_code and warehouse if they are empty/falsy
    if "item_code" in cleaned_query and not cleaned_query["item_code"]:
        del cleaned_query["item_code"]
    if "warehouse" in cleaned_query and not cleaned_query["warehouse"]:
        del cleaned_query["warehouse"]

    return cleaned_query
