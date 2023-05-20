
const products = [
    {
      name: 'Product 1',
      desc: 'A nice thing',
      price: '$9.99',
    },
    {
      name: 'Product 2',
      desc: 'Another thing',
      price: '$3.45',
    },
    {
      name: 'Product 3',
      desc: 'Something else',
      price: '$6.51',
    },
    {
      name: 'Product 4',
      desc: 'Best thing of all',
      price: '$14.11',
    },
    { name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = ['1 Daisy-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];
export default function Review() {
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <h2 className='font-bold text-xl'>Order summary</h2>
            {
                products.map(product=>{
                    return (
                        <div className="w-full flex items-center justify-between">
                            <div className='flex-col gap-2'>
                                <p>{product.name}</p>
                                <p className='text-s'>{product.desc}</p>
                            </div>
                            <div>{product.price}</div>
                        </div>
                    )
                })
            }
            <div className="w-full flex items-center justify-between">
                <p className='font-bold text-xl'>Total</p>
                <p className='font-bold text-xl'>$34.06</p>
            </div>
            <div className='w-full flex items-center justify-evenly'>
                <div className='w-full flex flex-col gap-2'>
                    <p className='font-bold text-xl'>Shipping</p>
                    {
                        addresses.map(line=>{
                            return <p>{line}</p>
                        })
                    }
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <p className='font-bold text-xl'>Paymet details</p>
                    {
                        payments.map(line=>{
                            return (
                                <div className='w-full flex items-center justify-between'>
                                    <p>{line.name}</p>
                                    <p>{line.detail}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}