
import { Order } from "../../models/order";
import { formatCurrency } from "../../app/util/util";

type Props = {
    orders:Order[] | null
    setCurrentOrderId: (orderId:number) => void
}
export default function OrdersSummary(props:Props) {
    const {orders, setCurrentOrderId} = props
    return (
        <table className='table rounded border-4 border-solid border-separate'>
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
                                <td><div className='btn' onClick={()=>setCurrentOrderId(order.id)}>View</div></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}