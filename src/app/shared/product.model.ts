export interface Product {
  division_ID: string;
  division_NAME: string;
  productGroups: [
      {
          division_ID: string;
          product_GROUP_ID: string;
          product_GROUP_NAME: string;
          products: [
              {
                  company_ID: string;
                  from_UNIT: string;
                  from_UNIT_TYPE: string;
                  loading_COST: string;
                  product_CODE: string;
                  product_COST: string;
                  product_COST_ID: string;
                  product_GROUP_ID: string;
                  product_ID: string;
                  product_NAME: string;
                  product_TAX1: string;
                  product_TAX2: string;
                  product_UNIT_CONV_ID: string;
                  to_UNIT: string;
                  to_UNIT_TYPE: string;
                  uom: string;
                  uom_ID: string;
                  productDetails: [
                      {
                          product_ID: string;
                          product_DETAIL_ID: string;
                          product_DETAIL_NAME: string;
                      }
                  ]

              }
          ]
      }
  ]
// constructor(public id: number, public name: string) {
  // constructor(public productId: string, public productCode: string, public productName: string, public productQuantity: string,
  //         public productPrice: string, public supplierId: string, public suppliername: string, public supplierphone: string) {
  // productId: string;
  // productCode: string;
  // productName: string;
  // productQuantity: string;
  // productPrice: string;
  // company_ID: string;
  // from_UNIT: string;
  // from_UNIT_TYPE: string;
  // loading_COST: string;
  // product_CODE: string;
  // product_COST: string;
  // product_COST_ID: string;
  // product_GROUP_ID: string;
  // product_ID: string;
  // product: string;
  // product_TAX1: string;
  // product_TAX2: string;
  // product_UNIT_CONV_ID: string;
  // to_UNIT: string;
  // to_UNIT_TYPE: string;
  // uom: string;
  // uom_ID: string;
  // hsn: string;
  // laying_COST: string;
  // productDetails: [
  //   {
  //     product_ID: string;
  //     product_DETAIL_ID: string;
  //     product_DETAIL_NAME: string;
  //     qty: string;
  //   }
  // ]
}
