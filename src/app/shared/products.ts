export interface Products {
    productDetails: [
        {
            qty: string;
            product_DETAIL_ID: string;
            product_DETAIL_NAME: string;
            product_ID: string;
        }
    ],
    laying_COST: string;
    product_ID: string;
    product_CODE: string;
    product_NAME: string;
    company_ID: string;
    product_COST_ID: string;
    loading_COST: string;
    product_UNIT_CONV_ID: string;
    from_UNIT: string;
    from_UNIT_TYPE: string;
    to_UNIT: string;
    to_UNIT_TYPE: string;
    uom_ID: string;
    uom: string;
    hsn: string;
    product_COST: string;
    product_TAX1: string;
    product_TAX2: string;
    product_GROUP_ID: string;
    product_GROUP_NAME: string;
    division_ID: string;
    division_NAME: string;
}
