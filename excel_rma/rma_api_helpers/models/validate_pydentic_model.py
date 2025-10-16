from typing import Any
from pydantic import BaseModel
import frappe


def validate_pydantic_model(
    model_class: type[BaseModel], data: Any, context: str = ""
) -> BaseModel:
    """
    Validate data against a Pydantic model and throw frappe error if invalid.

    Args:
        model_class: The Pydantic model class to validate against
        data: The data to validate
        context: Optional context string for error messages

    Returns:
        Validated model instance
    """
    try:
        return (
            model_class(**data)
            if isinstance(data, dict)
            else model_class.model_validate(data)
        )
    except Exception as e:
        error_msg = f"Validation Error{f' in {context}' if context else ''}: {str(e)}"
        frappe.throw(error_msg)
