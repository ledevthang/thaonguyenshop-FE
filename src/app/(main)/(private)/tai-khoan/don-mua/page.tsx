"use client";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import DataTable from "@/components/table/data-table";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { getOrder } from "@/api/order";
import { useMemo } from "react";
import { PurchasedOrder } from "@/types/order";
import PurchaseOrderFilter from "./filter";
import { useRecoilState } from "recoil";
import { purchaseOrderFilterState } from "@/store/state/purchase-order-filter.atom";
import { QueryKey } from "@/constant/query-key";

const PurchaseOrderPage = () => {
  const [purchaseOrderFilter, setPurchaseOrderFilter] = useRecoilState(
    purchaseOrderFilterState
  );
  const { data: purchaseOrderData } = useQuery({
    queryKey: [QueryKey.GET_PURCHASE_ORDER, purchaseOrderFilter],
    queryFn: () => getOrder(purchaseOrderFilter),
  });

  // const purchaseOrderDataConvert: PurchasedOrder[] = useMemo(() => {
  //   if (!purchaseOrderData) return [];
  //   const list: PurchasedOrder[] = [];
  //   for (let i = 0; i < purchaseOrderData.data.length; i++) {
  //     const item = purchaseOrderData.data[i];
  //     item.orderDetails.forEach((detail) => {
  //       list.push({
  //         ...item,
  //         orderDetailColor: detail.color,
  //         orderDetailSize: detail.size,
  //         orderDetailQuantity: detail.quantity,
  //       });
  //     });
  //   }
  //   return list;
  // }, [purchaseOrderData]);

  const purchaseOrderFooter = useMemo(() => {
    if (!purchaseOrderData) return [];
    return [
      {
        colSpan: 6,
        value: "Tổng tiền",
      },
      {
        colSpan: 1,
        value: `${purchaseOrderData.total}`,
      },
    ];
  }, [purchaseOrderData]);

  return (
    <>
      <PurchaseOrderFilter />
      {/* <CalendarDateRangePicker /> */}
      {purchaseOrderData && (
        <DataTable
          columns={columns}
          data={purchaseOrderData.data}
          footer={purchaseOrderFooter}
        />
      )}
    </>
  );
};

export default PurchaseOrderPage;