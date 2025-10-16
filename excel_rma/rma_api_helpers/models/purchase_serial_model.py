from pydantic import BaseModel, Field, field_validator
from typing import List, Dict, Any, Optional


class SerialWithMac(BaseModel):
    """Model for serial number with MAC address"""

    serial_no: str = Field(..., min_length=1)
    mac_no: Optional[str] = None

    @field_validator("serial_no")
    @classmethod
    def validate_serial_no(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError("Serial number cannot be empty")
        v = v.strip()
        if v == "Non Serial Item":
            raise ValueError("Invalid serial number: 'Non Serial Item'")
        return v

    @field_validator("mac_no")
    @classmethod
    def validate_mac_no(cls, v: Optional[str]) -> Optional[str]:
        if v:
            return v.strip() or None
        return None


class ItemInput(BaseModel):
    """Model for item input with serial numbers"""

    has_serial_no: int
    serial_with_mac: List[SerialWithMac] = Field(default_factory=list)
    item_code: str
    item_name: str
    brand_name: Optional[str] = None
    rate: float = Field(gt=0)
    qty: Optional[int] = None
    remaining_qty: Optional[int] = None

    @field_validator("has_serial_no")
    @classmethod
    def validate_has_serial(cls, v: int) -> int:
        if v not in [0, 1]:
            raise ValueError("has_serial_no must be 0 or 1")
        return v


class PurchaseReceiptData(BaseModel):
    """Model for Purchase Receipt data"""

    supplier: str = Field(..., min_length=1)
    posting_date: str = Field(..., min_length=1)
    posting_time: str = Field(..., min_length=1)
    warehouse: str = Field(..., min_length=1)
    total: float = Field(gt=0)
    total_qty: int = Field(gt=0)
    warranty_date: str = Field(..., min_length=1)
    purchase_invoice_name: str = Field(..., min_length=1)

    @field_validator("posting_date", "posting_time", "warranty_date")
    @classmethod
    def validate_not_empty(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError("Field cannot be empty")
        return v.strip()


class PurchaseReceiptPayload(BaseModel):
    """Model for Purchase Receipt payload"""

    doctype: str = "Purchase Receipt"
    docstatus: int = 1
    items: List[Dict[str, Any]]
    against_purchase_order: str
    supplier: str
    posting_date: str
    posting_time: str
    purchase_invoice_name: str
    total: float
    total_qty: int
    set_posting_time: int = 1

    model_config = {"arbitrary_types_allowed": True}


class MongoSerialDocument(BaseModel):
    """Model for MongoDB serial number document"""

    serial_no: str = Field(..., min_length=1)
    mac_no: Optional[str] = None
    brand: Optional[str] = None
    item_code: str
    item_name: str
    purchase_time: str
    warehouse: str
    purchase_date: str
    purchase_rate: float = Field(gt=0)
    supplier: str
    purchase_document_type: str
    purchase_invoice_name: str
    purchase_document_no: Optional[str] = None
    warranty: Dict[str, str]

    @field_validator("serial_no")
    @classmethod
    def validate_serial(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError("Serial number cannot be empty")
        return v.strip()


class SerialHistoryDocument(BaseModel):
    """Model for serial history document"""

    eventDate: str
    eventType: str
    serial_no: str
    mac_no: Optional[str] = None
    brand: Optional[str] = None
    document_no: str
    transaction_from: str
    transaction_to: str
    document_type: str
    parent_document: str
    created_on: str
    created_by: str
    item_code: str
    item_name: str


class ValidationInput(BaseModel):
    """Model for validation input"""

    serials: List[str]
    macs: List[str]

    @field_validator("serials", "macs")
    @classmethod
    def validate_lists(cls, v: List[str]) -> List[str]:
        return [item.strip() for item in v if item and item.strip()]
