import { useState, useEffect } from "react";
import { agent } from "../../app/api/agent";
import LoadingComponent from "../../layouts/LoadingComponent";
import { Order, OrderItem } from "../../models/order";
import { formatCurrency } from "../../app/util/util";
import OrdersSummary from "./OrderSummary";
import OrderDetatils from "./OrderDetails";

export default function Orders() {
    const [orders, setOrders] = useState<Order[]|null>(null);
    const [orderDetails, setOrderDetails] = useState<Order>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [currentOrderId, setCurrentOrderId] = useState<number | null>(null)

    useEffect(()=>{
        setLoading(true)
        agent.Orders.list()
            .then(orders => setOrders(orders))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    useEffect(()=>{
        if (currentOrderId) {
            setLoading(true)
            agent.Orders.fetch(currentOrderId)
                .then(order => setOrderDetails(order))
                .catch(error => console.log(error))
                .finally(()=>setLoading(false))
        }
    }, [currentOrderId])
    function clearOrderDetails() {
        setOrderDetails(null)
    }
    if (loading) return <LoadingComponent message='Loading Orders'/>
    return (
        <div className='w-full flex justify-center py-16'>
            {/* <OrdersSummary orders={orders} setCurrentOrderId={setCurrentOrderId}/>
            {
                orderDetails &&
                   <OrderDetatils orderDetails={orderDetails}/>
            } */}
            {
                (orderDetails)
                    ?<OrderDetatils orderDetails={orderDetails} backToOrders={()=>clearOrderDetails()}/>
                    :<OrdersSummary orders={orders} setCurrentOrderId={setCurrentOrderId}/>
            }
            {/* <table className='table rounded border-4 border-solid border-separate'>
                <thead>
                    <tr>
                        <th>Order number</th>
                        <th>Total</th>
                        <th>Order Date</th>
                        <th>Order Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(order=>{
                            return (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>${formatCurrency(order.total)}</td>
                                    <td>{order.orderDate.split('T')[0]}</td>
                                    <td>{order.orderStatus}</td>
                                    <td><div className='btn'>View</div></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table> */}
        </div>
    )
}