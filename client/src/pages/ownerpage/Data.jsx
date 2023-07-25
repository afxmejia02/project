import { useDebugValue } from "react";
import { AddressList, UserList, ItemsList, CardList, PurchaseOrderList } from "../../components/DataList";

export function Data() {
    return (
        <>
            <AddressList />
            <UserList />
            <ItemsList/>
            <CardList/>
            <PurchaseOrderList/>
        </>
    );
}

